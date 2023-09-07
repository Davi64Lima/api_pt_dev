const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userSignJwtAccessToken } = require("../config/jwt");
//Register Route
exports.create = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    if (!name) {
      return res.status(422).json({ msg: "O nome é obrigatorio!" });
    }
    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatorio!" });
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatorio!" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ msg: "Este email já esta cadastrado" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
      isAdmin,
    });

    await user.save();

    res.status(201).json({ msg: "Usuario criado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Algo aconteceu de errado!" });
  }
};

//Get All Users Route
exports.findAll = async (req, res) => {
  try {
    const users = await User.find().sort({ data: -1 }); // Ordena por data decrescente
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro os dados de usuarios." });
  }
};

//Login Route
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatorio!" });
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatorio!" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({ msg: "Usuario não encontrado!" });
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida" });
    }

    const userWithoutPass = { ...user.toObject() };
    delete userWithoutPass.password;
    const token = userSignJwtAccessToken(userWithoutPass);

    res
      .status(200)
      .json({ msg: "Autenticação reazlizada com sucesso!", token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Algo de errado aconteceu, tente novamente mais tarde!" });
  }
};

exports.validation = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(422).json({ msg: "Usuario não encontrado!" });
    }

    const userWithoutPass = { ...user.toObject() };
    delete userWithoutPass.password;

    res.status(200).json({
      msg: "Usuario autenticado com sucesso!",
      isAuthenticated: true,
      user: userWithoutPass,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Algo de errado aconteceu!", isAuthenticated: false });
  }
};
