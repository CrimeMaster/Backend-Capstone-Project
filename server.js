const express = require('express');
const home = require("./routes/home");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const authorization = require("./middleware/authorization");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");

const app = express()
const port = process.env.port || 9001

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Routes
app.use("/home", home)
app.use("api/auth", authRoutes);
app.use("api/job", jobRoutes);

app.get("/", (req, res) => { res.send("Backend Capstone Project"); })



app.get('/health', (req, res) => {
    res.json({
        status:200,
        message: 'server is running',
    })
})

app.get("/page", authorization, (req, res) => {
    res.json({
      status: "active",
      message: "running",
    });
  });

app.listen(port, () => {
    mongoose.connect(process.env.MONGOdb_URL)
    .then(() => console.log(`Server running on http://localhost:${process.env.port}`))
    .catch(error => console.log(error))
})