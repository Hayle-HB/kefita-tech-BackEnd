require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// routes
const contactRoute = require("./routes/contactRoute.js");
const subscriberRoute = require("./routes/subscribersRoute.js");
const blogRoute = require("./routes/BlogRoute.js");
const adminRoute = require("./routes/adminRoutes.js");
const upload = require("./config/upload.js");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 1000;

const Blog = require("./models/Blog.js");

// // Allow only your frontend to access the backend
// const corsOptions = {
//   origin: "https://kefita-technology-plc.github.io/",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// }; 

// app.use(cors(corsOptions));
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to EJS
app.set("view engine", "ejs");
app.use(express.static("public"));
// Set the views directory (optional, default is `views/`)
app.set("views", path.join(__dirname, "views"));

// Middleware for serving static files (e.g., CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} and MongoDB is connected`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", contactRoute);
app.use("/api", subscriberRoute);
app.use("/api", blogRoute);
app.use("/admin", adminRoute);

// Root route to render EJS template
app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome to My Server",
    message:
      "You can't deal with this server directly, please use the frontend",
  });
});
