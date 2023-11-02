require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sessionParams = require("./config/sessionParams.js");
const authRoutes = require("./routes/authRoutes.js");
const dataRoutes = require("./routes/dataRoutes.js");

const app = express();

// built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionParams));
app.use(cookieParser());
app.use(cors());

// PORT
app.listen(5000, () => {
  console.log(`Server is running at http://localhost:5000`);
});

// ROUTES
app.use("/", authRoutes);
app.use("/", dataRoutes);
