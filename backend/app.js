const express = require("express");
const cors = require("cors");
const run = require("./utils/db.connect");

const app = express();

app.use(cors());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "unlimited-code-works-2-0-aceternity.vercel.app",
    ], // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.get("/", async (req, res) => {
  res.redirect("/projects");
});
app.get("/projects", async (req, res) => {
  const data = await run().catch(console.dir);
  res.json(data);
});

app.listen(process.env.PORT || 8081, () => {
  console.log("server started on 8081");
});
