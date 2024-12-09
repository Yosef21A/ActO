const nodemailer = require('nodemailer');

exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'Yahoo', // Use the same email service
      auth: {
        user: process.env.EMAIL_USER, // Email address
        pass: process.env.EMAIL_PASS, // App password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to the admin's email
      subject: 'Contact Us Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send your message. Please try again later.' });
  }
};
