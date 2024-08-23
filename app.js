const express = require('express')
const path = require("path");
const mongoose = require('mongoose');
const Student = require("./models/student.js")
const app = express()
var cors = require('cors');
const port = 3000
let pup = require("puppeteer");
const { profile } = require('console');
// const multer  = require('multer');
const { title } = require('process');
// const upload = multer({ dest: 'uploads/' })
const user = require("./routes/user.js");
const auth = require("./routes/auth.js")
const certificate = require("./routes/certificate.js");
const admin = require("./routes/admin.js");


// const uri = "mongodb+srv://tecnocrates006:701196@student-data.wrr0t.mongodb.net/?retryWrites=true&w=majority&appName=student-data"; // atalash link

app.use(express.json()); 
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.use("/user", user);
app.use("/auth", auth);
app.use("/certificate", certificate)
app.use("/admin", admin);


// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/mangos');
// }




app.get("/", (req, res)=>{
  res.render("certificate.ejs", {data:{basicInfo:{nam:"prakash"}}});
})


app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})