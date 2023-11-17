const { Router } = require("express");
const applicantRoute = require("./applicantRoute");
const hrRoute = require("./hrRoute");
const {
  login,
  register,
  editProfile,
  VerifyEmail,
  forgotPassword,
  sendResetPassword,
} = require("../controllers/userController");
const {
  authenticationMiddleware,
} = require("../middleware/AuthenticationMiddleware");
const {
  verifySendResetMiddleware,
} = require("../middleware/sendResetPassMiddleware");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.get(
  "/send-reset-password/:token",
  verifySendResetMiddleware,
  sendResetPassword
);

// must login
router.use(authenticationMiddleware);

router.patch("/verify-email", VerifyEmail);
router.put("/edit-profile", editProfile);

router.use("/applicant", applicantRoute);
router.use("/hr", hrRoute);

module.exports = router;
