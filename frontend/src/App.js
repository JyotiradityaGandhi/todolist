import { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "http://localhost:3000";

export default function App() {
  // STATES
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [showEditWindow, setShowEditWindow] = useState(false);

  //USEEFFECTS
  useEffect(() => {
    async function getTasks() {
      const response = await fetch(API_BASE + "/tasks");
      const taskResponse = await response.json();
      setTasks(taskResponse.data);
    }
    getTasks();
    console.log(newTaskText);
  }, []);

  //HANDLER FUNCTIONS

  function handleUpdateNewTask(event) {
    setNewTaskText((taskText) => event.target.value);
  }

  async function handleAddNewTask() {
    try {
      const newTask = { text: newTaskText };
      const response = await fetch(API_BASE + "/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        console.log("failed to add new task");
      }
      setNewTaskText("");
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleDeleteTask(task) {
    try {
      console.log(task);
      const confirmation = await fetch(`${API_BASE}/tasks/${task._id}`, {
        method: "DELETE",
      });
      console.log(confirmation);
      setTasks((tasks) => tasks.filter((obj) => obj._id !== task._id));
    } catch (err) {
      console.log(err.message);
    }
  }

  //RETURNS (JSX)
  return (
    <div className="App">
      <NavBar
        newTaskText={newTaskText}
        handleUpdateNewTask={handleUpdateNewTask}
        onAddNewTask={handleAddNewTask}
      />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      {showEditWindow && <EditWindow />}
    </div>
  );
}

function NavBar({ newTaskText, handleUpdateNewTask, onAddNewTask }) {
  return (
    <div className="nav">
      <div className="title">
        <h1>To-Do, or Not to Do</h1>
        <p>
          <i>We must not be unproductive, and hence, we must, infact, do.</i>
        </p>
      </div>
      <Input
        newTaskText={newTaskText}
        handleUpdateNewTask={handleUpdateNewTask}
        onAddNewTask={onAddNewTask}
      />
    </div>
  );
}

function Input({ newTaskText, handleUpdateNewTask, onAddNewTask }) {
  return (
    <form className="form-input" onSubmit={onAddNewTask}>
      <input
        type="text"
        name="text"
        placeholder="What are you planning to do today?"
        value={newTaskText}
        onChange={(e) => handleUpdateNewTask(e)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TaskList({ tasks, onDeleteTask }) {
  return (
    <ul className="taskList">
      {tasks.map((task) => {
        return <Task key={task.id} task={task} onDeleteTask={onDeleteTask} />;
      })}
    </ul>
  );
}

function Task({ task, onDeleteTask }) {
  return (
    <li className="task">
      <input type="checkbox" onClick={() => onDeleteTask(task)} />
      <span>{task.text}</span>
      <button className="edit-button">✏️</button>
    </li>
  );
}

function EditWindow() {
  return <div className="modal">
    <div className="modal-content">
      <input type="text" value={}
    </div>
  </div>
}
