const Subscribers = require("../models/Subscribers.js");
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

const fetchAllSubscriber = async (req, res) => {
  try {
    const subscribers = await Subscribers.find();
    res.status(200).send(subscribers);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      message: "Unable to find the Subscribers, refresh or return later",
    });
  }
};

const fetchSubscriberByID = async (req, res) => {
  try {
    const _id = req.params.id;

    const subscriber = await Subscriber.findById(_id);

    res.status(200).send(subscriber);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Unable to get this Subscribers ",
    });
  }
};

const deleteSubscriberByID = async (req, res) => {
  try {
    const _id = req.params.id;

    await Subscriber.findOneAndDelete({ _id });

    res.status(200).send({
      message: "Subscriber is deleted",
    });
  } catch (error) {
    res.status(400).send({
      message: "Unable to Delete the user",
    });
  }
};

module.exports = {
  addUserSubscribers,
  deleteUserSubscriber,
  fetchAllSubscriber,
  fetchSubscriberByID,
  deleteSubscriberByID,
};
