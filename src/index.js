const express = require("express");
require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user-router");
const taskRouter = require("./routers/task-router");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET request are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("under maintenance!");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

// const main = async () => {
//   // const task = await Task.findById("5d0fab35acf036316f93069f");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById("5d0faa682162f030ce6252c2");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };
// main();
