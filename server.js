const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static('./'));

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'atieno46@gmail.com',
      pass: 'twojjldofkkbmhbv' // IMPORTANT: Use a Gmail app password, not your actual Gmail password!
    }
  });

  const mailOptions = {
    from: email,
    to: 'atieno46@gmail.com',
    subject: `New Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending message');
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).send('Message received!');
    }
  });
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
}); 