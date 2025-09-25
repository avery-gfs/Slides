import { resolve } from "node:path";
import express from "express";

const app = express();

app.use("/", express.static(`${import.meta.dirname}/static`));
app.use("/", express.static("."));

app.use(
  "/reveal.js",
  express.static(`${import.meta.dirname}/node_modules/reveal.js`),
);

app.get(/.*/, (req, res) =>
  res.sendFile(`${import.meta.dirname}/static/index.html`),
);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
