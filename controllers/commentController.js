const Comments = require("../models/commentModel");
const News = require("../models/newsModel");
const User = require("../models/userModel");

exports.findAll = async (req, res) => {
  try {
    const comments = await Comments.find();

    // Crie uma nova lista de comentários com o nome do autor associado
    const commentsWithAuthors = await Promise.all(
      comments.map(async (comment) => {
        const author = await User.findById(comment.author);
        return {
          ...comment.toObject(),
          author: author.name,
        };
      })
    );

    res.status(200).json(commentsWithAuthors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao obter os comentários." });
  }
};

exports.findByNews = async (req, res) => {
  try {
    const { NewsId } = req.params;

    const comments = await Comments.find({ publicacao: NewsId });

    // Crie uma nova lista de comentários com o nome do autor associado
    const commentsWithAuthors = await Promise.all(
      comments.map(async (comment) => {
        const author = await User.findById(comment.author);
        return {
          ...comment.toObject(),
          author: author.name,
        };
      })
    );

    res.status(200).json(commentsWithAuthors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao obter os comentários." });
  }
};

exports.create = async (req, res) => {
  try {
    const { texto, data, author, publicacao } = req.body;

    if (!texto || !data || !author || !publicacao) {
      return res.status(422).json({ msg: "Campos obrigatórios ausentes" });
    }

    const comment = new Comments({
      texto,
      data,
      author,
      publicacao,
    });

    const commentSave = await comment.save();
    const commentId = commentSave._id;
    News.findByIdAndUpdate(
      publicacao,
      { $push: { coments: commentId } },
      { new: true, useFindAndModify: false }
    ).exec();

    res.status(201).json({ msg: "Comentário cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Algo deu errado!" });
  }
};
