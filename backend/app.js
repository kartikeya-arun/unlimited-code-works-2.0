const express = require("express");
const cors = require("cors");
const run = require("./utils/db.connect");

const app = express();

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/projects", async (req, res) => {
  const data = await run().catch(console.dir);
  res.json(data);
});

app.listen(process.env.PORT || 8081, () => {
  console.log("server started on 8081");
});
