const request = require("request");

// use to request data from the API
const urlEndpoint = (url_endpoint, access_token) => {
  return {
    url: `https://api.spotify.com/v1${url_endpoint}`,
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

module.exports = { testRequest, dataRequest };
