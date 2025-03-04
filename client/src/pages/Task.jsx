import React, { useEffect, useState } from "react";
import axios from "axios";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const postTask = async (task) => {
    try {
      const response = await axios.post("http://localhost:3000/api/task/add", {
        title: task.title,
        status: task.status,
      });
      console.log("response", response);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    await postTask({ title: title, status: status });
    setTitle("");
    setStatus("");
  };
  return (
    <div className="taskContainer">
      <div className="taskList">
        <h2>List of tasks</h2>
        <table>
          <thead>
            <tr>
              <th>task id</th>
              <th>title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <p>loading..</p>
            ) : (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="taskAdd">
        <h2>Add new Task</h2>
        <form className="taskForm" onSubmit={addTask}>
          <div className="taskTitle">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="taskInput"
            />
          </div>
          <div className="taskStatus">
            <div className="statusRadio">
              <label htmlFor="status">
                Status :
                <input
                  type="radio"
                  name="status"
                  value="Pending"
                  checked={status === "Pending"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor="pending">Pending</label>
                <input
                  type="radio"
                  name="status"
                  value="Completed"
                  checked={status === "Completed"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor="completed">Completed</label>
              </label>
            </div>
          </div>
          <button>Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default Task;
