const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user");
const connectToMongo = require("./config/db");

const PORT = 9000;
connectToMongo();
app.use(express.static("public/uploads"));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("user api running");
});

// Load routes

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`api running on http://localhost:${PORT}`);
});
