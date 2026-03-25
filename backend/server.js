const express = require("express");
const cors = require("cors");
require("dotenv").config();

const organizationRoutes = require("./routes/organizations");
const opportunityRoutes = require("./routes/opportunities");
const volunteerRoutes = require("./routes/volunteers");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("VolunteerAnchorage backend is running with Supabase");
});

// routes
app.use("/organizations", organizationRoutes);
app.use("/opportunities", opportunityRoutes);
app.use("/volunteers", volunteerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
