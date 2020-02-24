const bc = require("bcryptjs");

const Auth = require("../../routers/auth/auth-model.js");

async function restricted(req, res, next) {
  // without cookies
  //   const { username, password } = req.headers;

  //   if (username && password) {
  //     try {
  //       const user = await Auth.getBy({ username });

  //       if (user && bc.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ error: "You shall not pass!" });
  //       }
  //     } catch (err) {
  //       res
  //         .status(400)
  //         .json({ error: "User credentials doesn't exist on the database" });
  //     }
  //   } else {
  //     res.status(400).json({ error: "Please provide credentials" });
  //   }

  // with cookies
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "You shall not pass" });
  }
}

module.exports = restricted;
