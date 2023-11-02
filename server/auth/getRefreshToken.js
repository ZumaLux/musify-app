const request = require("request");
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// GET REFRESHED TOKEN
const getRefreshToken = (req, res, next) => {
  console.log("getRefreshedToken");
  var refresh_token = req.session.refresh_token;
  console.log("----- SESSION: ----- ", req.session);

  if (!refresh_token) return res.sendStatus(401);

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    console.log("------ BODY ACCESS TOKEN: -------", body.access_token);

    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;

      req.session.access_token = access_token;
      req.session.save();
      console.log("sync: ", req.session.access_token);
      next();
    }
  });
};

module.exports = { getRefreshToken };
