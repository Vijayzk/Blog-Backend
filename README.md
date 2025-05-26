# Backend Server
This is a Node.js/Express backend project that includes authentication, file uploads, database integration using Prisma, and support for session management and third-party OAuth (Google).

🚀 Features
RESTful API built with Express

Prisma ORM for database access

Google OAuth 2.0 with Passport.js

Session management with express-session

JWT authentication

File uploads via multer

Cloudinary integration for media storage

Environment-based configuration using dotenv

Cross-Origin Resource Sharing enabled with cors

📦 Tech Stack

Node.js

Express.js

Prisma

Passport.js

Cloudinary

JWT

Multer

Nodemon


📁 Project Structure
/backend
├── server.js            # Entry point
├── /prisma              # Prisma schema and migrations
├── /routes              # API route handlers
├── /controllers         # Controller logic
├── /middleware          # Custom middleware (auth, error handling, etc.)
├── /config              # Passport, DB, and Cloudinary config
└── .env                 # Environment variables


🛠️ Installation
# Clone the repository
git clone https://github.com/your-username/backend.git](https://github.com/Vijayzk/Blog-Backend.git
cd backend

# Install dependencies
npm install
⚙️ Configuration
Create a .env file in the root directory and add your environment variables:
env
PORT=5000
DATABASE_URL=your_prisma_database_url
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret

🚀 Running the Server

# For development with auto-reloading
npm run server

# For production
npm start
🧪 API Endpoints
You'll want to document your endpoints here. Example:

POST /auth/login - Authenticate a user

GET /auth/google - Start Google OAuth flow

POST /upload - Upload media

GET /profile - Fetch authenticated user data

📝 Scripts
npm start – Starts the server using Node

npm run server – Starts the server with nodemon for development
