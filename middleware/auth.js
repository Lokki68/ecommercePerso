const { verify } = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === undefined) {
    res.status(404).json({ msg: "Token not found !" });
  } else {
    verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "invalid token" });
      } else {
        req.body._id = decoded.userId;
        next();
      }
    });
  }
};
