const Tasks = require(`${__dirname}/../models/task.model`);

exports.getAllTasks = async (req, res) => {
  try {
    const taskList = await Tasks.find();
    res.status(200).json({
      status: "success",
      data: taskList,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

exports.getSpecificTask = async (req, res) => {
  console.log("request made to get one task");
  try {
    const id = req.params.id;
    const Task = await Tasks.findById(id);
    console.log(Task);
    res.status(200).json({
      status: "success",
      data: Task,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

exports.createNewTask = async (req, res) => {
  console.log("request made to create one task");
  try {
    const newTask = await Tasks.create(req.body);
    res.status(200).json({
      status: "success",
      data: newTask,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  console.log("request made to edit task");
  try {
    const id = req.params.id;
    const updatedTask = await Tasks.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: updatedTask,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  console.log("request made to delete one task");
  try {
    const id = req.params.id;
    console.log(id);
    await Tasks.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Task successfully deleted.",
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};
