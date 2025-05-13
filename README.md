# StealthRDP - Secure Remote Desktop Infrastructure

## Project Overview

StealthRDP provides enterprise-grade remote desktop infrastructure with unmatched security and performance. This project contains the frontend website for StealthRDP services.

## Technology Stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- MongoDB
- Express.js

## Local Development

Follow these steps to run the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd stealthrdp2

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Backend Development

The backend is built with Express.js and MongoDB. To run the backend server:

```sh
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start the server
npm start
```

## Deployment

The frontend is deployed on Vercel and the backend is deployed on Railway.

### Frontend Deployment (Vercel)

- Connect your GitHub repository to Vercel
- Configure build settings:
  - Framework preset: Vite
  - Build command: `npm run build`
  - Output directory: `dist`

### Backend Deployment (Railway)

- Connect your GitHub repository to Railway
- Configure environment variables for MongoDB connection
- Set the start command to `node server/server.js`

### CORS Configuration

The backend server is configured to allow requests from:
- https://www.stealthrdp.com
- https://stealthrdp.com
- http://localhost:8080 (for local development)

If you need to add additional domains, update the `allowedOrigins` array in `server/server.js`.

## Features

- Remote Desktop Plans for USA and EU regions
- Secure and high-performance RDP infrastructure
- Enterprise-grade security
- Admin panel for managing plans and subscriptions
- User dashboard for managing RDP services

## Contact Support

For any issues or questions, please contact support at:
- Email: support@stealthrdp.com
- Support Ticket: https://stealthrdp.com/dash/submitticket.php
