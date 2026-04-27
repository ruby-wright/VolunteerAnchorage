# VolunteerAnchorage
Repository for VolunteerAnchorage - Capstone 2026
By Ruby Wright, Lara Imperial, and Jihye Kwon
# Overview
Volunteer Anchorage is a web application designed to connect local nonprofits with volunteers in Anchorage, Alaska. The platform allows organizations to post volunteer opportunities and enables users to browse and sign up for events that match their interests and availability.

---

## Purpose
The goal of Volunteer Anchorage is to simplify the process of finding and managing volunteer opportunities. Many nonprofits struggle to reach volunteers, while individuals often have difficulty finding opportunities that fit their schedule. This platform bridges that gap by providing a centralized and user-friendly system.

---

## Features

### For Volunteers
- Browse available volunteer opportunities
- View details such as date, time, and location
- Sign up for opportunities without needing an account
- Simple and accessible user interface

### For Organizations
- Create an account and log in securely
- Post and manage volunteer opportunities
- View and manage volunteer sign-ups

---

## System Design

### Frontend
- React (with TypeScript)

### Database & Auth
- Supabase (PostgreSQL)
- Supabase Authentication

### Development Tools
- Git & GitHub
- React
- Javascript and JSON

---

## System Architecture

The application follows a client-server architecture:

- The **frontend** (React) handles user interaction and UI rendering.
- **Supabase** is used for database storage and authentication.

Communication between frontend and supabase is handled through REST API endpoints.

---

## Database Schema

### Organizations Table
- org_id (UUID, primary key)
- name
- organization_email
- contact_name
- contact_email
- created_at

### Volunteer Opportunities Table
- opportunity_id
- org_id
- title
- description
- category
- location
- date
- start_time
- end_time
- age_requirements
- capacity
- commitment_level
- photo_url

### Volunteer Info Table
- opportunity_id
- volunteer_info_id
- first_name
- last_name
- email
- phone_number
- notes

---

## Installation & Setup

### Prerequisites
- React
- Javascript and JSON
- Git

## To Run
- Navigate to the VolunteerAnchorage/frontend
- open terminal
- npm run dev
  
### Clone the Repository
git clone https://github.com/ruby-wright/VolunteerAnchorage
