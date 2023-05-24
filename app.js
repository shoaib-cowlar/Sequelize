const express = require("express");
const { sequelize } = require("./models");
const User = require("./models").User;
const Post = require("./models").Post;
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.post("/posts", async (req, res) => {
  const { userUuid, body } = req.body;
  try {
    const user = await User.findOne({
      where: { uuid: userUuid },
    });

    if (user) {
      const post = await Post.create({
        body,
        userId: userUuid,
      });
      return res.json(post);
    } else {
      return res.status(404).json("User not Found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const newUser = await User.create({ name, email, role });
    return res.json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
  await sequelize.authenticate();
  console.log(`Database Connected`);
});
