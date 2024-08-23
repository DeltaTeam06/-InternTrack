const express = require('express');
const router = express.Router();

const {callGenerateCertificate, callTemplate, generateCertificate}  = require("../controler/certificate.controler");


router.post("/certificate", callGenerateCertificate);
router.get('/cert', callTemplate);
//Pfd converter
router.post("/certificate/:id", generateCertificate);


module.exports = router;