const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  createRiderLocation,
} = require("../controllers/riderLocationController");

router.post("/create/location", isAuthenticatedUser, createRiderLocation);

module.exports = router;
