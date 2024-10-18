const transporter = require("../config/emailConfig");
const Subscribers = require("../models/Subscribers");

const sendMessagesController = async (req, res) => {
  try {
    const { subject, message } = req.body; // Extracting subject and message from req.body
    const users = await Subscribers.find();

    if (!users || users.length === 0) {
      throw new Error("No subscribers found");
    }

    // Array to hold all email promises
    const emailPromises = users.map(async (user) => {
      try {
        await sendMessage(
          subject,
          message,
          user.email,
          "haylemeskelhaylemariam@gmail.com"
        );
        console.log(`Email sent to: ${user.email}`);
      } catch (error) {
        console.error(`Failed to send email to ${user.email}:`, error.message);
      }
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    res.json({
      message:
        "Newsletter processing initiated. Check logs for individual email results.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const sendMessage = async (subject, message, to, from) => {
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h1 style="color: #333;">Newsletter</h1>
        <p style="font-size: 16px; color: #555;"><strong>Subject:</strong> ${
          subject || "No Subject"
        }</p>
        <p style="font-size: 16px; color: #555;"><strong>Message:</strong></p>
        <p style="font-size: 14px; color: #777; line-height: 1.6;">${message}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">This message was sent from the contact form on your website.</p>
      </div>
    `,
  };

  

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending Email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve("Message sent successfully!");
      }
    });
  });
};

module.exports = sendMessagesController;
