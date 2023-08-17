const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser")
const routes = require("./routes")
const { connectToDatabase } = require('./db/db');
const dotenv = require("dotenv");
dotenv.config();
// use cors
app.use(cors())
app.use(express.json())

app.use(bodyParser.json())
// Connect to MongoDB
connectToDatabase()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Mount the routes
app.use("/api", routes);
// start the server
app.listen(5000, () => console.log("your port is working on 5000"))