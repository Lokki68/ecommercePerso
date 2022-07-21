const router = require("express").Router();
const userCtrl = require("../controllers/user.ctrl");

router
  .get("/", userCtrl.getUser)
  .get("/:id", userCtrl.getUserById)
  .post("/register", userCtrl.register)
  .post("/login", userCtrl.login)
  .put("/:id", userCtrl.update)
  .delete("/:id", userCtrl.delete);

module.exports = router;
