const Blog = require("../models/Blog"); // Assuming you have a Blog model
const Subscribers = require("../models/Subscribers");
exports.getAddBlog = (req, res) => {
  res.render("admin/addBlog");
};

exports.postAddBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({ title, content });
    await blog.save();
    res.redirect("/admin/blog-list");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getBlogList = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("admin/blogList", { blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getSendNewsletter = (req, res) => {
  res.render("admin/sendNewsletter");
};

exports.postSendNewsletter = (req, res) => {
  const { subject, content } = req.body;
  // Logic to send email to all clients
  console.log("Sending newsletter:", subject, content);
  res.redirect("/admin/send-newsletter");
};

exports.fetchAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscribers.find();
    res.render("admin/subscribers", {
      title: "Subscribers",
      subscribers: subscribers,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      message: "Unable to find the Subscribers, refresh or return later",
    });
  }
};
