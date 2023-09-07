const formatarData = require("../middlewares/formatarData");
const mongoose = require("mongoose");

const News = mongoose.model("News", {
  src: { type: String, required: true },
  title: { type: String, required: true },
  conteudo: { type: String, unique: true, required: true },
  coments: { type: Array, default: [] },
  autor: { type: String, required: true },
  categoria: { type: String, required: true },
  data: { type: String, default: formatarData(new Date()) },
});

module.exports = News;
