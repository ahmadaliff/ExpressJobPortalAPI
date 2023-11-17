const {
  handleServerError,
  handleSuccess,
  handleResponse,
  handleNotFound,
  handleClientError,
} = require("../helpers/handleResponseHelper");
const { validateJoi, schemaUser } = require("../helpers/joiHelper");
const {
  handleSendMailForgotPass,
  sendResetPassword,
} = require("../helpers/sendMailHelper");
const { User, Application, Advertisement, sequelize } = require("../models");
const { comparePassword, hashPassword } = require("../utils/bcryptUtil");
const {
  createToken,
  createTokenForForgetPassword,
} = require("../utils/jwtUtil");

exports.login = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const { email, password } = req.body;
    const { error, handleRes } = validateJoi(
      res,
      { email, password },
      schemaUser,
      ["email", "password"]
    );
    if (error) {
      return handleRes;
    }
    const dataUser = await User.findOne({
      where: { email: email },
    });

    if (!dataUser || !comparePassword(password, dataUser?.password)) {
      return handleResponse(res, 400, "invalid email or password");
    }
    const token = createToken(dataUser);
    if (!token) {
      throw new Error("Token Created failed");
    }
    return handleSuccess(res, {
      token: token,
      message: "Login success",
    });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.register = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const newUser = req.body;
    const roleList = ["applicant", "hr"];
    const { error, handleRes } = validateJoi(res, newUser, schemaUser);
    if (error) {
      return handleRes;
    }
    if (!roleList.includes(newUser.role)) {
      return handleResponse(res, 400, "Invalid role");
    }
    const isExist = await User.findOne({ where: { email: newUser.email } });
    if (isExist) {
      return handleResponse(res, 409, "user with that email already existed");
    }
    const response = await User.create(newUser);
    return handleSuccess(res, {
      data: response,
      message: `success register as: ${response.role}`,
    });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.forgotPassword = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const { email, fullName } = req.body;
    const isUserExist = await User.findOne({ where: { email: email } });
    if (!isUserExist) {
      return handleNotFound(res);
    }
    if ((!isUserExist.isEmailAuth && fullName) || isUserExist.isEmailAuth) {
      const new_password = Math.random().toString(36).substring(2, 10);
      const token = createTokenForForgetPassword(new_password, email);
      const resp = await handleSendMailForgotPass(token, email);
      if (resp.accepted.length > 0) {
        return handleSuccess(res, {
          message: "Check your email for forgot password",
        });
      } else {
        return handleSuccess(res, {
          message: "Email for forgot password failed to sent",
        });
      }
    } else {
      // batal kirim
      handleClientError(
        res,
        400,
        "Your email is not verify, you must send again with fullname"
      );
    }
  } catch (error) {
    return handleServerError(res);
  }
};
exports.sendResetPassword = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const { email, new_password } = req;
    const isUserExist = await User.findOne({ where: { email: email } });
    if (!isUserExist) {
      return handleNotFound(res);
    }
    const resp = await sendResetPassword(new_password, email);

    if (resp.accepted.length > 0) {
      await User.update(
        { password: new_password },
        { where: { email: email } }
      );
      return handleSuccess(res, {
        message:
          "Check your email for forgot password, we have send reset password",
      });
    } else {
      return handleSuccess(res, {
        message: "Email for forgot password failed to sent",
      });
    }
  } catch (error) {
    return handleServerError(res);
  }
};

//user yang akses hanya user itu sendiri
exports.editProfile = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const { id } = req;
    const newUser = req.body;
    const fieldtoEdit = Object.keys(newUser);
    const { error, handleRes } = validateJoi(
      res,
      newUser,
      schemaUser,
      fieldtoEdit
    );
    if (error) {
      return handleRes;
    }
    const isExist = await User.findOne({ where: { id: id } });
    if (!isExist) {
      return handleNotFound(res);
    }
    const result = await sequelize.transaction(async (tsc) => {
      if (newUser.password != undefined) {
        newUser.password = hashPassword(newUser.password);
      }
      if (newUser.role && isExist.role !== newUser.role) {
        if (newUser.role === "hr") {
          const isExistinApplication = await Application.findOne({
            where: { applicantId: isExist.id },
          });
          if (isExistinApplication) {
            await Application.destroy({
              where: { applicantId: isExist.id },
              transaction: tsc,
            });
          }
        } else {
          const isExistinAdvertisement = await Advertisement.findOne({
            where: { hrId: isExist.id },
          });
          if (isExistinAdvertisement) {
            await Advertisement.destroy({
              where: { hrId: isExist.id },
              transaction: tsc,
            });
          }
          const isExistinApplication = await Application.findOne({
            where: { hrId: isExist.id },
          });
          if (isExistinApplication) {
            await Application.destroy({
              where: { hrId: isExist.id },
              transaction: tsc,
            });
          }
        }
      }
      const response = await isExist.update(newUser);
      return response;
    });
    return handleSuccess(res, {
      data: result,
      message: "success edit profile",
    });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.getProfile = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const { id } = req;
    const response = await User.findByPk(id);
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
exports.VerifyEmail = async (req, res) => {
  // #swagger.tags = ['GlobalRoute']
  try {
    const { id } = req;
    const isExist = await User.findByPk(id);
    if (!isExist) {
      return handleNotFound(res);
    }
    await isExist.update({ isEmailAuth: true });
    return handleSuccess(res, { message: "Success Verify" });
  } catch (error) {
    return handleServerError(res);
  }
};
