import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import { convertToWebp } from "../utils/imageConversion.js";
import { __dirname } from '../utils/dirname.js';
import { promises as fs } from 'fs';
import path from 'path';
async function register(req, res) {
  try {
    const { name, email, password, confirmPassword, profileImage } = req.body;
    // Check if name i entered 
    if (!name) {
      return res.json({ error: `name is required` })
    }
    // Check is password is good
    if (!password || password.length < 6) {
      return res.json({ error: `Password is required and should be at least 6 characters long` })
    }
    if (password !== confirmPassword) {
      return res.json({ error: "passwords don't match" })
    }
    // Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.json({ error: "email already exists." });
    }

    const newUser = new User({ name, email, password, profileImage });
    await newUser.save();
    return res.status(200).json({ message: "registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ error: "User Not Found" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ error: "password doesn't match" })
    } else {
      jwt.sign({ userId: user._id, role: user.role, name: user.name, email: user.email, profileImage: user.profileImage }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      }, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, { httpOnly: true }).json(user)
      });
    }
  } catch (error) {
    console.log(error)
  }
}
const getProfile = (req, res) => {
  const { token } = req.cookies

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, { expiresIn: "1d", }, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token has expired. Please log in again." });
        } else {
          // Handle other JWT errors here, if needed
          return res.status(401).json({ message: "Invalid token." });
        }
      }
      res.json(user)
    })
  } else {
    res.json(null)
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json('Logout success')
}

async function forgotPasssword(req, res) {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }
    const user = await User.findOne({ email })
    if (user) {
      const secretKey = user._id + "pleaseSubscribe"
      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: "10m",
      });

      // read html file 
      const templatePath = path.join(__dirname, "../email_templates/reset_password.html");
      const htmlTemplate = await fs.readFile(templatePath, 'utf-8')

      const link = `http://localhost:3000/reset/${user._id}/${token}`;
      const formateHtml = htmlTemplate.replace('{{resetLink}}', link)

      const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS
        },
      });
      const mailOptions = {
        from: "ascmulingua@gmail.com",
        to: email,
        subject: 'Password Rest Request',
        html: formateHtml,
      }
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(400).json({ message: "Error" });
        }
        return res.status(200).json({ message: "Email Sent" });
      });
    } else {
      return res.status(400).json({ error: "Invaild Email" })
    }
  } catch (err) {
    return res.status(400).json({ error: err });

  }
}
async function ResetPassword(req, res) {
  const { password, confirmPassword } = req.body;
  const { id, token } = req.params;

  try {
    if (password && confirmPassword && id && token) {
      if (password === confirmPassword) {
        const user = await User.findById(id);
        const secretKey = user._id + "pleaseSubscribe";
        try {
          const isValid = await jwt.verify(token, secretKey);
          if (isValid) {
            // hash password 
            const genSalt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, genSalt);
            const isSuccess = await User.findByIdAndUpdate(user._id, {
              $set: {
                password: hashedPass,
              },
            });
            if (isSuccess) {
            }
            return res.status(200).json({
              message: "Password Changes Successfuly"
            })
          } else {
            return res.status(400).json({ message: "Link has been Expired" })
          }
        } catch (err) {
          return res.status(400).json({ message: "Link has been Expired" })
        }
      } else {
        return res.status(400).json({ message: "password and confirm password doesn't match" })
      }
    } else {
      return res.status(400).json({ message: "All fields are required" })
    }
  } catch (err) {
    return res.status(400).json({ message: err })
  }
}

function generateToken(user) {
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d', // Set the token expiration time
    }
  );
  return token;
}
async function updateProfile(req, res) {
  const { name, email, avatar } = req.body

  const userId = req.userId
  try {
    if (!name && !email) {
      return res.status(400).json({ error: "Name and Email are required" })
    } else {
      const user = await User.findById(userId)

      if (!user) {
        return res.status(400).json({ error: "User Not Found!" })
      }
      // Check if the email already exists in the database
      if (email !== user.email) {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ error: "Email already exists" });
        }
      }

      let newImage = '';
      let oldImage = user.profileImage;

      if (req.file) {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imagePath = `uploads/users/${req.file.filename}`;

        if (req.file.mimetype !== 'image/webp') {
          newImage = await convertToWebp(imagePath, baseUrl, 'uploads/users');
        } else {
          newImage = `${baseUrl}/uploads/users/${req.file.filename}`;
        }

        if (newImage !== oldImage) {
          if (oldImage) {
            const oldImagePath = path.join(__dirname, '..', oldImage.replace(`${req.protocol}://${req.get('host')}/`, ''));

            try {
              await fs.access(oldImagePath, fs.constants.F_OK);
              await fs.unlink(oldImagePath);
              console.log('Old image file deleted:', oldImagePath);
            } catch (error) {
              console.error('Error deleting old image file:', error);
            }
          }
        }
      }

      user.name = name
      user.email = email
      if (newImage) {
        user.profileImage = newImage ? newImage : avatar
      }
      await user.save();
      const updatedToken = generateToken(user)
      res.cookie('token', updatedToken, { httpOnly: true })
      return res.status(200).json({ data: { userId, name: user.name, email, profileImage: user.profileImage, role: user.role }, message: 'Profile updated successfuly' })
    }
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}


export {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
  forgotPasssword,
  ResetPassword
};
