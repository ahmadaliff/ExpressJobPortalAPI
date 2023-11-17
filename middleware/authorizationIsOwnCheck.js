const {
  handleResponse,
  handleNotFound,
} = require("../helpers/handleResponseHelper");
const { Application, Advertisement } = require("../models");

exports.authorizationIsOwnAdvertisement = async (req, res, next) => {
  const { id } = req;
  const { advertisementId } = req.params;
  const dataAdvetisement = await Advertisement.findByPk(advertisementId);
  if (!dataAdvetisement) {
    return handleNotFound(res);
  }
  if (dataAdvetisement.hrId != id) {
    return handleResponse(res, 403, {
      message: "you dont have access to this advertisement",
    });
  }
  next();
};

exports.authorizationIsOwnApplication = async (req, res, next) => {
  const { id } = req;
  const { applicationId } = req.params;
  const dataApplication = await Application.findByPk(applicationId);
  if (!dataApplication) {
    return handleNotFound(res);
  }
  if (dataApplication.hrId == id || dataApplication.applicantId == id) {
    next();
  } else {
    return handleResponse(res, 403, {
      message: "you dont have access to this application",
    });
  }
};
