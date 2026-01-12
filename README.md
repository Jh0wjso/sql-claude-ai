# SQL Claude AI - LinkedIn-Inspired Social Network

A complete CRUD social network application inspired by LinkedIn, built with Nest.js, Prisma ORM, and SQLite.

## 🚀 Features

- **User Authentication**: Register and login with email/password
- **User Profiles**: Personal profiles with bio, avatar, location, and website
- **Posts**: Create, read, update, and delete text-only posts
- **Authorization**: Users can only modify their own posts
- **Relational Data**: Automatic profile creation on user registration

## 🛠 Tech Stack

- [Nest.js](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [SQLite](https://www.sqlite.org/) - Self-contained SQL database
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Jh0wjso/sql-claude-ai.git
cd sql-claude-ai

# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start the application
npm run start:dev
```

The API will be running at `http://localhost:3000`

## 📊 Database Schema

### User
- `id` - Unique identifier
- `email` - Unique email address
- `password` - Hashed password
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- Relations: `profile` (one-to-one), `posts` (one-to-many)

### Profile
- `id` - Unique identifier
- `userId` - Foreign key to User
- `name` - User's display name
- `bio` - User biography (optional)
- `avatar` - Avatar URL (optional)
- `location` - Location (optional)
- `website` - Website URL (optional)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Post
- `id` - Unique identifier
- `content` - Post text content
- `authorId` - Foreign key to User
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## 🔌 API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "bio": "Software Developer"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "john@example.com",
  "createdAt": "2026-01-12T17:00:00.000Z",
  "updatedAt": "2026-01-12T17:00:00.000Z",
  "profile": {
    "id": 1,
    "userId": 1,
    "name": "John Doe",
    "bio": "Software Developer",
    "avatar": null,
    "location": null,
    "website": null,
    "createdAt": "2026-01-12T17:00:00.000Z",
    "updatedAt": "2026-01-12T17:00:00.000Z"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "createdAt": "2026-01-12T17:00:00.000Z",
    "updatedAt": "2026-01-12T17:00:00.000Z",
    "profile": {
      "id": 1,
      "userId": 1,
      "name": "John Doe",
      "bio": "Software Developer"
    }
  }
}
```

### Profile Management

#### Get Profile
```http
GET /profiles/:userId
```

#### Update Profile
```http
PUT /profiles/:userId
Content-Type: application/json

{
  "name": "John Smith",
  "bio": "Senior Software Developer",
  "avatar": "https://example.com/avatar.jpg",
  "location": "San Francisco, CA",
  "website": "https://johnsmith.dev"
}
```

#### Delete Profile (and User)
```http
DELETE /profiles/:userId
```

### Posts Management

#### Create Post
```http
POST /posts
Content-Type: application/json

{
  "content": "Hello, this is my first post!",
  "authorId": 1
}
```

**Response:**
```json
{
  "id": 1,
  "content": "Hello, this is my first post!",
  "authorId": 1,
  "createdAt": "2026-01-12T17:00:00.000Z",
  "updatedAt": "2026-01-12T17:00:00.000Z",
  "author": {
    "id": 1,
    "email": "john@example.com",
    "profile": {
      "name": "John Doe",
      "avatar": null
    }
  }
}
```

#### Get All Posts
```http
GET /posts
```

#### Get Single Post
```http
GET /posts/:id
```

#### Get User's Posts
```http
GET /posts/user/:userId
```

#### Update Post
```http
PUT /posts/:id/user/:userId
Content-Type: application/json

{
  "content": "Updated post content"
}
```

**Note:** Users can only update their own posts

#### Delete Post
```http
DELETE /posts/:id/user/:userId
```

**Note:** Users can only delete their own posts

## 🏗 Project Structure

```
src/
├── auth/
│   ├── dto/
│   │   ├── register.dto.ts
│   │   └── login.dto.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── profile/
│   ├── dto/
│   │   └── update-profile.dto.ts
│   ├── profile.controller.ts
│   ├── profile.service.ts
│   └── profile.module.ts
├── posts/
│   ├── dto/
│   │   ├── create-post.dto.ts
│   │   └── update-post.dto.ts
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts

prisma/
└── schema.prisma
```

## 🔐 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 10
- **Authorization**: Post update/delete operations verify ownership
- **Data Validation**: Input validation through DTOs
- **Cascade Delete**: Deleting a user automatically deletes associated profile and posts

## 💡 CRUD Operations Summary

### User (Authentication)
- **Create**: `POST /auth/register` - Register new user with profile
- **Read**: `POST /auth/login` - Login and retrieve user data

### Profile
- **Read**: `GET /profiles/:userId` - Get user profile
- **Update**: `PUT /profiles/:userId` - Update profile information
- **Delete**: `DELETE /profiles/:userId` - Delete profile and user

### Post
- **Create**: `POST /posts` - Create new post
- **Read**: 
  - `GET /posts` - Get all posts
  - `GET /posts/:id` - Get single post
  - `GET /posts/user/:userId` - Get user's posts
- **Update**: `PUT /posts/:id/user/:userId` - Update own post
- **Delete**: `DELETE /posts/:id/user/:userId` - Delete own post

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Database Management

```bash
# Generate Prisma Client after schema changes
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Open Prisma Studio (Database GUI)
npm run prisma:studio
```

## 🎯 Future Enhancements

- JWT authentication with access/refresh tokens
- Post likes and comments
- User connections/following system
- Image upload for posts and avatars
- Search functionality
- Pagination for posts
- Email verification
- Password reset functionality

## 📄 License

This project is [UNLICENSED](LICENSE).

## 👤 Author

Created as a learning project for demonstrating CRUD operations with Nest.js and Prisma.
