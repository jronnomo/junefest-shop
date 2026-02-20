# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Junefest Shop is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application. It's a web store for JUNEFEST merchandise with user authentication, product catalog, shopping cart, and order management.

## Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT authentication with bcryptjs
- Multer for file uploads
- Nodemon for development

**Frontend:**
- React 18 with Create React App
- Redux Toolkit for state management
- React Router v6 for navigation
- Bootstrap 5 with React Bootstrap
- Axios for API calls
- PayPal integration (@paypal/react-paypal-js)
- React Toastify for notifications
- React Helmet Async for SEO

## Directory Structure

```
junefest-shop/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── userModel.js          # User schema
│   │   ├── productModel.js       # Product schema
│   │   └── orderModel.js         # Order schema
│   ├── controllers/              # Route handlers
│   ├── routes/                   # API endpoints
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── orderRoutes.js
│   │   └── uploadRoutes.js
│   ├── middleware/               # Custom middleware (auth, error handling)
│   ├── utils/                    # Utility functions
│   ├── data/                     # Seed data
│   ├── seeder.js                 # Database seeder
│   └── server.js                 # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── screens/              # Page-level components
│   │   ├── slices/               # Redux Toolkit slices
│   │   ├── utils/                # Frontend utilities
│   │   ├── assets/               # Images, fonts
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   └── package.json
├── uploads/                      # User-uploaded files
├── package.json                  # Root package with npm scripts
├── example.env                   # Environment variables template
└── .prettierrc.json             # Code formatting config
```

## Environment Setup

Copy `example.env` to `.env` in the root directory and configure:

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your_mongodb_uri
JWT_SECRET = your_secret_key
PAYPAL_CLIENT_ID = your_paypal_client_id
```

## npm Scripts

### Root Level Scripts
- **`npm run dev`** - Run both backend and frontend concurrently (development)
- **`npm start`** - Start backend server in production mode
- **`npm run server`** - Start backend with nodemon (auto-restart on changes)
- **`npm run client`** - Start frontend dev server
- **`npm run debug`** - Start backend with Node inspector enabled
- **`npm run build`** - Build full application (install deps + build frontend)
- **`npm run data:import`** - Seed database with initial data
- **`npm run data:destroy`** - Clear database seed data

### Frontend Scripts
- **`npm start`** - Start React dev server on port 3000
- **`npm run build`** - Build optimized production bundle
- **`npm test`** - Run tests

## Development Workflow

### Start Development Environment
```bash
npm run dev
```
This runs:
- Backend on http://localhost:8000
- Frontend on http://localhost:3000

The frontend proxy (in frontend/package.json) directs API calls to `http://localhost:8000`.

### Backend API Endpoints
- `/api/products` - Product management
- `/api/users` - User authentication and profiles
- `/api/orders` - Order management
- `/api/upload` - File uploads
- `/api/config/paypal` - PayPal configuration

### Database Seeding
```bash
npm run data:import   # Load seed data
npm run data:destroy  # Clear seed data
```

## Key Architecture Decisions

### State Management
- Redux Toolkit is used for global state (Redux slices in `frontend/src/slices/`)
- Components connect to Redux store for products, users, orders, cart data

### Authentication
- JWT tokens stored in cookies
- User authentication via `/api/users` routes
- Protected routes require valid JWT

### API Communication
- Axios instance configured for API calls
- Proxy setup in frontend allows relative URLs

### File Uploads
- Multer handles file uploads on backend
- Uploaded files stored in `/uploads` directory
- Static file serving configured in server.js

### Payment Processing
- PayPal integration for payments
- PayPal Client ID fetched from `/api/config/paypal`

## Common Development Tasks

### Adding a New API Endpoint
1. Create/update controller in `backend/controllers/`
2. Add route in `backend/routes/`
3. Import route in `backend/server.js`
4. Use Axios in frontend to call the endpoint

### Adding a New Redux Slice
1. Create new file in `frontend/src/slices/` following Redux Toolkit patterns
2. Define state shape, reducers, and async thunks
3. Add to store configuration
4. Use `useSelector` and `useDispatch` in components

### Creating a New Frontend Screen/Page
1. Create component in `frontend/src/screens/`
2. Add route in `App.jsx`
3. Connect to Redux store as needed

### Updating Database Models
1. Modify schema in `backend/models/`
2. Update corresponding controller logic
3. Update seed data if needed
4. Run `npm run data:destroy && npm run data:import` to refresh

## Production Deployment

In production mode (`NODE_ENV=production`):
- Frontend is built and served from `frontend/build/`
- Static assets served by Express
- Single entry point for all routes (handled by React Router)
- Uploads available at `/uploads` endpoint

## Common Issues

### "Port 8000 already in use"
Kill existing process or change PORT in `.env`

### Frontend can't reach backend
- Ensure backend is running on port 8000
- Check proxy setting in `frontend/package.json`
- Verify API URLs are relative paths (e.g., `/api/products`)

### MongoDB connection fails
- Check MONGO_URI in `.env` is valid
- Ensure MongoDB server is running
- Verify network access if using Atlas

## Notes

- The project uses ES6 modules (`"type": "module"` in package.json)
- Prettier is configured for code formatting
- Frontend testing framework is Jest (via create-react-app)
- Error handling middleware centralized in `backend/middleware/errorMiddleware.js`
