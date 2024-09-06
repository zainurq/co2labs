import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors'; 

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173'], // Allow local and production domains
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Support URL-encoded and JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // If you want to support JSON as well

const port = 8000;

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 465,
  secure: true, // Use SSL/TLS
  auth: {
    user: 'admin', // Mailgun username
    pass: 'admin-2b91eb47-1f600d20' // Mailgun password
  }
});

// Basic GET route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Email API');
});

// POST route for sending emails
app.post('/sendEmail', (req, res) => {
  const { name, email, message, source } = req.body;
  console.log('Request Body:', req.body); // Debug log

  const mailOptions = {
    from: 'info@labsco2.com', // Sender address
    to: ['mail@labsco2.com', 'tanjungzainur@gmail.com', 'ulfa@codingcollective.com'], // Multiple recipients
    subject: `Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nSource: ${source}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ status: 'error', message: 'Failed to send email', error: error.message });
    }
    console.log('Email sent:', info.response);
    res.json({ status: 'success', message: 'Email sent successfully' });
  });
});

// Server listening on port 8000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
