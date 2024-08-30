const { v4 } = require("uuid");
const Yup = require("yup");

const { send } = require("../../config/sendEmail.js");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.js");
const crypto = require("crypto");
const Register = require("../models/Register.js");

class GoogleLoginController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      idGoogle: Yup.string().required(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { name, email, idGoogle } = req.body;

    const userExists = await Register.findOne({
      where: { email },
    });

    if (!userExists) {
      const password = crypto.randomBytes(3).toString("hex");

      await Register.create({
        id: v4(),
        name,
        email,
        password,
        idGoogle,
      });

      send(name, email);
    }

    const player = await Register.findOne({
      where: { email },
    });

    if (!(await player.checkGoogleId(idGoogle))) {
      return res.status(401).json({ error: "falha na tentativa" });
    }

    return res.json({
      id: player.id,
      name: player.name,
      email: player.email,
      admin: player.admin,
      club_id: player.club_id,
      token: jwt.sign({ id: player.id, name: player.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new GoogleLoginController();
