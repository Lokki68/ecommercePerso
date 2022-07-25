const User = require("../models/user.model");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const userController = {
  getUser: (req, res) => {
    User.find()
      .then((users) => res.json({ status: 200, data: users }))
      .catch((err) => res.status(500).json({ msg: err.message }));
  },

  getUserById: (req, res) => {
    const { id } = req.params;

    User.findById(id)
      .then((user) => res.json({ status: 200, data: user }))
      .catch((err) => res.status(500).json({ msg: err.message }));
  },

  register: (req, res) => {
    const { nickName, email, password } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
      const newUser = new User({
        nickName,
        email,
        password: hash,
      });

      newUser
        .save()
        .then(() => {
          const msg = "Utilisateur créé avec succés !";
          res.json({ status: 200, msg });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (!user) res.status(404).json({ msg: "Utilisateur non trouvé !" });

        bcrypt
          .compare(password, user.password)
          .then((valid) => {
            if (!valid)
              res.status(401).json({ msg: "Mot de passe invalide !" });

            res.json({
              status: 200,
              data: user,
              token: sign({ userId: user._id }, process.env.TOKEN_SECRET, {
                expiresIn: maxAge,
              }),
            });
          })
          .catch((err) => res.status(403).json({ msg: err.message }));
      })
      .catch((err) => res.status(500).json({ msg: err.message }));
  },

  update: (req, res) => {
    const { id } = req.params;
    const { nickName, email } = req.body;

    const newUser = {
      nickName,
      email,
    };

    User.updateOne({ _id: id }, { ...newUser, _id: id })
      .then(() => {
        User.findById({ _id: id }).then((user) => {
          res.json({ status: 200, data: user });
        });
      })
      .catch((err) => res.status(500).json({ msg: err.message }));
  },

  delete: (req, res) => {},
};

module.exports = userController;
