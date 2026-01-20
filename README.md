# My InsightLink Project

- InsightLink is a full-stack, high-performance URL shortening service. It allows users to create short links, manage them via a dashboard,this allows them to access real time analytics and click counts 
- The application is based on Redis caching to minimize database recalling during redirection and is fully containerized with Docker for consistent deployment for AWS
- Available for demo "https://insightlink-1.onrender.com" in render.

# Features

- User Authentication: Secure Registration and Login using JWT (JSON Web Tokens).
- URL Shortening: Generate unique, short aliases for long URLs using nanoid.
- High-Performance Redirection: Implements a Caching using Redis to serve popular links instantly.
- Analytics Dashboard: Visualizes click data over the last 30 days using Chart.js.
- Responsive UI: Mobile-friendly dashboard built with React.
- Containerized: Fully dockerized environment (Frontend, Backend, Postgres, Redis).

# TechStack

- Frontend
React.js (Vite): For a fast, interactive user interface.
React Router: For dynamic client-side routing.
Chart.js: For data visualization.
Axios: For API communication.

- Backend
Node.js & Express: RESTful API architecture.
PostgreSQL: Relational database for storing users, links, and click logs.
Redis: In-memory key-value store for caching redirections.
JWT & Bcrypt: For stateless authentication and password hashing.
- DevOps & Deployment
Docker & Docker Compose: Orchestration of multi-container application.
AWS EC2: Live production environment.
Nginx: Reverse proxy (Production).

# Getting Started

Prerequisites

- Node.js (v18+)

- Docker & Docker Compose (Recommended)

PostgreSQL & Redis (If running locally without Docker)

1. Clone the Repository
```bash
 git clone http://github.com/shreeshbhat04-ctrl/insightlink
 
 cd insightlink
```

2. Environment Variables

- Create a .env file in the root directory (or separate .env files in /server if running locally).

Required Variables:

# Database Credentials

- DB_USER=postgres

- DB_PASSWORD=your_secure_password

- DB_DATABASE=insightlink_db

- DB_PORT=5432

# Run with Docker (Recommended)

- This command spins up the Frontend, Backend, PostgreSQL, and Redis simultaneously.
```bash
docker compose up --build
```

# Contributing

- Contributions, issues, and feature requests are welcome!


