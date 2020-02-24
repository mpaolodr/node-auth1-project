const router = require("express").Router();
const bc = require("bcryptjs");

const Auth = require("./auth-model.js");

router.post("/register", async (req, res) => {
  let userData = req.body;

  if (userData.username && userData.password) {
    try {
      // hash before saving
      bc.hash(userData.password, 10, async (err, hash) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          // if no errors, proceed adding user to database
          userData.password = hash;

          const user = await Auth.add(userData);
          res.status(201).json(user);
        }
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: "request cannot be processed at this time" });
    }
  } else {
    res.status(400).json({ errorMessage: "Please provide credentials" });
  }
});

router.post("/login", async (req, res) => {
  const userData = req.body;

  if (userData.username && userData.password) {
    try {
      const user = await Auth.getBy({ username: userData.username });

      if (user && bc.compareSync(userData.password, user.password)) {
        //   provide user cookie after login
        req.session.user = user;

        res.status(200).json({ message: "Logged In!" });
      } else {
        res.status(401).json({ error: "You shall not pass" });
      }
    } catch (err) {
      res.status(500).json({ error: "User does not exist in database" });
    }
  } else {
    res.status(400).json({ error: "Please provide credentials" });
  }
});

module.exports = router;
