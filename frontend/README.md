# Project Pulse - Frontend

A modern project management dashboard built with React, TypeScript, Tailwind CSS, and Vite for Nexventures Ltd.

## Description

**Project Pulse** is a lightweight web application for small teams to track their projects. Features include:
- Landing page with hero section and CTA
- Features showcase page
- Project dashboard with CRUD operations
- Project statistics (Total, Completed, In Progress, Not Started)
- Responsive design (mobile, tablet, desktop)

## Tech Stack

- **Frontend:** React 18 + TypeScript (TSX)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API + Hooks

## Installation

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/fniyonshuti/Project-Pulse.git
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   ```bash
   cp .env
   ```

4. **Configure API URL**
   ```bash
   # Edit .env file
   VITE_API_URL=http://localhost:8000/api
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   - Navigate to http://localhost:5173
   - Backend API should be running on http://localhost:8000

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/    # Navigation, Hero, Features, Dashboard, ProjectCard, ProjectForm
├── hooks/        # useProjects, useForm
├── context/      # ProjectContext (global state)
├── services/     # projectService (7 API endpoints)
├── pages/        # Page routing
├── types/        # TypeScript definitions
├── utils/        # Validation, error handling
└── App.tsx
```

## API Endpoints

```
GET    /api/projects/              Get all projects
POST   /api/projects/              Create project
GET    /api/projects/stats         Get statistics
GET    /api/projects/{id}          Get single project
PUT    /api/projects/{id}          Update project
DELETE /api/projects/{id}          Delete project
PATCH  /api/projects/{id}/status   Update status
```

## Features

 View all projects with name, description, status  
 Create projects with form validation  
 Update project status directly  
 Delete projects  
 View statistics  
 Form validation with error messages  
 Loading states and error handling  
 Mobile responsive design  

## Technical Choices

**React + TypeScript:** Type-safe UI with modern features  
**Vite:** Fastest development experience with HMR  
**Tailwind CSS:** Utility-first styling with small bundle size  
**Context API:** Built-in state management without dependencies  

## Setup Requirements

- Node.js 18+
- Backend API running with 7 RESTful endpoints
- CORS enabled on backend
- Status values: "Not Started", "In Progress", "Completed"

## Deployment

**Vercel:**
```bash
vercel
```

**Netlify:**
```bash
npm run build
# Upload dist/ folder
```

Set environment variable: `VITE_API_URL=<your-api-url>`

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Check TypeScript
```

## Requirements Met

 React + TypeScript (TSX) with Vite  
 Tailwind CSS styling  
Context API for state management  
 RESTful API integration (7 endpoints)  
 CRUD operations for projects  
 Responsive design  
 Form validation  
 Clean code structure  

