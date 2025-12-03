# Project Pulse - Backend API

A FastAPI backend for the Project Pulse project management dashboard.

## Tech Stack

- **Framework**: FastAPI
- **Database**: SQLite
- **ORM**: SQLAlchemy
- **Validation**: Pydantic

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── routers/
│   │   ├── __init__.py
│   │   └── projects.py      # Project routes
│   ├── crud.py               # Database operations
│   ├── database.py           # Database configuration
│   ├── models.py             # SQLAlchemy models
│   └── schemas.py            # Pydantic schemas
├── main.py                   # FastAPI application entry point
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables (create this)
└── project_pulse.db          # SQLite database (auto-generated)
```

## Setup Instructions

### 1. Create Virtual Environment

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Application

```bash
# Start the development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API Base URL**: http://localhost:8000
- **Interactive API Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## API Endpoints

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/stats` | Get project statistics |
| GET | `/api/projects/{id}` | Get a specific project |
| POST | `/api/projects` | Create a new project |
| PUT | `/api/projects/{id}` | Update a project |
| PATCH | `/api/projects/{id}/status` | Update project status |
| DELETE | `/api/projects/{id}` | Delete a project |

### Example Requests

#### Create a Project
```bash
curl -X POST "http://localhost:8000/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Website Redesign",
    "description": "Complete overhaul of company website",
    "status": "In Progress"
  }'
```

#### Get All Projects
```bash
curl -X GET "http://localhost:8000/api/projects"
```

#### Update Project Status
```bash
curl -X PATCH "http://localhost:8000/api/projects/1/status?status=Completed"
```

#### Get Project Statistics
```bash
curl -X GET "http://localhost:8000/api/projects/stats"
```

## Database Schema

### Project Model

| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key (auto-generated) |
| name | String | Project name (required) |
| description | String | Project description (optional) |
| status | Enum | Project status (Not Started, In Progress, Completed) |
| created_at | DateTime | Timestamp when project was created |
| updated_at | DateTime | Timestamp when project was last updated |

## Project Status Values

- `Not Started`
- `In Progress`
- `Completed`

## Development

### Database Management

The SQLite database is automatically created when you first run the application. The database file `project_pulse.db` will be created in the backend root directory.

To reset the database:
```bash
# Stop the server
# Delete the database file
rm project_pulse.db  # On macOS/Linux
del project_pulse.db  # On Windows
# Restart the server (database will be recreated)
```

### CORS Configuration

The API is configured to accept requests from:
- http://localhost:5173 (Vite default)
- http://localhost:3000 (React alternative)

To add more origins, edit the `allow_origins` list in `main.py`.

## Testing

You can test the API using:
1. **FastAPI Interactive Docs**: http://localhost:8000/docs
2. **Postman**: Import the endpoints manually
3. **curl**: Use the example commands above

## Technical Decisions

### Why FastAPI?
- Modern, fast, and easy to use
- Automatic API documentation
- Built-in data validation with Pydantic
- Excellent async support for scalability
- Type hints for better code quality

### Why SQLite?
- Zero configuration required
- Perfect for development and small applications
- Easy to migrate to PostgreSQL/MySQL later
- File-based, making it portable

### Why SQLAlchemy?
- Industry-standard ORM for Python
- Database-agnostic (easy to switch databases)
- Powerful query capabilities
- Great integration with FastAPI

## Troubleshooting

### Port Already in Use
If port 8000 is already in use:
```bash
uvicorn main:app --reload --port 8001
```

### Import Errors
Make sure you're in the backend directory and the virtual environment is activated:
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

### Database Errors
Delete the database file and restart:
```bash
rm project_pulse.db
uvicorn main:app --reload
```

## Deployment

For deployment, consider:
- **Railway**: https://railway.app
- **Render**: https://render.com
- **Heroku**: https://heroku.com

Update the CORS origins in `main.py` to include your frontend deployment URL.

## License

This project is for the Nexventures Ltd. technical assessment.