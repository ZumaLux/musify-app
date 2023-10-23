const express = require("express");
const { getAuth, getLoginToken } = require("../controller/authController");
const { testRequest } = require("../controller/testController");
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
module.exports = router.get("/test", testRequest);
