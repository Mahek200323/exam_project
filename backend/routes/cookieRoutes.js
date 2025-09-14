const express = require("express");
const router = express.Router();

// ✅ Set a cookie dynamically using URL param
router.get("/set-cookie/:username", (req, res) => {   //chenages here :username
  const { username } = req.params;              //changes here Set cookie named 'username' with value from URL param

  res.cookie("username", username, { maxAge: 60000, httpOnly: true });
  res.send(`Cookie has been set! for ${username}`);
});

// Get cookies
router.get("/get-cookie", (req, res) => {
  res.send(req.cookies); //shows { username: "something" }
});

// Clear cookie
router.get("/clear-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie cleared!");
});

module.exports = router;
