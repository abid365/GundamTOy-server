const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middelewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Is Online");
});

app.listen(port, () => {
  console.log(`Server Is Running At Port: ${port}`);
});
