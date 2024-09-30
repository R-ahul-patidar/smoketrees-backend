// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require("./models");
const routes = require("./routes");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (for frontend)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", routes);

// Sync Database and Start Server
const PORT = process.env.PORT || 5000;
models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
