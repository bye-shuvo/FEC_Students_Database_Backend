require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const studentRoute = require("./database/students.js");
app.use(cors({origin : ["http://fecsdb.vercel.app"]}));
app.use(express.json());
app.use(express.urlencoded());
app.listen(PORT , () => {
  console.log(`Server started at PORT : ${PORT}`);
})

app.get("/" , (req ,res)=>{
  res.send("<h1 style='position:absolute; top:50%; left:50%; transform:translate(-50% , -50%); font-size:4rem;'>Welcome To FEC Students Portal</h1>");
})

app.use("/students" , studentRoute);