import express from "express";

const app = express();
const PORT = 3030;

app.use(express.json());

app.listen(() => {
  console.log(`Server running on http://localhost:${PORT}`);
});
