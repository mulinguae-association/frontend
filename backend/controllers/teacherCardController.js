import Teacher from '../db/models/TeacherCard.js';
import { promises as fs } from 'fs';
import path from 'path';
import { convertToWebp } from '../utils/imageConversion.js';
import { __dirname } from '../utils/dirname.js';
export const createTeacherCard = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ error: "No permission." });
    }
    const { firstName, lastName, email, jobBrief, telephone, aboutTeacher, teaching_philosophy, career_summary, teaching_methods, qualification_cert, teacher_collaboration, classroom_management, behavior_management, additional_info } = req.body;
    let image = '';

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const imagePath = `uploads/${req.file.filename}`;

      if (req.file.mimetype !== 'image/webp') {
        image = await convertToWebp(imagePath, baseUrl, 'uploads');
      } else {
        image = `${baseUrl}/uploads/${req.file.filename}`;
      }
    }

    const newTeacher = new Teacher({ firstName, lastName, email, image, jobBrief, telephone, aboutTeacher, teaching_philosophy, career_summary, teaching_methods, qualification_cert, teacher_collaboration, classroom_management, behavior_management, additional_info });
    await newTeacher.save();

    res.status(200).json({ newTeacher });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ message: 'Error creating teacher.' });
  }
};

export const updateTeacherCard = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { firstName, lastName, email, jobBrief, telephone, aboutTeacher, image } = req.body;
    if (req.role !== "admin") {
      return res.status(403).json({ error: "No permission." });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found', success: false });
    }

    let newImage = '';
    let oldImage = teacher.image;

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const imagePath = `uploads/${req.file.filename}`;

      if (req.file.mimetype !== 'image/webp') {
        newImage = await convertToWebp(imagePath, baseUrl, 'uploads');
      } else {
        newImage = `${baseUrl}/uploads/${req.file.filename}`;
      }

      if (newImage !== oldImage) {
        if (oldImage) {
          const oldImagePath = path.join(__dirname, '..', oldImage.replace(`${req.protocol}://${req.get('host')}/`, ''));

          try {
            await fs.access(oldImagePath, fs.constants.F_OK);
            await fs.unlink(oldImagePath);
          } catch (error) {
            console.error('Error deleting old image file:', error);
          }
        }
      }
    }

    teacher.firstName = firstName;
    teacher.lastName = lastName;
    teacher.email = email;
    teacher.jobBrief = jobBrief;
    teacher.aboutTeacher = aboutTeacher;
    teacher.telephone = telephone;
    teacher.image = newImage ? newImage : image;

    await teacher.save();

    res.status(200).json({ message: 'Teacher updated successfully', updatedTeacher: teacher, success: true });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

export const getTeachersCard = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Error fetching teachers.' });
  }
};

export const deleteTeacherCard = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ error: "No permission." });
    }
    const teacherId = req.params.id;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    if (teacher.image) {
      const imagePath = path.join(__dirname, '..', teacher.image.replace(`${req.protocol}://${req.get('host')}/`, ''));

      try {
        await fs.access(imagePath, fs.constants.F_OK);
        await fs.unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    await teacher.deleteOne();

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
