const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const authorization = require("./middleware/authorization");

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())




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

app.listen(process.env.port, () => {
    mongoose.connect(process.env.MONGOdb_URL)
    .then(() => console.log(`Server running on http://localhost:${process.env.port}`))
    .catch(error => console.log(error))
})