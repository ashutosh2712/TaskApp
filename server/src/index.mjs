import express from "express";
import router from "./api/task.mjs";
const app = express();

app.use(express.json());
app.use("/api/task", router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Express Server started..");
  console.log(`Listening to ${PORT}`);
  console.log("http://localhost:3000/");
});
