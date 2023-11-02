const { getRefreshToken } = require("./getRefreshToken");

const requestValidation = (req, res, next) => {
  if (!req.session.access_token) {
    if (req.session.refresh_token) {
      console.log("refresh token");
      getRefreshToken(req, res, next);
    } else {
      res.redirect("/logout");
    }
  } else {
    req.session.touch();
    next();
  }
};

module.exports = requestValidation;
