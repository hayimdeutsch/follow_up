import express from "express";
import "dotenv/config.js"

const app = express();

app.use(express.json());


const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
})