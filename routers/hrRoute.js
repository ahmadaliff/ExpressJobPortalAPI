const { Router } = require("express");
const {
  getAdvertisementByhrId,
  addAdvertisement,
  updateAdvertisement,
  changeApplicationStatus,
  deleteAdvertisement,
  getApplicationByhrId,
} = require("../controllers/hrController");
const {
  authorizationIsOwnAdvertisement,
  authorizationIsOwnApplication,
} = require("../middleware/authorizationIsOwnCheck");
const { authorizationRoleHR } = require("../middleware/authorizationRole");

const router = Router();

// middleware klo role hr
router.use(authorizationRoleHR);

router.post("/add-advertisement", addAdvertisement);

// middelware klo punya sendiri
router.get("/get-advertisement", getAdvertisementByhrId);
router.put(
  "/edit-advertisement/:advertisementId",
  authorizationIsOwnAdvertisement,
  updateAdvertisement
);
router.delete(
  "/delete-advertisement/:advertisementId",
  authorizationIsOwnAdvertisement,
  deleteAdvertisement
);

router.get("/get-application", getApplicationByhrId);

// middelware klo punya sendiri
router.patch(
  "/edit-application/:applicationId",
  authorizationIsOwnApplication,
  changeApplicationStatus
);

module.exports = router;
