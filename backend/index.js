const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose")
const User = require("./models/user.model")

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/mulingua-DB")

app.post("/api/register", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      address: req.body.address,
      password: req.body.password
    })
    res.send({ status: 'ok' })
  } catch {
    res.json({ status: "error", error: "Duplicate email" })
  }
  console.log(req.body)
  res.json({ status: 'ok' })
})

app.listen(5000, () => console.log("your port is working on 5000"))