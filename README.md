# Novi Registration Task

A full-stack web application for user registration and login functionality using a modern stack.

## Tech Stack

### Backend

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **TypeScript**
- **JWT** Authentication
- **Jest** for testing
- **Docker** support

### Frontend

- **React** with **TypeScript** and **Vite**
- **CSS Modules** (no CSS frameworks)
- **React Router**

---

## Getting Started

### Prerequisites

#### Install Docker and Docker Compose (Linux)

```bash
# Update existing list of packages
sudo apt update

# Install packages to allow apt to use a repository over HTTPS
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine and Docker Compose plugin
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verify installation
docker --version
docker compose version
```

### Spin Up the Project

From the root directory:

```bash
docker compose up -d
```

### Project URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Mongo Express**: http://localhost:8081

---

## Running Without Docker

If you prefer to run the project without Docker:

1. Install Node.js (LTS) and MongoDB locally.
2. In `/backend` and `/frontend` run:

     ```bash
     npm install
     npm run dev
## Features

- Registration and login functionality
- Password hashing with bcrypt
- Protected routes using JWT access token
- Simple and stylish UI
- Responsive layout with media queries
- Success message after login
- 404 Not Found route

---

## Known Issues / TODOs

- Refresh token

---
<br>
<br>

Author:
**Igor Ušumović**
