const express = require("express");
const { testRequest, dataRequest, getRecommended } = require("../controller/dataController");
const requestValidation = require("../auth/requestValidation");
const router = express.Router();

router.use(requestValidation);

module.exports = router.get("/getData", dataRequest);
module.exports = router.get("/test", testRequest);
module.exports = router.get("/recommended", getRecommended);
