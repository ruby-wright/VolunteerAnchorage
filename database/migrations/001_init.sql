-- Organization Table
CREATE TABLE organizations (
    org_id uuid PRIMARY KEY default gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    contact_name TEXT,
    contact_email TEXT,
    phone_number TEXT,
    website_url TEXT,
    created_at TIMESTAMPTZ NOT NULL default NOW()
);

-- VolunteerOpportunity Table
create table org_member (
    opportunity_id primary key default gen_random_uuid(),
    org_id INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    location TEXT,
    date DATE,
    start_time TIME,
    end_time TIME,
    age_requirement INT,
    capacity INT,
    commitment_level TEXT,

    -- Foreign key constraint
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(organization_id)
        ON DELETE CASCADE
);

-- VolunteerSignup Table
CREATE TABLE volunteer_signups (
    signup_id SERIAL PRIMARY KEY,
    opportunity_id INT NOT NULL,
    volunteer_id INT,
    volunteer_name VARCHAR(255) NOT NULL,
    volunteer_email VARCHAR(255),

    -- Foreign key constraint
    CONSTRAINT fk_opportunity
        FOREIGN KEY (opportunity_id)
        REFERENCES volunteer_opportunities(opportunity_id)
        ON DELETE CASCADE
);