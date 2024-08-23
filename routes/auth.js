const express = require('express');
const router = express.Router();

const {signUp, login} = require("../controler/auth.controler");


router.post("/signUp",signUp);
router.post("/login",login)


module.exports = router;

