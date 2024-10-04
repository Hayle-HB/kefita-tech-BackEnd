const Subscriber = require("../models/Subscribers.js");

const addUserSubscribers = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Create and save the new subscriber
    const newSubscriber = new Subscriber({
      email: email,
    });

    await newSubscriber.save();

    // send success response
    res
      .status(200)
      .json({ message: "Subscription is done successfully.", email: email });
  } catch (err) {
    res.status(500).json({ message: err.message || "An error occurred" });
  }
};



const deleteUserSubscriber = async (req, res) => {
  try {
    const { email } = req.body;


    const result = await Subscriber.findOneAndDelete({ email });

    if (!result) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    res.status(200).json({ message: "Subscription deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message || "An error occurred" });
  }
};



module.exports = { addUserSubscribers, deleteUserSubscriber };
