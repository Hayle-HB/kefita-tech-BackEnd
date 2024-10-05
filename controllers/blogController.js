const Blog = require("../models/Blog");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).send("Error fetching blog");
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, description, content, category } = req.body;

    const newBlog = await Blog({
      title,
      description,
      content,
      category,
    });

    await newBlog.save();
    res.status(202).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getBlogs,
  getBlog,
  addBlog,
};
