iListed 

This is a Nest.js application with a PostgreSQL database, managed by Prisma. The project is containerized using Docker and Docker Compose.

Prerequisites
Ensure you have the following installed:

Docker (with Docker Compose)
Node.js (v20 or later, for local development outside Docker)
npm (included with Node.js)

Setup Instructions
1. Clone the Repository ilisted
cd ilisted

2. Configure Environment Variables
Create a .env file in the project root with the following:
DATABASE_URL=postgres://postgres:postgres@db:5432/ilisted (modify in env for production)
JWT_SECRET=
JWT_EXPIRES_IN=
MAIL_HOST=
MAIL_USER=
MAIL_PASS=
MAIL_FROM=
MAIL_PORT=
MAIL_SECURE=

3. Build and Run with Docker

Start the services:
docker-compose up --build

Verify services:

Nest.js App: http://localhost:3000/api/v1
pgAdmin: http://localhost:5050 
PostgreSQL: Port 5432 (accessible via db hostname in Docker)


4. Viewing Data in pgAdmin

Open http://localhost:5050 in your browser.
Log in with:  (modify at docker-compose for production)
Email: admin@ilisted.com
Password: admin123


Add a new server:
General Tab:
Name: iListedDB

Connection Tab:
Host: db
Port: 5432
Maintenance database: ilisted
Username: postgres
Password: postgres


6. Stopping the Application
To stop the containers:
docker-compose down

To stop and remove volumes (reset database):
docker-compose down -v

 
