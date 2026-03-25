const express = require("express");
const supabase = require("../supabaseClient");

const router = express.Router();

// POST volunteer signs up for an opportunity
router.post("/", async (req, res) => {
  const {
    opportunity_id,
    first_name,
    last_name,
    email,
    phone_number,
    notes
  } = req.body;

  if (!opportunity_id || !first_name || !last_name || !email) {
    return res.status(400).json({
      error: "opportunity_id, first_name, last_name, and email are required"
    });
  }

  const { data, error } = await supabase
    .from("volunteer_info")
    .insert([
      {
        opportunity_id,
        first_name,
        last_name,
        email,
        phone_number,
        notes
      }
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message: "Volunteer signup successful",
    volunteer: data
  });
});

// GET all volunteers for a specific opportunity
router.get("/opportunity/:opportunityId", async (req, res) => {
  const { opportunityId } = req.params;

  const { data, error } = await supabase
    .from("volunteer_info")
    .select("*")
    .eq("opportunity_id", opportunityId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

module.exports = router;
