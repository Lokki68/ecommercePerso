const router = require("express").Router();
const withAuth = require("../middleware/auth");
const User = require("../models/user.model");

router.get("/checkToken", withAuth, async (req, res) => {
  const _id = req.body._id;
  const user = await User.find({ _id });

  res.json({ status: 200, data: { msg: "Token Valid", user: user[0] } });
});

module.exports = router;
