const express = require('express');
const multer  = require('multer');
const router = express.Router();
const {uploadProfileImage, addNewLearning, getUserDetails, updateDetals, donwloadCertificate, learingsData} = require("../controler/user.controler");

// multer storage function
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
       return cb(null, file.originalname)
    }
  })
  
  const upload = multer({storage})
  

//user upload Profile image 
router.post("/profile/:id", upload.single('profile'),uploadProfileImage);
// Adding new learings of Students section Imgaes and Title
router.post("/learning/:id", upload.single('image'), addNewLearning);

// Compelete Profile Details from Student DashBoard

//update user info from User DashBoard

//Update user info
router.get("/edit/:id", getUserDetails);
router.post('/details/:id',updateDetals);
// for download Certificate
router.get("/download/:pdfName", donwloadCertificate)

//sendng learings data route
router.get("/learning/:id", learingsData)

  

module.exports = router;
