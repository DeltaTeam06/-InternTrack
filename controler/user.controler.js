const ConnectDB  = require("../connectDB");
const Student = require("../models/student");
const path = require("path");


ConnectDB();




const uploadProfileImage =  async(req, res)=>{
    const { id } = req.params;
    console.log(req.file.path);
    try {
      const result = await Student.findByIdAndUpdate(
        id,
        {
          'profile': `uploads/${req.file.originalname}`,
          
        },
        // { new: true, runValidators: true }
      );
  
      if (!result) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const updatedStudent = await Student.findById(id);
  
      res.status(200).json(updatedStudent);
    } catch  (error) { 
      res.status(500).json({ message: 'Server error', error });
    }
  }


  const addNewLearning =  async(req, res)=>{
    let {id} = req.params;
    console.log(id);
    console.log(req.body.title);
    console.log(req.file);
  const result = await Student.findByIdAndUpdate(
    id,
    {
      $push: {
        learnings: {
          image:req.file.originalname,
          title:req.body.title,
          description:req.body.description,
          // uploadDate: new Date()  // This will use the current date by default
        }
      }
    })

    res.send("done");
}


// Update User Info from user DashBoardd
const getUserDetails = async(req, res)=>{
    let {id} = req.params;
    let user = await Student.findById(id);
    res.status(200).json(user);
  }


//Save Updated Detais of user
const updateDetals =  async (req, res) => {
    const { id } = req.params;
     console.log(req.body);
  
    try {
      const result = await Student.findByIdAndUpdate(
        id,
        {
          'basicInfo.address': req.body.address,
          'basicInfo.phone': req.body.phone,
          'degree.courseName': req.body.course,
          'degree.college': req.body.college,
        },
        { new: true, runValidators: true }
      );
  
      if (!result) {
        return res.status(404).json({ message: 'Student not found' });
      }
       
      let updatedStudent = await Student.findById(id);
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }


  //DownLoad Certuficte
  const donwloadCertificate = (req, res) => {
    console.log( req.params.pdfName)
    console.log(req.params.pdfName);
    const filePath = path.join(__dirname, "../public/files", req.params.pdfName);  
    res.download(filePath);
    }

   
  //Sending Learning Data Function
  const learingsData = async(req, res)=>{
    let {id} = req.params;
    let student = await Student.findById(id);
    console.log(student);

    res.json(student.learnings);
}  



module.exports = {uploadProfileImage, addNewLearning, getUserDetails, updateDetals, donwloadCertificate, learingsData};
