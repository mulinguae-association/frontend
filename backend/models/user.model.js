const mongoose = require("mongoose")
const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true }
}, { collation: "user-data" })

const model = mongoose.model("UserData", User)
model.exports = model
