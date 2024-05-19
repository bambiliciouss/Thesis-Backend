const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  createRiderLocation,
  getRiderLocation,
} = require("../controllers/riderLocationController");

router.post("/create/location", isAuthenticatedUser, createRiderLocation);
router.get("/rider/location/:id", isAuthenticatedUser, getRiderLocation);
module.exports = router;
