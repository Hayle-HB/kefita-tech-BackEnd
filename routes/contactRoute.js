const express = require("express");
const router = express.Router();

const sendContactForm = require("../controllers/contactUsController.js");

router.post("/contact", sendContactForm);

module.exports = router;
