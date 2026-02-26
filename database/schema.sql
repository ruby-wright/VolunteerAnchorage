-- Organization Table
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contact_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    website_url VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

-- VolunteerOpportunity Table
CREATE TABLE volunteer_opportunities (
    opportunity_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
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
CREATE TABLE volunteer (
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
