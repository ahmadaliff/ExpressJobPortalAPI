const { handleResponse } = require("../helpers/handleResponseHelper");

exports.authorizationRoleHR = async (req, res, next) => {
  const { role } = req;
  console.log(req);
  if (role != "hr") {
    return handleResponse(res, 403, {
      message: "unauthorize, forbidden access this endpoint ",
    });
  }
  next();
};

exports.authorizationRoleApplicant = async (req, res, next) => {
  const { role } = req;
  if (role != "applicant") {
    return handleResponse(res, 403, {
      message: "unauthorize, forbidden access this endpoint ",
    });
  }
  next();
};
