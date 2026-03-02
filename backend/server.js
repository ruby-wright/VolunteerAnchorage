const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

// Authorization routes
const orgAuthRoutes = require("./routes/orgAuth");
const opportunitiesRoutes = require("./routes/opportunities");

const app = express();
const PORT = process.env.PORT || 5000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => console.log("Connected to Postgres"))
  .catch(err => console.error("DB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Testing route
app.get("/", (req, res) => {
  res.send("VolunteerAnchorage backend is running");
});

// Mount Authorization Routes
app.use("/org", orgAuthRoutes); // /org/register, /org/login
app.use("/opportunities", opportunitiesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
