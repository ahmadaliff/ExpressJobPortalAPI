const {
  handleNotFound,
  handleServerError,
  handleSuccess,
  handleCreated,
  handleResponse,
} = require("../helpers/handleResponseHelper");
const { validateJoi, schemaApplication } = require("../helpers/joiHelper");
const { User, Application, Advertisement, sequelize } = require("../models");

exports.getAdvertisements = async (req, res) => {
  // #swagger.tags = ['applicantRoute']
  try {
    const response = await Advertisement.findAll();
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.getApplicationByApplicantId = async (req, res) => {
  // #swagger.tags = ['applicantRoute']
  try {
    const { id } = req;
    const dataUser = await User.findByPk(id, {
      include: { model: Application, as: "UserApplicant" },
    });
    if (!dataUser) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: dataUser, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.addApplicationByAdvertisementId = async (req, res) => {
  // #swagger.tags = ['applicantRoute']
  try {
    const { id } = req;
    const { advertisementId } = req.params;
    const dataAdvertisement = await Advertisement.findByPk(advertisementId);
    const dataUser = await User.findByPk(id);
    if (!dataAdvertisement || !dataUser) {
      return handleNotFound(res);
    }
    const isExistInApplication = await Application.findOne({
      where: { applicantId: id, advertisementId: advertisementId },
    });
    if (isExistInApplication) {
      return handleResponse(res, 400, {
        message: "application with that adertisement already exists",
      });
    }
    const dataApplication = {
      status: "applied",
      applicantId: id,
      hrId: dataAdvertisement.hrId,
      advertisementId: parseInt(advertisementId),
    };
    const { error, handleRes } = await validateJoi(
      res,
      dataApplication,
      schemaApplication
    );
    if (error) {
      return handleRes;
    }
    const response = await Application.create(dataApplication);
    return handleCreated(res, { data: response, message: "created" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deleteApplication = async (req, res) => {
  // #swagger.tags = ['applicantRoute']
  try {
    const { applicationId } = req.params;
    const dataApplication = await Application.findByPk(applicationId);
    if (!dataApplication) {
      return handleNotFound(res);
    }
    await dataApplication.destroy();
    return handleSuccess(res, { message: "deleted" });
  } catch (error) {
    return handleServerError(res);
  }
};
