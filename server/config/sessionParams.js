const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

// const store = new MongoStore({
//   uri: process.env.MONGODB_URL,
//   collection: "mySessions",
//   databaseName: "sessions",
// });

// Catch errors
// store.on("error", function (error) {
//   console.log(error);
// });

const sessionParams = {
  // cookie is being sent on session update
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false, // false: dont save session if it hasnt been touched (modified)
  resave: false, // true: for every request to the server we want to create a new session, even for the same server or browser
  // store: store,
  cookie: {
    sameSite: "strict",
  },
};

module.exports = sessionParams;
