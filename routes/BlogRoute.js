const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/Blog.js");
const {
  getBlogs,
  getBlog,
  // addBlog,  
} = require("../controllers/blogController.js");

// router.post("/blogs", addBlog);
// Fetch all blogs
router.get("/blogs", getBlogs);

// Fetch a single blog by ID
router.get("blogs/:id", getBlog);

module.exports = router;
