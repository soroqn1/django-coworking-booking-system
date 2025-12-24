# Coworking Booking System

A full-stack web application for managing coworking space bookings. Built with Django REST Framework and React, this system allows users to browse available workspaces, create bookings, and manage reservations.

## What's This About?

Ever needed to book a desk or meeting room at a coworking space? This app handles that. Users can:

- Browse available workspaces (private offices, hot desks, meeting rooms)
- Book spaces by selecting time slots
- View their booking history
- Cancel pending bookings
- Create new workspaces (admin feature)

The system automatically calculates booking costs based on hourly rates and duration.

## Tech Stack

**Backend:**
- Django 6.0
- Django REST Framework
- PostgreSQL (local installation)
- python-dotenv
- psycopg2-binary

**Frontend:**
- React 18
- React Router
- Pure CSS (no frameworks)

**Development:**
- Docker & Docker Compose (backend + frontend)
- Local PostgreSQL database
- Fish shell
- DBeaver (database management)

## Getting Started

### Prerequisites

Make sure you have PostgreSQL installed and running locally:

```bash
# Check PostgreSQL is running
psql postgres -c "SELECT version();"
```

### Setup Local Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE coworking_db;
CREATE USER coworking_user WITH PASSWORD 'SecurePassword123';
GRANT ALL PRIVILEGES ON DATABASE coworking_db TO coworking_user;
GRANT ALL ON SCHEMA public TO coworking_user;
\q
```

### Option 1: Docker (Recommended)

Everything runs in containers except the database (uses your local PostgreSQL):

```bash
# Start backend and frontend
docker-compose up --build

# In another terminal, run migrations
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

Access:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000/api`
- Admin Panel: `http://localhost:8000/admin`

### Option 2: Virtual Environment (Development)

**Backend Setup:**

```bash
cd backend/core

# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with database credentials (see Environment Variables section)

# Run migrations
python manage.py migrate
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Backend runs on `http://localhost:8000`

**Frontend Setup:**

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs on `http://localhost:3000`

## Project Structure

```
.
├── backend/
│   ├── core/
│   │   ├── bookings/        # Booking management
│   │   ├── workspaces/      # Workspace management
│   │   ├── users/           # User profiles
│   │   └── core/            # Project settings
│   ├── .env                 # Environment variables
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── api.js           # API service
│   │   └── App.js
│   └── package.json
└── docker-compose.yml
```

## API Endpoints

- `GET /api/workspaces/` - List all workspaces
- `POST /api/workspaces/` - Create workspace
- `GET /api/bookings/` - List all bookings
- `POST /api/bookings/` - Create booking
- `DELETE /api/bookings/{id}/` - Cancel booking

## Environment Variables

Create a `.env`

DATABASE_HOST=localhost
DATABASE_PORT=5432
```

**For Docker:** The backend container uses `host.docker.internal` to connect to your local PostgreSQL.UG=True
SECRET_KEY=your-secret-key
DATABASE_NAME=coworking_db
DATABASE_USER=coworking_user
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

## Features

- **Workspace Management**: Create and list different types of workspaces
- **Booking System**: Time-based reservations with automatic price calculation
- **User Interface**: Clean, responsive design without external CSS frameworks
- **API First**: RESTful API with Django REST Framework
- **Database**: PostgreSQL for production-ready data storage

## Development Notes

- Database runs locally, not in Docker (easier to manage and inspect)
- Docker handles only backend and frontend services
- CORS is configured for `localhost:3000` by default
- User authentication is simplified (ID-based) - perfect for extending with proper auth
- Migrations are tracked in git for team consistency
- No `package-lock.json` in git to avoid merge conflicts (team preference)


## License

MIT