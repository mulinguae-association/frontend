const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose")
const User = require("./models/user.model")

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017',
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("connected to database")
    }
  })

app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      address: req.body.address,
      password: req.body.password
    })
    res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    res.json({ status: "error", error: "Duplicate email" })
  }
})
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  })
  if (user) {
    return res.json({ status: "ok", user: true })
  } else {
    return res.json({ status: "error", user: false })
  }
})

app.listen(5000, () => console.log("your port is working on 5000"))