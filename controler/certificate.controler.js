const express = require('express');
const path = require('path');
const pup = require('puppeteer');
// const fetch = require('node-fetch'); // Ensure you import fetch if not using Node.js 18+
const ConnectDB = require("../connectDB");
const Student = require("../models/student");

// Establish database connection
ConnectDB();

// Function to generate certificates for multiple students
const callGenerateCertificate = async (req, res) => {
    try {
        const { ids } = req.body;
        const responses = await Promise.all(
            ids.map(id => fetch(`http://localhost:3000/certificate/certificate/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }))
        );
        res.json({ message: "done" });
    } catch (error) {
        console.error('Error generating certificates:', error);
        res.status(500).send('An error occurred while generating the certificates.');
    }
};

// Function to render the certificate template
const callTemplate = async (req, res) => {
    const { info } = req.query;
    const data = JSON.parse(info);
    res.render("certificate.ejs", { data });
};

// Function to generate a PDF certificate for a student
const generateCertificate = async (req, res) => {
    const { id } = req.params;
    try {
        const info = await Student.findById(id);
        const browser = await pup.launch({ timeout: 0 });
        const page = await browser.newPage();
        
        await page.goto(`${req.protocol}://${req.get('host')}/certificate/cert?info=${encodeURIComponent(JSON.stringify(info))}`, {
            waitUntil: "networkidle2"
        });

        await page.setViewport({ width: 1600, height: 1050 });

        const pdfFileName = `${Date.now()}.pdf`;
        const pdfPath = path.join(__dirname, "../public/files", pdfFileName);

        await page.pdf({
            path: pdfPath,
            format: "A4",
            printBackground: true
        });
        await browser.close();

        await Student.findByIdAndUpdate(id, {
            'certificate': `/files/${pdfFileName}`,
            'isCertified': true
        });

        res.set("Content-Type", "application/pdf");
        res.send("pdf generated");
    } catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('An error occurred while generating the PDF.');
    }
};

module.exports = { callGenerateCertificate, callTemplate, generateCertificate };
