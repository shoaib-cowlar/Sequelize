const express = require("express");
const { sequelize } = require("./models");
const app = express();

async function main() {
  await sequelize.sync();
}
main();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Index");
});

app.listen(PORT, console.log(`server is running on port ${PORT}`));
