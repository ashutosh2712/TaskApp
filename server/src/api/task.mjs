import { Router } from "express";

const router = Router();

const tasks = [
  { id: 1, title: "Frontend", status: "Pending" },
  { id: 2, title: "Backend", status: "Pending" },
  { id: 3, title: "Database", status: "Completed" },
  { id: 4, title: "Cloud", status: "Pending" },
];

router.get("/", (request, response) => {
  return response.status(200).json(tasks);
});

router.post("/add", (request, response) => {
  const { title, status } = request.body;
  const id = tasks.length + 1;
  tasks.push({ id, title, status });

  return response.status(201).json({ id, title, status });
});

router.patch("/update", (request, response) => {
  const { status, id } = request.body;
  const task = tasks.find((task) => task.id === id);
  task.status = status;
  return response.status(200).json(task);
});

export default router;
