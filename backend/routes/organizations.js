const express = require("express");
const supabase = require("../supabaseClient");

const router = express.Router();

// GET all organizations
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("organizations")
    .select(
      "org_id, user_id, organization_name, organization_email, contact_name, contact_email, phone_number, website_url, created_at"
    );

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// GET one organization by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("organizations")
    .select(
      "org_id, user_id, organization_name, organization_email, contact_name, contact_email, phone_number, website_url, created_at"
    )
    .eq("org_id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

module.exports = router;