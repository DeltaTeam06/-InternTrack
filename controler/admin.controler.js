const express = require('express');
const path = require('path');
const pup = require('puppeteer');
const ConnectDB = require("../connectDB");
const Student = require("../models/student");
const mongoose = require("mongoose");


ConnectDB();

const getAllUser = async(req, res)=>{
    let allUser = await Student.find({role:"student"});
    console.log(allUser.length);
    res.json({count: allUser.length});
};

// verified students
const getVerified = async(req, res)=>{
    const students = await Student.find({
      role: 'student',
      isVerified: true
    });
  
      res.status(200).json({students});
  }


  //uncertified
  const getUncertified = async(req, res)=>{
    const students = await Student.find({
      role: 'student',
      isVerified: true,
      isCertified: false,
    });
  
    console.log(students);
  
      res.status(200).json({students});
  }


const getUnverified = async(req, res)=>{
    const students = await Student.find({
      role: 'student',
      isVerified: false,
    });
  
      res.status(200).json({students});
  }
 


 const verifyUserById = async (req, res) => {
    const { id } = req.params;
    const { basicInfo } = req.body;
  
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        {
          'isVerified': true
        },
        { new: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json({ message: 'Info updated in DB', student: updatedStudent });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } 


  const validateIds = (req, res, next) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: 'Invalid IDs format' });
    }
    next();
  }


  const verifyAllByIds = async (req, res) => {
    const { ids} = req.body;
  
    try {
      const result = await Student.updateMany(
        { _id: { $in: ids } },  
        { 'isVerified':true },
        { new: true, runValidators: true }
      );
  
      if (result.nModified === 0) {
        return res.status(404).json({ message: 'No students found or updated' });
      }
  
      res.status(200).json({ message: 'Students updated successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }


  const getCertified =  async(req, res)=>{
    const students = await Student.find({
      role: 'student',
      isVerified: true,
      isCertified: true,
    });
  
    console.log(students);
  
      res.status(200).json({students});
  }

module.exports = {getAllUser, getVerified, getUncertified, getUnverified, verifyUserById, validateIds, verifyAllByIds, getCertified};