const express = require("express");
const supabase = require("../supabaseClient");

const router = express.Router();

// GET all opportunities
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("volunteer_opportunities")
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// GET one opportunity by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("volunteer_opportunities")
    .select("*")
    .eq("opportunity_id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// GET opportunities by organization id
router.get("/organization/:orgId", async (req, res) => {
  const { orgId } = req.params;

  const { data, error } = await supabase
    .from("volunteer_opportunities")
    .select("*")
    .eq("org_id", orgId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST create a new opportunity
router.post("/", async (req, res) => {
  const {
    org_id,
    title,
    description,
    category,
    location,
    date,
    start_time,
    end_time,
    age_requirements,
    capacity,
    commitment_level
  } = req.body;

  if (!org_id || !title) {
    return res.status(400).json({
      error: "org_id and title are required"
    });
  }

  const { data, error } = await supabase
    .from("volunteer_opportunities")
    .insert([
      {
        org_id,
        title,
        description,
        category,
        location,
        date,
        start_time,
        end_time,
        age_requirements,
        capacity,
        commitment_level
      }
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message: "Opportunity created successfully",
    opportunity: data
  });
});

module.exports = router;
