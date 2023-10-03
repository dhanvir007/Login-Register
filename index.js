const express = require("express");
const app = express();
const cors = require('cors');
const connectDB = require("./config/dbConnection")
const dotenv = require("dotenv").config()
const port = process.env.PORT ;


connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())


app.use("/api/users", require('./routes/userRoutes'))

app.listen(port,()=>{
    console.log(`Server is started at port:- ${port}`)
})