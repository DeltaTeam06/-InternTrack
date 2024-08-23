const express = require('express');
const router = express.Router();
const {getAllUser, getVerified, getUncertified, getUnverified} = require("../controler/admin.controler");
const {verifyUserById, validateIds, verifyAllByIds, getCertified} = require("../controler/admin.controler");

//all registerd User
router.get("/alluser", getAllUser);
// All verified Students
router.get("/verified", getVerified);


  // verified snd UnCertificate generated
  router.get("/unCertified", getUncertified);

//All Unverided Students
router.get("/Unverified", getUnverified);

// Verified and Certified
router.get("/Certified", getCertified);

// Verified : True from Admin dashBoard

router.post('/verify/:id', verifyUserById);


//verify all student by admin
router.use('/verifyAll', validateIds);
  
  // Route to update multiple students based on their IDs
router.post('/verifyAll', verifyAllByIds);
  

module.exports = router;
