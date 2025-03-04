import React, { useEffect, useState } from "react";
import axios from "axios";

const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [status, setStatus] = useState("");

useEffect(() => {
  fetchTasks();
}, [tasks]);

const fetchTasks = async () => {
  const response = await axios.get("http://localhost:3000/api/tasks");
  setTasks(response.data);
};

const postTask = async (task) => {
  const response = await axios.post("http://localhost:3000/api/tasks/add", {
    title: task.title,
    status: task.status,
  });
  console.log(response.data);
};

console.log(response.data);
const addTask = async (e) => {
  e.preventDefault();
  postTask({ title: title, status: status });
  console.log(response.data);
};
const Task = () => {
  return (
    <div className="taskContainer">
      <div className="taskList">
        List of tasks
        <table>
          <thead>
            <tr>
              <th>task id</th>
              <th>title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!tasks ? (
              <p>loading..</p>
            ) : (
              tasks.map((task) => (
                <tr>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <h2>Add new Task</h2>
      </div>
      <div className="taskAdd">
        <form className="taskForm" onSubmit={addTask}>
          <div className="taskTitle">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="taskStatus">
            <label htmlFor="status">status :</label>
            <div
              className="statusRadio"
              onChange={(e) => setStatus(e.target.value)}
            >
              <input type="radio" />
              <label htmlFor="pending">Pending</label>
              <input type="radio" />
              <label htmlFor="completed">Completed</label>
            </div>
          </div>
          <button>Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default Task;
