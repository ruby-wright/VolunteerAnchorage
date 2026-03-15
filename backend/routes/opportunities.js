const express = require("express");
const pool = require("../db");
const requireOrgAuth = require("../middleware/requireOrgAuth");

const router = express.Router();

// GET /opportunities
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public.volunteer_opportunities
       ORDER BY date NULLS LAST, start_time NULLS LAST`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
});

// GET /opportunities/my/list
router.get("/my/list", requireOrgAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public.volunteer_opportunities
       WHERE org_id = $1
       ORDER BY date NULLS LAST, start_time NULLS LAST`,
      [req.orgId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch organization opportunities" });
  }
});

// GET /opportunities/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      `SELECT * FROM public.volunteer_opportunities
       WHERE opportunity_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Opportunity not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch opportunity" });
  }
});

// POST /opportunities
router.post("/", requireOrgAuth, async (req, res) => {
  const {
    title,
    description,
    category,
    location,
    date,
    start_time,
    end_time,
    age_requirement,
    capacity,
    commitment_level
  } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO public.volunteer_opportunities
       (org_id, title, description, category, location, date, start_time, end_time, age_requirement, capacity, commitment_level)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        req.orgId,
        title,
        description || null,
        category || null,
        location || null,
        date || null,
        start_time || null,
        end_time || null,
        age_requirement || null,
        capacity || null,
        commitment_level || null
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create opportunity" });
  }
});

// PUT /opportunities/:id
router.put("/:id", requireOrgAuth, async (req, res) => {
  const id = Number(req.params.id);

  const {
    title,
    description,
    category,
    location,
    date,
    start_time,
    end_time,
    age_requirement,
    capacity,
    commitment_level
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE public.volunteer_opportunities
       SET title = $1,
           description = $2,
           category = $3,
           location = $4,
           date = $5,
           start_time = $6,
           end_time = $7,
           age_requirement = $8,
           capacity = $9,
           commitment_level = $10
       WHERE opportunity_id = $11
         AND org_id = $12
       RETURNING *`,
      [
        title,
        description,
        category,
        location,
        date,
        start_time,
        end_time,
        age_requirement,
        capacity,
        commitment_level,
        id,
        req.orgId
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Opportunity not found or not owned by this organization" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update opportunity" });
  }
});

// DELETE /opportunities/:id
router.delete("/:id", requireOrgAuth, async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      `DELETE FROM public.volunteer_opportunities
       WHERE opportunity_id = $1
         AND org_id = $2
       RETURNING opportunity_id`,
      [id, req.orgId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Opportunity not found or not owned by this organization" });
    }

    res.json({
      message: "Opportunity deleted",
      opportunity_id: result.rows[0].opportunity_id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete opportunity" });
  }
});

module.exports = router;
