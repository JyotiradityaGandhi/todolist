const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./db.js");
const cors = require('cors');

const {
  getAllTasks,
  getSpecificTask,
  createNewTask,
  updateTask,
  deleteTask,
} = require("./routes/task.route.js");

const app = express();
dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

app.route("/tasks").get(getAllTasks).post(createNewTask);
app.route("/tasks/:id").get(getSpecificTask).put(updateTask).delete(deleteTask);
