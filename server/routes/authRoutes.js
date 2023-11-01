const express = require("express");
const {
  getAuth,
  getLoginToken,
  //   getRefreshedToken,
  logout,
} = require("../controller/authController");
const router = express.Router();

// module.exports = router.get("/", function (req, res) {
//   res.send("/ successfull");
// });
// module.exports = router.get("/auth", function (req, res) {
//   res.send("Auth successfull");
// });

// router.route("/").get(res.send("/ successfull"));
// router.route("/auth").get(res.send("Auth successfull"));

module.exports = router.get("/auth", getAuth);
module.exports = router.get("/login", getLoginToken);
// module.exports = router.get("/refresh-token", getRefreshedToken);
module.exports = router.get("/logout", logout);
