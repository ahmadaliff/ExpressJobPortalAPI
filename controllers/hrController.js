const {
  handleNotFound,
  handleSuccess,
  handleClientError,
  handleCreated,
  handleResponse,
  handleServerError,
} = require("../helpers/handleResponseHelper");
const { validateJoi, schemaAdvertisement } = require("../helpers/joiHelper");
const { User, Application, Advertisement, sequelize } = require("../models");

exports.getAdvertisementByhrId = async (req, res) => {
  // #swagger.tags = ['hrRoute']
  try {
    const { id } = req;
    const dataUser = await User.findByPk(id, {
      include: { model: Advertisement },
    });
    if (!dataUser) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: dataUser, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.getApplicationByhrId = async (req, res) => {
  // #swagger.tags = ['hrRoute']
  try {
    const { id } = req;
    const dataUser = await User.findByPk(id, {
      include: { model: Application, as: "Userhr" },
    });
    if (!dataUser) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: dataUser });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.addAdvertisement = async (req, res) => {
  // #swagger.tags = ['hrRoute']
  try {
    const { id } = req;
    const newData = req.body;
    newData.hrId = id;
    const isExist = await Advertisement.findOne({
      where: { title: newData.title },
    });
    if (isExist) {
      return handleResponse(res, 400, {
        message: "Advertisement with that name already exists",
      });
    }
    const { error, handleRes } = validateJoi(res, newData, schemaAdvertisement);
    if (error) {
      return handleRes;
    }
    newData.hrId = id;
    const response = await Advertisement.create(newData);
    return handleCreated(res, { data: response, message: "created" });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.deleteAdvertisement = async (req, res) => {
  // #swagger.tags = ['hrRoute']
  try {
    const { advertisementId } = req.params;
    await sequelize.transaction(async (tsc) => {
      const isApllicationExist = await Application.findAll({
        where: { advertisementId: advertisementId },
      });
      if (isApllicationExist) {
        await Application.destroy({
          where: { advertisementId: advertisementId },
          transaction: tsc,
        });
      }
      await Advertisement.destroy({
        where: { id: advertisementId },
        transaction: tsc,
      });
    });

    return handleSuccess(res, { message: "deleted" });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.updateAdvertisement = async (req, res) => {
  // #swagger.tags = ['hrRoute']
  try {
    const newData = req.body;
    const { advertisementId } = req.params;
    const fieldtoEdit = Object.keys(newData);
    const { error, handleRes } = validateJoi(
      res,
      newData,
      schemaAdvertisement,
      fieldtoEdit
    );
    if (error) {
      return handleRes;
    }
    await Advertisement.update(newData, {
      where: { id: advertisementId },
    });
    return handleSuccess(res, { message: "updated" });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.changeApplicationStatus = async (req, res) => {
  // #swagger.tags = ['hrRoute']
  try {
    const statusList = [
      "applied",
      "on review",
      "interview",
      "rejected",
      "success",
      "offering",
    ];
    const { status } = req.body;
    const { applicationId } = req.params;
    if (!statusList.includes(status.toLowerCase())) {
      return handleResponse(res, 400, { message: "status invalid" });
    }
    const isApplicationExist = await Application.findByPk(applicationId);
    if (!isApplicationExist) {
      return handleNotFound(res);
    }
    await Application.update(
      { status: status },
      { where: { id: applicationId } }
    );
    return handleSuccess(res, {
      message: "update status success",
    });
  } catch (error) {
    return handleServerError(res);
  }
};
