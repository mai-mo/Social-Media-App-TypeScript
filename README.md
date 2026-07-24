# Social Media App (Backend API)

A **TypeScript / Node.js** backend for a social media platform, offering REST and GraphQL APIs, real-time communication with Socket.IO, cloud file storage on AWS S3, Redis-backed OTP & session management, and JWT authentication with Google OAuth support.

## ✨ Features

### Authentication
- Email/password signup & login
- Email confirmation via OTP (rate-limited: max 3 attempts, temporary block on abuse)
- Resend confirmation email
- Sign up / log in with Google (OAuth2 ID token verification)
- JWT access & refresh tokens with token rotation
- Logout (single session or all sessions)
- Login notifications via Firebase Cloud Messaging (FCM), when a device token is provided

### User
- Get authenticated user profile
- Upload/update profile picture
- Upload/update profile cover images (stored on AWS S3)
- Delete account (soft delete)
- Role-based authorization (User / Admin)

### Posts
- Create posts with up to 2 attachments (images)
- Post visibility control: **Public / Friends / Only Me**
- Update posts
- React to posts (like)
- Paginated post listing
- Soft delete with restore support

### Comments
- Comment on posts (with up to 2 attachments)
- Reply to comments (nested replies)

### Real-time & GraphQL
- Socket.IO gateway with authenticated connections (JWT-based handshake)
- Online/offline user presence tracking via Redis
- Chat module (in progress / scaffolded)
- GraphQL endpoint (`/graphql`) alongside REST, with queries for user profile and post listing, and a mutation for reacting to posts

### Infrastructure
- AWS S3 for file storage, with pre-signed URLs for secure downloads
- Redis for OTP management, socket/session tracking, and FCM token storage
- Centralized error handling & request validation (Joi-based)

## 🛠️ Tech Stack

| Layer              | Technology                              |
|---------------------|-------------------------------------------|
| Language            | TypeScript                                |
| Runtime             | Node.js                                    |
| Framework           | Express.js                                  |
| Database            | MongoDB (Mongoose)                           |
| Caching / Sessions  | Redis                                         |
| Real-time           | Socket.IO                                      |
| API (secondary)     | GraphQL (`graphql`, `graphql-http`)              |
| Auth                | JWT, Google OAuth (`google-auth-library`)          |
| File Storage        | AWS S3                                              |
| Notifications       | Firebase Cloud Messaging (FCM)                        |
| Email               | Nodemailer                                              |
| Validation          | Joi                                                       |

## 📁 Project Structure

```
src/
├── app.bootstrap.ts        # Express app setup, route mounting, Socket.IO init
├── main.ts                  # Entry point
├── config/                  # Environment configuration
├── DB/
│   ├── connection.db.ts     # MongoDB connection
│   ├── model/                # Mongoose schemas (User, Post, Comment)
│   └── repository/           # Data access layer
├── common/
│   ├── enums/                 # Shared enums (roles, providers, tokens, etc.)
│   ├── exceptions/             # Custom application exceptions
│   ├── interfaces/             # Shared TypeScript interfaces
│   ├── response/                # Standardized API responses
│   ├── services/                 # Redis, S3, token, notification, security services
│   ├── utils/                     # Email templates, OTP, multer, encryption helpers
│   └── validation/                 # Shared validation schemas
├── middleware/                # Auth, authorization, validation, error handling
└── modules/
    ├── auth/                    # Signup, login, email confirmation, Google auth
    ├── user/                     # Profile, images, logout, token rotation
    ├── post/                     # Posts CRUD, reactions, GraphQL resolvers
    ├── comment/                   # Comments & replies
    ├── chat/                       # Real-time chat (in progress)
    ├── realtime/                    # Socket.IO gateway
    └── graphql/                      # GraphQL schema composition
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance
- Redis instance
- AWS S3 bucket & credentials
- Google OAuth Client ID(s)

### Installation

```bash
git clone https://github.com/mai-mo/Social-Media-App-TypeScript.git
cd Social-Media-App-TypeScript
npm install
```

### Environment Variables

Create a `.env.<environment>` file (e.g. `.env.development`) in the project root:

```env
PORT=3000
DB_URI=your_mongodb_connection_string
REDIS_URI=your_redis_connection_string

SALT_ROUND=10
ENC_IV_LENGTH=16
ENC_KEY=your_encryption_key

USER_ACCESS_TOKEN_SIGNATURE=your_access_token_secret
USER_REFRESH_TOKEN_SIGNATURE=your_refresh_token_secret
SYSTEM_ACCESS_TOKEN_SIGNATURE=your_system_access_token_secret
SYSTEM_REFRESH_TOKEN_SIGNATURE=your_system_refresh_token_secret
ACCESS_TOKEN_EXPIRES_IN=1800
REFRESH_TOKEN_EXPIRES_IN=1800

APP_EMAIL=your_email
APP_EMAIL_PASSWORD=your_email_app_password
APPLICATION_NAME=Social Media App

ORIGINS=http://localhost:3000
CLIENT_IDS=your_google_client_id

AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_EXPIRES_IN=120
```

### Running the App

```bash
npm run start:dev   # development, with hot-reload
npm start            # production
```

The server runs on `http://localhost:PORT` (as set in your `.env` file).

## 📌 API Endpoints (REST)

| Method | Endpoint                                                | Description                                       |
|--------|------------------------------------------------------------|-----------------------------------------------------|
| POST   | `/auth/signup`                                              | Register a new account                              |
| POST   | `/auth/login`                                                | Login with email & password                          |
| PATCH  | `/auth/confirm-email`                                         | Confirm email using OTP                                |
| PATCH  | `/auth/resend-confirm-email`                                   | Resend the confirmation OTP                             |
| POST   | `/auth/signup/gmail`                                             | Signup/login with Google                                 |
| GET    | `/user`                                                            | Get authenticated user's profile                           |
| PATCH  | `/user/profile-image`                                                | Update profile image                                        |
| PATCH  | `/user/profile-cover-image`                                            | Upload profile cover image(s)                                 |
| POST   | `/user/logout`                                                            | Logout (current or all sessions)                                |
| POST   | `/user/rotate-token`                                                       | Rotate access/refresh tokens                                      |
| DELETE | `/user`                                                                       | Delete (soft-delete) account                                        |
| GET    | `/post`                                                                        | List posts (paginated)                                               |
| POST   | `/post`                                                                          | Create a new post (with attachments)                                    |
| PATCH  | `/post/:postId`                                                                    | Update a post                                                              |
| PATCH  | `/post/:postId/react`                                                                | React (like) to a post                                                      |
| POST   | `/post/:postId/comment`                                                               | Add a comment to a post                                                       |
| POST   | `/post/:postId/comment/:commentId/reply`                                                 | Reply to a comment                                                              |
| ALL    | `/graphql`                                                                                  | GraphQL endpoint (authenticated)                                                 |
| GET    | `/Uploads/*path`                                                                              | Stream a file from S3                                                             |
| GET    | `/pre-signed/*path`                                                                             | Get a pre-signed download URL for a file                                          |

## 🚧 Roadmap

- [ ] Complete real-time chat module (currently scaffolded)
- [ ] Expand GraphQL coverage (currently profile & post listing/reactions only)
- [ ] Deploy to a live environment (e.g. Render, Railway)
- [ ] Add automated tests

## 👤 Author

**Mai** — [GitHub](https://github.com/mai-mo)
