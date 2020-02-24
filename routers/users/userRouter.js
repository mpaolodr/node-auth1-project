const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
