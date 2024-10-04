require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactRoute = require('./routes/contactRoute.js');
const subscriberRoute = require('./routes/subscribersRoute.js');
const app = express();
const PORT = process.env.PORT || 5500;
const mongoose = require('mongoose');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>{
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} and mongoDB is connected`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));


// routes
app.use('/api', contactRoute);
app.use('/api', subscriberRoute)

 
 







