const mongoose = require("mongoose");

const Comments = mongoose.model("Commments", {
  texto: String,
  data: String, // Define a data com um valor padrão
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Referência a um modelo "User"
  publicacao: { type: mongoose.Schema.Types.ObjectId, ref: "News" }, // Referência a um modelo "Publicacao"
});

module.exports = Comments;
