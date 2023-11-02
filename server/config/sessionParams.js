const sessionParams = {
  // cookie is being sent on session update
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false, // false: dont save session if it hasnt been touched (modified)
  resave: false, // true: for every request to the server we want to create a new session, even for the same server or browser
  rolling: true, // resets expire time on every request
  cookie: {
    sameSite: "strict",
    // expires on browser close
    // maxAge: 10000,
  },
};

module.exports = sessionParams;
