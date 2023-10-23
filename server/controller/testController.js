const testRequest = (req, res) => {
  const sessionID = req.sessionID;
  const sessionID_cookie = req.cookies["connect.sid"];
  res.send(sessionID_cookie);
};

module.exports = { testRequest };
