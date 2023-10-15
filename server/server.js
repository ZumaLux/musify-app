const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// PORT
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// TEST
app.get("/", (req, res) => {
  res.json({ users: ["One", "Two", "Three"] });
});

// LOGIN (GET ACCESS TOKEN)
app.get("/login", (req, res) => {
  const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
      },
      body: "grant_type=client_credentials",
    });
    const data = await result.json();
    res.json(data);
  };
  getToken();
});

// API DATA REQUSTS
