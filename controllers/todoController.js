const Todo = require("../models/todo");

exports.index = async (req, res) => {
  const todos = await Todo.find();

  res.status(200).json({
    data: todos,
    message: "Successfully get data",
  });
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    res.status(200).json({
      data: todo,
      message: "Successfully get data",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.insert = async (req, res) => {
  const { title, expense, income } = req.body;

  const todo = new Todo({
    title,
    expense,
    income,
  });

  await todo.save();

  res.status(201).json({
    message: "Successfully add data",
    data: todo,
    // body: req.body,
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, expense, income } = req.body;

  const todo = await Todo.findByIdAndUpdate(id, {
    title,
    expense,
    income,
  });

  // await todo.save();

  res.status(200).json({
    message: "Successfully update data",
    // data: todo,
    // body: req.body,
  });
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const isExisted = await Todo.findOne({ _id: id });

    if (!isExisted) {
      res.status(404).json({
        message: "No Id founnded",
      });
    }
    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      message: "Successfully deleted data",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
