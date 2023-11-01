const testRequest = (req, res) => {
  req.session.access_token = "";
  req.session.save();
  res.json({ test: req.session.access_token });
};
const dataRequest = (req, res) => {
  console.log("requeest data!");
  res.json({ test: req?.session?.access_token });
};

module.exports = { testRequest, dataRequest };
