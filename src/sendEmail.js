// src/sendEmail.js
import nodemailer from 'nodemailer';

// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'no-reply@labsco2.com',
    pass: '07286a4c7d2ce6a32b29a18e48ce6013-2b91eb47-1f600d20',
  },
});

const sendEmail = (req, res) => {
  const { name, email, message, source } = req.body;

  const mailOptions = {
    from: 'info@labsco2.com', // sender address
    to: 'tanjungzainur@gmail.com',   // list of receivers
    subject: 'Contact Form Submission', // Subject line
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nSource: ${source}`, // plain text body
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>
           <p><strong>Source:</strong> ${source}</p>`, // HTML body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ status: 'error', message: 'Failed to send email.' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ status: 'success', message: 'Email sent successfully.' });
  });
};

export default sendEmail;
