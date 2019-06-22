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

// const jwt = require("jsonwebtoken");

// const myFunc = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "test", {
//     expiresIn: "7 days"
//   });
//   console.log(token);

//   const data = jwt.verify(token, "test");
//   console.log(data);
// };
// myFunc();
