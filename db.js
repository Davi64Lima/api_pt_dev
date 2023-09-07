const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true);

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8rqornl.mongodb.net/`
    )

    .then(() => {
      console.log("Conectou ao banco!");
    })
    .catch((err) => console.log(err));
}

module.exports = main;
