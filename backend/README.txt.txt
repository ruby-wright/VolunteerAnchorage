***README***

*VolunteerAnchorage Backend*

Overview - VolunteerAnchorage aims to connect local organizations with volunteers by allowing organizations and volunteers to sign up for the. The backend is built using Node.js and Express, and it connects to the Supabase hosted database. 

System Design - 
	- The main server file sets up the middleware, routes, and starts the server on the specified port. Routes are separated into different files located in the routes folder.
	- Database connection -  The system uses Supabase as a backend service. A client is created using environment variables (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) to securely connect to the database. Key Features: Retrieve all organizations and individual organization details, create and view volunteer opportunities, allow volunteers to sign up for opportunities, retrieve volunteers for a specific opportunity

How to Run the backend:
1. Install dependencies: npm install
2. Setup an .env file with supabase_url, supabase_key, port
3. Start the server: node server.js