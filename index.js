require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db");
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Habilita o CORS para todas as rotas
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// models
const newsRouter = require("./routes/news");
const userRouter = require("./routes/user");
const commentsRouter = require("./routes/comments");
const uploadsRouter = require("./routes/uploads");

// Config JSON response
app.use(express.json());

//News Routes
app.use("/noticias", newsRouter);
//User Routes
app.use("/users", userRouter);
//Comments Routes
app.use("/comments", commentsRouter);
// Use o router de arquivos como uma rota separada
app.use("/", uploadsRouter);

// Open Route
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "portifolio/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
