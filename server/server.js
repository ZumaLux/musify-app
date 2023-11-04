require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sessionParams = require("./config/sessionParams.js");
const authRoutes = require("./routes/authRoutes.js");
const dataRoutes = require("./routes/dataRoutes.js");
const constants = require("./lib/constants.js");

const app = express();

// built-in middlewares
app.use(cors({ credentials: true, origin: constants.CLIENT_BASE_URL })); // allow access from client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionParams));
app.use(cookieParser());

// PORT
app.listen(5000, () => {
  console.log(`Server is running at ${constants.SERVER_BASE_URL}`);
});

// ROUTES
app.use("/", authRoutes);
app.use("/", dataRoutes);
