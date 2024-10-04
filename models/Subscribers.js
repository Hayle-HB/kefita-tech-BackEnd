const mongoose = require("mongoose");

// Define the subscribers schema
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure the email is unique
    lowercase: true, // Store emails in lowercase
    trim: true, // Remove spaces before and after the email
    validate: {
      validator: function (v) {
        // Regular expression to validate email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
});

const Subscribers = mongoose.model("Subscribers", subscriberSchema);

module.exports = Subscribers;
