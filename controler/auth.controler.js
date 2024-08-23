const ConnectDB = require("../connectDB");
const Student = require("../models/student");

ConnectDB();

const signUp =  async(req, res)=>{
    console.log(req.body);
    let {name, email, password, } = req.body.basicInfo;
    let {role} = req.body;
    const newStudent = new Student({
      'basicInfo.name': name,
      'basicInfo.email': email,
      'basicInfo.password': password,
      role: role || "student" // Use the provided role or default to "student"
    });
    console.log(role);
    let result =  await newStudent.save();
    res.send("done"); 
}


const login =  async(req, res)=>{
    let {email, password} = req.body;
    let isValid = await Student.findOne({'basicInfo.email': email});

     console.log(isValid);
    if(isValid &&  isValid.basicInfo.password == password){

      if(isValid.role == "student"){
        res.status(200).json(isValid);
      } else {
        res.status(200).json(isValid);
      }
       

    } else {
      res.status(404).json({message:"user not found"});
    }
    
}


module.exports = {signUp, login};