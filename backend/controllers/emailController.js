const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

    res.status(200).json({ message: 'Email enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao enviar email' });
  }
}; 