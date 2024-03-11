const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, "Please enter text"],
      unique: true,
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("TaskList", taskSchema);

module.exports = Tasks;
