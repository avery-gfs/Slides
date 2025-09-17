import { resolve } from "node:path";
import express from "express";
import open from "open";

const file = process.argv[2];
const app = express();

app.use("/", express.static(`${import.meta.dirname}/static`));
app.use("/", express.static("."));

app.use(
  "/reveal.js",
  express.static(`${import.meta.dirname}/node_modules/reveal.js`),
);

app.get("/slides.md", (req, res) => {
  res.sendFile(resolve(file));
});

app.listen(3000, () => {
  console.log(`serving: ${file}`);
  console.log("http://localhost:3000");
});

await open("http://localhost:3000");
