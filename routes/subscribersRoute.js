const router = require("express").Router();
const sendMessagesController = require("../controllers/sendMessagesController.js");
const {
  addUserSubscribers,
  deleteUserSubscriber,
  fetchAllSubscriber, 
  fetchSubscriberByID,
  deleteSubscriberByID,
} = require("../controllers/subscribersControllers.js");

router.post("/subscribe", addUserSubscribers);
router.delete("/subscribe", deleteUserSubscriber);
router.post("/sendMessage", sendMessagesController);
router.get("/subscribers", fetchAllSubscriber);
router.get("/subscribers/:id", fetchSubscriberByID);
router.delete("/subscriber/:id", deleteSubscriberByID);

module.exports = router;
