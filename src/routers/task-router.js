const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/task");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send();
  }
});

//GET /task?completed=true
//GET /task?limit=10&skip=20
router.get("/tasks", auth, async (req, res) => {
  const _id = req.params.id;
  const user = req.user;

  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  try {
    await user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip)
        }
      })
      .execPopulate();
    res.send(user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const owner = req.user._id;

  try {
    const task = await Task.findOne({ _id, owner });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedToUpdate = ["description", "completed"];
  const isValidUpdate = updates.every(update =>
    allowedToUpdate.includes(update)
  );
  const _id = req.params.id;
  const owner = req.user_id;

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }

  try {
    const task = await Task.findOne({ _id, owner });
    if (!task) {
      res.status(404).send();
    }
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const owner = req.user._id;

  try {
    const task = await Task.findOneAndDelete({ _id, owner });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
