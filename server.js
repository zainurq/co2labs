import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow this origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.urlencoded({ extended: true }));

const port = 8000;

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 465,
  secure: true, // Use SSL/TLS
  auth: {
    user: 'no-reply@labsco2.com', // Your Mailgun username
    pass: '07286a4c7d2ce6a32b29a18e48ce6013-2b91eb47-1f600d20' // Your Mailgun password
  }
});

// Basic GET route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Email API');
});

// POST route for sending emails
app.post('/sendEmail', (req, res) => {
  const { name, email, message, source } = req.body;

  const mailOptions = {
    from: 'info@labsco2.com', // Sender address
    to: 'mail@labsco2.com',
    to: 'tanjungzainur@gmail.com', 
    to: 'ulfa@codingcollective.com', 
    subject: `Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nSource: ${source}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      return res.status(500).json({ status: 'error', message: 'Failed to send email' });
    }
    console.log('Email sent:', info.response);
    res.json({ status: 'success', message: 'Email sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
