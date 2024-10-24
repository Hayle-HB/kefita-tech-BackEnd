const express = require("express");
const router = express.Router();
const upload = require('../config/upload.js');
const {
  getBlogs,
  getBlogByID,
  addBlog,
  deleteBlog,
  updateBlog,
  // deleteBlog,
  // searchBlogs,
  // filterBlogs,
  // addComment,
  // likeBlog,
  // shareBlog,
} = require("../controllers/blogController.js");

router.post("/blogs", upload.single('image'), addBlog);
router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlogByID);
router.delete("/blogs/:id", deleteBlog);
// // Update a blog post by ID
router.put("/blogs/:id", updateBlog);

// // Delete a blog post by ID
// router.delete("/blogs/:id", deleteBlog); 

// // Search for blogs
// router.get("/blogs/search", searchBlogs);

// // Filter blogs by category
// router.get("/blogs/filter", filterBlogs);

// // Add a comment to a blog post by ID
// router.post("/blogs/:id/comments", addComment);

// // Like a blog post by ID
// router.post("/blogs/:id/like", likeBlog);

// // Share a blog post by ID (this could return a shareable link)
// router.get("/blogs/:id/share", shareBlog);






module.exports = router;
