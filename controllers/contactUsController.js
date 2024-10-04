const transporter = require("../config/emailConfig.js");

const sendContactForm = (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: "haylemeskelhaylemariam@gmail.com",
    subject: subject || "No Subject",
    text: message,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h1 style="color: #333;">Contact Form Submission</h1>
        <p style="font-size: 16px; color: #555;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px; color: #555;"><strong>Email:</strong> ${email}</p>
        <p style="font-size: 16px; color: #555;"><strong>Subject:</strong> ${
          subject || "No Subject"
        }</p>
        <p style="font-size: 16px; color: #555;"><strong>Message:</strong></p>
        <p style="font-size: 14px; color: #777; line-height: 1.6;">${message}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">This message was sent from the contact form on your website.</p>
      </div>
    `, // HTML version with inline CSS for better formatting
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Failed to send email.");
    }
    console.log("Email sent:", info.response);
    res.status(200).send("Message sent successfully!");
  });
};

module.exports = sendContactForm;
