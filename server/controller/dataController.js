const request = require("request");
const constants = require("../lib/constants");

// use to request data from the API
const urlEndpoint = (url_endpoint, access_token) => {
  return {
    url: `${constants.SPOTIFY_BASE_URL}${url_endpoint}`,
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };
};
const testRequest = (req, res) => {
  req.session.access_token = "";
  req.session.save();
  res.json({ test: req.session.access_token });
};
const dataRequest = (req, res) => {
  request.get(urlEndpoint("/me", req.session.access_token), function (error, response, body) {
    res.json(body);
  });
};
const getRecommended = (req, res) => {
  console.log("req:", req);
  request.get(
    urlEndpoint("/playlists/37i9dQZEVXbMDoHDwVN2tF", req.session.access_token),
    function (error, response, body) {
      res.send(body);
    }
  );
};

module.exports = { testRequest, dataRequest, getRecommended };
