require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sessionParams = require("./config/sessionParams.js");
const authRoutes = require("./routes/authRoutes.js");
// const connectDB = require("./config/mongoDB.js");

const app = express();

// built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionParams));
app.use(cookieParser());
app.use(cors());

// PORT & DB_CONNECTION
// connectDB().then(() => {
app.listen(5000, () => {
  console.log(`Server is running at http://localhost:5000`);
});
// });

// ROUTES
app.use("/", authRoutes);

// GET REFRESHED TOKEN
// app.post("/refresh_token", async (req, res) => {
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: "https://accounts.spotify.com/api/token",
//     headers: {
//       Authorization: "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64"),
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     form: {
//       grant_type: "refresh_token",
//       refresh_token: refresh_token,
//     },
//     json: true,
//   };

//   request.post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.send({
//         access_token: access_token,
//       });
//     }
//   });
// });

// API DATA REQUSTS
