const express = require("express");
const mongodb = require("./db");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

mongodb();

app.use(express.static("public"));
app.use(express.json());
app.use("/api", require("./routes/createUser"));
app.use("/api", require("./routes/loginUser"));
app.use("/api", require("./routes/displayData"));
app.use("/api", require("./routes/orderData"));
// app.use("/api", require("./controllers/auth"));
// app.use(authRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(5000, function () {
  console.log("server started on port 5000");
});
