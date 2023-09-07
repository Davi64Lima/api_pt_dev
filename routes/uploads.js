const express = require("express");
const router = express.Router();
const path = require("path");

const caminho = path.join(__dirname, "../public/uploads");

// Configure o middleware express.static para servir arquivos estáticos
router.use("/uploads", express.static(caminho));

// Rota GET para acessar os arquivos na pasta "/uploads"
router.get("/uploads/:nomeDoArquivo", (req, res) => {
  const { nomeDoArquivo } = req.params;
  const arquivoPath = path.join(caminho, nomeDoArquivo);

  res.sendFile(arquivoPath, (err) => {
    if (err) {
      res.status(404).send("Arquivo não encontrado");
    }
  });
});

module.exports = router;
