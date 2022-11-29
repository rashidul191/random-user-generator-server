const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 6000;
const usersRouter = require("./routers/v1/user.router");

// middleware
app.use(cors());
app.use(express.json());

// routers url here
app.use("/user", usersRouter);

// get server router
app.get("/", (req, res) => {
  res.send("random user generator server running..");
});

app.all("*", (req, res) => {
  res.status(404).send("Sorry!! Not found router.");
});

// listen port
app.listen(port, () => {
  console.log(`listen port: ${port}`);
});
