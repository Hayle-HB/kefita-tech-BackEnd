const Blog = require("../models/Blog");

const uploadImage = require("../middleware/uploadImage.js");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogByID = async (req, res) => {
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
  console.log(req);
  try {
    const { title, description, content, category } = req.body;

    if (!title || !description || !content) {
      return res
        .status(400)
        .json({ error: "Title, description, and content are required." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Image is required for a blog" });
    }

    const { url, error } = await uploadImage(req.file);

    if (error) {
      return res.status(400).json({ error: err.message });
    }

    const newBlog = new Blog({
      title,
      description,
      content,
      image: url,
      category,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }

    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the blog post." });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const _id = req.params.id;

    await Blog.findByIdAndDelete(_id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.send(500).json({ error: err });
  }
};

const editBlog = async (req, res) => {
  try {
    const _id = req.params.id;
    

    const response = Blog.findByIdAndUpdate();






  } catch (err) {
    res.send(500).json({ error: err });
  }
};

module.exports = {
  getBlogs,
  getBlogByID,
  addBlog,
  deleteBlog,
};
