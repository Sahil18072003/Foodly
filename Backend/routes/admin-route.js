const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin-contoller");
const verifyToken = require("../Middlewares/authMiddleware");

// Routes protected by verifyToken middleware
router
  .route("/deleteAllComments/:id")
  .delete(verifyToken, adminController.deleteAllComments);

router.route("/adminPage").get(verifyToken, adminController.getUserContact);
router.route("/adminPage").post(verifyToken, adminController.getUserDetails);
router.route("/adminPage/:id").delete(verifyToken, adminController.deleteUser);

module.exports = router;
