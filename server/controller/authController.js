const querystring = require("querystring");
const request = require("request");
const constants = require("../lib/constants");

// ENV
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// CLIENT_AUTH
const getAuth = (req, res) => {
  const scope = `user-modify-playback-state
    user-read-playback-state
    user-read-currently-playing
    user-library-modify
    user-library-read
    user-top-read
    playlist-read-private
    playlist-modify-public`;

  res.redirect(
    constants.SPOTIFY_AUTH_BASE_URL +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        redirect_uri: constants.SERVER_REDIRECT_URL,
        scope: scope,
      })
  );
};

// LOGIN_USER (GET ACCESS TOKEN)
const getLoginToken = (req, res) => {
  const { code, state } = req.query || null;

  var authOptions = {
    url: constants.SPOTIFY_TOKEN_BASE_URL,
    form: {
      code: code,
      redirect_uri: constants.SERVER_REDIRECT_URL,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization: "Basic " + new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body?.access_token;
      const refresh_token = body?.refresh_token;

      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;
      res.cookie("userIsLogged", "true");
      res.redirect(constants.CLIENT_BASE_URL);
    } else {
      res.send(response.statusCode);
    }
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("userIsLogged");
  res.clearCookie("connect.sid");
  res.redirect(`${constants.CLIENT_BASE_URL}?unauthorized`);
  console.log("logout");
};

module.exports = { getAuth, getLoginToken, logout };
