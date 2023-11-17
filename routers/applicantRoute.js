const { Router } = require("express");
const {
  getAdvertisements,
  addApplicationByAdvertisementId,
  deleteApplication,
  updateApplication,
  getApplicationByApplicantId,
} = require("../controllers/applicantController");
const {
  authorizationIsOwnApplication,
} = require("../middleware/authorizationIsOwnCheck");
const {
  authorizationRoleApplicant,
} = require("../middleware/authorizationRole");

const router = Router();

// middleware klo rolenya applicant
router.use(authorizationRoleApplicant);
router.get("/get-advertisement", getAdvertisements);
router.get("/get-application", getApplicationByApplicantId);
router.post(
  "/add-application/:advertisementId",
  addApplicationByAdvertisementId
);

// use middleware here klo punya sendiri
router.delete(
  "/delete-application/:applicationId",
  authorizationIsOwnApplication,
  deleteApplication
);
module.exports = router;
