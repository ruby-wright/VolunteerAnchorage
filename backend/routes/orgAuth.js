const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();
const requireOrgAuth = require("../middleware/requireOrgAuth");

// POST /org/register
router.post("/register", async (req, res) => {
  const { name, contact_email, password } = req.body;
  if (!name || !contact_email || !password) {
    return res.status(400).json({ error: "name, contact_email, password required" });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO organizations (name, contact_email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING org_id, name, contact_email`,
      [name, contact_email, hashed]
    );

    res.status(201).json({ org: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /org/login
router.post("/login", async (req, res) => {
  const { contact_email, password } = req.body;
  if (!contact_email || !password) {
    return res.status(400).json({ error: "contact_email and password required" });
  }

  try {
    const result = await pool.query(
      `SELECT org_id, password_hash
       FROM organizations
       WHERE contact_email = $1`,
      [contact_email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const org = result.rows[0];
    const ok = await bcrypt.compare(password, org.password_hash || "");
    if (!ok) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { orgId: org.org_id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// GET /org/profile
router.get("/profile", requireOrgAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT org_id, name, description, contact_email, phone_number, website_url
       FROM public.organizations
       WHERE org_id = $1`,
      [req.orgId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});


// PUT /org/profile
router.put("/profile", requireOrgAuth, async (req, res) => {
  const { name, description, contact_email, phone_number, website_url } = req.body;

  try {
    const result = await pool.query(
      `UPDATE public.organizations
       SET name = $1,
           description = $2,
           contact_email = $3,
           phone_number = $4,
           website_url = $5
       WHERE org_id = $6
       RETURNING org_id, name, description, contact_email, phone_number, website_url`,
      [name, description, contact_email, phone_number, website_url, req.orgId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
