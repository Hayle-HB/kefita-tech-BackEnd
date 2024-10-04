const router = require("express").Router();
const sendMessagesController = require('../controllers/sendMessagesController.js');
const {
  addUserSubscribers,
  deleteUserSubscriber,

} = require("../controllers/subscribersControllers.js");

router.post("/subscribe", addUserSubscribers);
router.delete("/subscribe", deleteUserSubscriber);
router.post("/sendMessage", sendMessagesController);



module.exports = router;
