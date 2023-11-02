const constants = require("../lib/constants");
const { getRefreshToken } = require("./getRefreshToken");

const requestValidation = (req, res, next) => {
  if (!req.session.access_token) {
    if (req.session.refresh_token) {
      console.log("refresh token");
      getRefreshToken(req, res, next);
    } else {
      res.redirect(constants.SERVER_LOGOUT_URL);
    }
  } else {
    req.session.touch();
    next();
  }
};

module.exports = requestValidation;
