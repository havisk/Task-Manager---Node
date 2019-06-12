const express = require("express");
require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user-router");
const taskRouter = require("./routers/task-router");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

const bcrypt = require("bcrypt");

const myFunc = async () => {
  const password = "red12345!";
  const hashedPassword = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare("red12345!", hashedPassword);

  console.log(isMatch);
};
myFunc();
