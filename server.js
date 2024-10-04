require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactRoute = require('./routes/contactRoute.js');
const subscriberRoute = require('./routes/subscribersRoute.js');
const app = express();
const PORT = process.env.PORT || 5500;
const mongoose = require('mongoose');







// Allow only your frontend to access the backend
const corsOptions = {
  origin: 'https://hayle-hb.github.io', 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable if the frontend needs to send cookies or other credentials
};

app.use(cors(corsOptions));




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

 
 







