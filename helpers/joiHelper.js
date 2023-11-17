const joi = require("joi");
const { handleResponse } = require("./handleResponseHelper");

//Function to return error status and hanlde response
exports.validateJoi = (res, data, schema, field = null) => {
  const { error } = handleValidateJoi(data, schema, field);
  if (error) {
    return {
      error: true,
      handleRes: handleResponse(res, 400, {
        status: "Validation Failed",
        message: error.details[0].message,
      }),
    };
  }
  return { error: false, handleRes: null };
};

//Function validate with joi and dynamic schema for PATCH
const handleValidateJoi = (data, schema, field) => {
  if (!field) {
    return joi.object(schema).validate(data);
  } else {
    const dynamicSchema = Object.keys(schema)
      .filter((key) => field.includes(key))
      .reduce((obj, key) => {
        obj[key] = schema[key];
        return obj;
      }, {});
    return joi.object(dynamicSchema).validate(data);
  }
};

//Schema User
exports.schemaUser = {
  fullName: joi.string().min(3).required(),
  email: joi.string().email().required(),
  role: joi.string().optional(),
  password: joi.string().required(),
  isEmailAuth: joi.boolean().optional(),
};

//Schema Applications
exports.schemaApplication = {
  status: joi.string().required(),
  applicantId: joi.number().required(),
  advertisementId: joi.number().required(),
  hrId: joi.number().required(),
};

//Schema Lecturer
exports.schemaAdvertisement = {
  title: joi.string().min(3).required(),
  description: joi.string().min(10).required(),
  hrId: joi.number().required(),
};
