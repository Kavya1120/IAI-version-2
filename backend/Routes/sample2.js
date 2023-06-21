const express = require('express');
const router = express.Router();

router.post('/send-email', upload.single('pdfFile'), (req, res) => {
    const { originalname, path } = req.file;

    // Store the PDF file path in MongoDB
    academy.UpdateOne({email:sentby},{$set:{
        filePath: path,
        originalname:originalname
    }}, (error, result) => {
      if (error) {
        console.error('Error storing PDF file path in MongoDB:', error);
        res.status(500).send('An error occurred while sending the email.');
        return;
      }

      console.log('PDF file path stored in MongoDB');

      // Define the mail options with the attachment
      const mailOptions = {
        from: 'sender@example.com',
        to: 'recipient@example.com',
        subject: 'Attached PDF File',
        text: 'Please find the attached PDF file.',
        attachments: [
          {
            filename: originalname,
            path: path
          }
        ]
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error:', error);
          res.status(500).send('An error occurred while sending the email.');
        } else {
          console.log('Email sent:', info.response);
          res.send('Email sent successfully.');
        }
      });
    });
  });

  module.exports = router;