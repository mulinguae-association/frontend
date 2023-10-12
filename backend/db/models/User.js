import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, max: 64 },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: false },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});
// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
