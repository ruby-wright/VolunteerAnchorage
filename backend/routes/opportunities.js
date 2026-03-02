const express = require("express");
const pool = require("../db");
const requireOrgAuth = require("../middleware/requireOrgAuth");

const router = express.Router();

// GET /opportunities  (public)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM volunteer_opportunities ORDER BY date NULLS LAST`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load opportunities" });
  }
});

// POST /opportunities  (protected)
router.post("/", requireOrgAuth, async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "title required" });

  try {
    const result = await pool.query(
      `INSERT INTO volunteer_opportunities (org_id, title, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [req.orgId, title, description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create opportunity" });
  }
});

module.exports = router;
