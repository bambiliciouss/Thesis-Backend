const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {
  registerUser,
  verifyEmail,
  LoginUser,
  getProfile,
  logout,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  AllUsers,
  GetUserDetails,
  UpdateUser,
  DeleteUser,
  registerEmployee,
  registerRider,
  updateProfileRider,
  updateProfileEmployee,
  addAddress,
  editAddress,
  deleteAddress,
  getAllAddresses,
  getAddressDetails,
  setDefaultAddress,
  admingetAllAddresses,
  updateAdminProfile,
  registerAdmin,
  AllStoreUsers,
  AllStoreEmployee,
  GetStaffDetails,
  AllStoreRider,
  AllStaff,
  SingleBranchUsers,
  updateProfileMobile,
  addAddressMobile,
  BranchUsers,
  getQRdetails
} = require("../controllers/authController");


const authenticateUserAddress = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    // Decode the token and attach user information to req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};



const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
router.post("/register", upload.single("avatar"), registerUser);

router.post(
  "/register/admin",
  upload.fields([
    { name: "validID", maxCount: 1 },
    { name: "mayorsPermit", maxCount: 1 },
  ]),
  registerAdmin
);

router.post(
  "/register/employee",
  upload.fields([
    { name: "medcert", maxCount: 1 },
    { name: "barangayclearance", maxCount: 1 },
  ]),
  registerEmployee
);

router.post(
  "/register/rider",
  upload.fields([
    { name: "medcert", maxCount: 1 },
    { name: "barangayclearance", maxCount: 1 },
    { name: "driverslicense", maxCount: 1 },
  ]),
  registerRider
);
router.get("/:id/verify/:token", verifyEmail);
router.post("/login", LoginUser);
router.get("/me", isAuthenticatedUser, getProfile);
router.get("/logout", logout);
router.put(
  "/me/update",
  upload.single("avatar"),
  isAuthenticatedUser,
  updateProfile
);

router.put(
  "/me/admin/update",
  upload.single("avatar"),
  isAuthenticatedUser,
  updateAdminProfile
);

router.post("/me/address", isAuthenticatedUser, addAddress);
router.put("/me/update/address/:id", isAuthenticatedUser, editAddress);
router.delete("/me/address/:id", isAuthenticatedUser, deleteAddress);
router.get("/me/addresses", isAuthenticatedUser, getAllAddresses);
router.get("/me/address/details/:id", isAuthenticatedUser, getAddressDetails);
router.post(
  "/me/setdefault/address/:id",
  isAuthenticatedUser,
  setDefaultAddress
);

router.get("/me/addresses/:id", isAuthenticatedUser, admingetAllAddresses);

router.put("/password/update", isAuthenticatedUser, updatePassword);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

//ADMIN
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AllUsers
);

router.get(
  "/admin/store/users",
  isAuthenticatedUser,
  authorizeRoles("admin", "employee"),
  AllStoreUsers
);

router.get(
  "/admin/store/employee/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AllStoreEmployee
);

router.get(
  "/admin/store/staff/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AllStaff
);

router.get(
  "/admin/store/customer/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  SingleBranchUsers
);



router.get(
  "/store/customerlist/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  BranchUsers
);

router.get(
  "/admin/store/rider/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "employee"),
  AllStoreRider
);
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  GetUserDetails
);

router.get(
  "/admin/staff/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  GetStaffDetails
);

router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("superadmin"),
  DeleteUser
);

router.put(
  "/rider/update/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "medcert", maxCount: 1 },
    { name: "barangayclearance", maxCount: 1 },
    { name: "driverslicense", maxCount: 1 },
  ]),
  isAuthenticatedUser,
  updateProfileRider
);

router.put(
  "/employee/update/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "medcert", maxCount: 1 },
    { name: "barangayclearance", maxCount: 1 },
  ]),
  isAuthenticatedUser,
  updateProfileEmployee
);

router.put(
  "/admin/user/:id",
  upload.single("avatar"),
  isAuthenticatedUser,
  authorizeRoles("admin"),
  UpdateUser
);

router.get("/user/qr/:id", GetUserDetails);
router.get("/user/qrstatus/:id", getQRdetails);
router.put(
  "/me/update/mobile/:id",
  upload.single("avatar"),
  isAuthenticatedUser,
  updateProfileMobile
);

router.post("/me/address/mobile/:id", upload.none(), addAddressMobile);

module.exports = router;
