const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static('./'));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.post('/contact', (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'atieno46@gmail.com',
      pass: 'your-app-password-here' // IMPORTANT: Use a Gmail app password, not your actual Gmail password!
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

// Add a test route
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
}); 