const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  createRiderLocation,
  getRiderLocation,
} = require("../controllers/riderLocationController");

router.post("/create/location", isAuthenticatedUser, createRiderLocation);
router.get("/rider/location", isAuthenticatedUser, getRiderLocation);
module.exports = router;
