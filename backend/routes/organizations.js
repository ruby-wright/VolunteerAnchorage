const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../supabaseClient");

const router = express.Router();

// GET all organizations
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("organizations")
    .select("org_id, name, description, contact_email, phone_number, website_url, created_at");

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
    .select("org_id, name, description, contact_email, phone_number, website_url, created_at")
    .eq("org_id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST register organization
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      description,
      contact_email,
      phone_number,
      website_url,
      password
    } = req.body;

    if (!name || !contact_email || !password) {
      return res.status(400).json({
        error: "name, contact_email, and password are required"
      });
    }

    // check if org already exists
    const { data: existingOrg, error: existingError } = await supabase
      .from("organizations")
      .select("org_id")
      .eq("contact_email", contact_email)
      .maybeSingle();

    if (existingError) {
      return res.status(500).json({ error: existingError.message });
    }

    if (existingOrg) {
      return res.status(409).json({
        error: "An organization with that email already exists"
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("organizations")
      .insert([
        {
          name,
          description,
          contact_email,
          phone_number,
          website_url,
          password_hash
        }
      ])
      .select("org_id, name, description, contact_email, phone_number, website_url, created_at");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({
      message: "Organization registered successfully",
      organization: data[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST login organization
router.post("/login", async (req, res) => {
  try {
    const { contact_email, password } = req.body;

    if (!contact_email || !password) {
      return res.status(400).json({
        error: "contact_email and password are required"
      });
    }

    const { data: organization, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("contact_email", contact_email)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!organization) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(password, organization.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        org_id: organization.org_id,
        contact_email: organization.contact_email,
        name: organization.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      organization: {
        org_id: organization.org_id,
        name: organization.name,
        contact_email: organization.contact_email,
        phone_number: organization.phone_number,
        website_url: organization.website_url
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
