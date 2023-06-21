const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const multer = require('multer');
const academy  = require('../Schema/academy')
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define a route to handle the form submission
router.post('/sendpdfemail', upload.single('pdfFile'), async (req, res) => {

  try {
    const { originalname, buffer } = req.file;
    const { subject, to, text } = req.body;
    console.log('from the sample ',req.body.appliedby);
    await academy.updateOne(
      { email: req.body.appliedby }, // Assuming "email" is the identifier field for the "academy" collection
      { $set: { resume: buffer } }
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ashwinkaranthamalai@gmail.com',
        pass: 'erwafncksdyciqvz',
      },
    });

    const mailOptions = {
      from: 'ashwinkaranthamalai@gmail.com',
      to: to,
      subject: subject,
      text: text,
      attachments: [
        {
          filename: originalname,
          content: buffer,
          contentType: 'application/pdf',
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while sending the email.');
      } else {
        console.log('Email sent:', info.response);
        res.send('Email sent successfully.');
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing the request.');
  }
});

module.exports = router;
