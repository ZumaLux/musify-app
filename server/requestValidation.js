const { getRefreshedToken } = require("./controller/authController");

const requestValidation = (req, res, next) => {
  if (!req.session.access_token) {
    if (req.session.refresh_token) {
      console.log("refresh token");
      getRefreshedToken(req, res, next);
    } else {
      res.redirect("/logout");
    }
  } else {
    req.session.touch();
    next();
  }
};

module.exports = requestValidation;
