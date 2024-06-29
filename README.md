# Abbey Fullstack Challenge Frontend

## Table of Contents

- [General Information](#general-information)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Usage](#usage)
- [Postman Documentation](#postman-documentation)

---

## General Information

The Abbey Fullstack challenge implementation by me, is in the form of adding friends and followers and others can also add you as friend and start following you. This REST API application built using the NodeJS, Express framework, PostgreSQL RDMS, Prisma ORM, Redis to to the session which is the best practice when working with sessions on the server which is based on Express and supports TypeScript. It utilizes PostgreSQL as the database management system and JWT for authentication. This API serves as the backend for a task management system. Users can register and authenticate by logging in. A cookie containing a JWT token, which expires after 24 hours, is generated upon login. Users can log out by clearing the cookie.

---

## Dependencies

The following dependencies are required for the application:

- `argon2`
- `cookie-parser`
- `express`
- `express-session`
- `passport`
- `passport-jwt`
- `passport-local`
- `prisma`
- `postgresql`
- `pg`
- `pg-hstore`
- `prettier`
- `@nestjs/config`

---

## Setup

1. Clone this repository to your desktop:
   ```sh
   git clone https://github.com/peterihimire/niyo-tms-app.git
   ```
2. Change directory into the project folder:
   ```sh
   cd niyo-tms-app
   ```
3. Create a .env file:
   ```sh
   touch .env
   ```
4. Copy the following environment variables to your .env file and customize them as needed:
   ```txt
   PORT=8090
   DATABASE_URL=postgresql://postgres:testing123@localhost:5432/task_manager?schema=public
   JWT_SECRET=randomsecretforyou
   ```
5. Install the dependencies:
   ```sh
   npm install
   ```
6. Generate the Prisma client:
   ```sh
   npx prisma generate
   ```
7. Start the application:
   ```sh
   npm run start
   ```
8. To test the API endpoints, use Postman or Insomnia. Optionally, add a global environment variable for the base URL (http://127.0.0.1:8090/api/taskmgt/v1) and name it as desired (e.g., {{TMS}}).

---

## Usage

The application is divided into two main sections: the HTTP section serving the REST API and the WebSocket (Socket.IO) section for real-time communication.

- The REST API handles user signup, signin, user information, and task CRUD operations.
- The WebSocket section manages real-time updates for task creation, updates, and deletion.


