const { hashPassword } = require("../utils/bcryptUtil");
const { verifyTokenForForgetPassword } = require("../utils/jwtUtil");

exports.verifySendResetMiddleware = async (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    return res.sendStatus(401);
  }
  const { new_password, email } = verifyTokenForForgetPassword(token);
  req.new_password = hashPassword(new_password);
  req.email = email;
  next();
};
