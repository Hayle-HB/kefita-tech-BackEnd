const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");

// Add blog
router.get("/add-blog", adminController.getAddBlog);
router.post("/add-blog", adminController.postAddBlog);

// Blog list
router.get("/blog-list", adminController.getBlogList);

// Send newsletter
router.get("/news-letter", adminController.getSendNewsletter);
router.post("/news-letter", adminController.postSendNewsletter);
router.get('/subscribers', adminController.fetchAllSubscribers)
module.exports = router;
