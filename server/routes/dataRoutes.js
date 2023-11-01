const express = require("express");
const { testRequest, dataRequest } = require("../controller/testController");
const requestValidation = require("../requestValidation");
const router = express.Router();

router.use(requestValidation);

module.exports = router.get("/getData", dataRequest);
module.exports = router.get("/test", testRequest);
