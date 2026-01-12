# API Testing Examples

This file contains example API requests you can use to test the application with tools like Postman, Insomnia, or cURL.

## Base URL
```
http://localhost:3000
```

## 1. Authentication

### Register a New User

**Request:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "alicePassword123",
    "name": "Alice Johnson",
    "bio": "Full-stack developer passionate about building scalable applications"
  }'
```

**Expected Response (201):**
```json
{
  "id": 1,
  "email": "alice@example.com",
  "createdAt": "2026-01-12T17:00:00.000Z",
  "updatedAt": "2026-01-12T17:00:00.000Z",
  "profile": {
    "id": 1,
    "userId": 1,
    "name": "Alice Johnson",
    "bio": "Full-stack developer passionate about building scalable applications",
    "avatar": null,
    "location": null,
    "website": null,
    "createdAt": "2026-01-12T17:00:00.000Z",
    "updatedAt": "2026-01-12T17:00:00.000Z"
  }
}
```

### Login User

**Request:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "alicePassword123"
  }'
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "alice@example.com",
    "createdAt": "2026-01-12T17:00:00.000Z",
    "updatedAt": "2026-01-12T17:00:00.000Z",
    "profile": {
      "id": 1,
      "userId": 1,
      "name": "Alice Johnson",
      "bio": "Full-stack developer passionate about building scalable applications",
      "avatar": null,
      "location": null,
      "website": null,
      "createdAt": "2026-01-12T17:00:00.000Z",
      "updatedAt": "2026-01-12T17:00:00.000Z"
    }
  }
}
```

## 2. Profile Management

### Get User Profile

**Request:**
```bash
curl -X GET http://localhost:3000/profiles/1
```

### Update Profile

**Request:**
```bash
curl -X PUT http://localhost:3000/profiles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson-Smith",
    "bio": "Senior Full-stack Developer | Tech Enthusiast",
    "avatar": "https://example.com/avatars/alice.jpg",
    "location": "San Francisco, CA",
    "website": "https://alicejohnson.dev"
  }'
```

**Expected Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "name": "Alice Johnson-Smith",
  "bio": "Senior Full-stack Developer | Tech Enthusiast",
  "avatar": "https://example.com/avatars/alice.jpg",
  "location": "San Francisco, CA",
  "website": "https://alicejohnson.dev",
  "createdAt": "2026-01-12T17:00:00.000Z",
  "updatedAt": "2026-01-12T17:05:00.000Z",
  "user": {
    "id": 1,
    "email": "alice@example.com",
    "createdAt": "2026-01-12T17:00:00.000Z"
  }
}
```

## 3. Posts Management

### Create a Post

**Request:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Just finished implementing a new authentication system using Nest.js and Prisma! The modularity and type safety are amazing. 🚀",
    "authorId": 1
  }'
```

**Expected Response (201):**
```json
{
  "id": 1,
  "content": "Just finished implementing a new authentication system using Nest.js and Prisma! The modularity and type safety are amazing. 🚀",
  "authorId": 1,
  "createdAt": "2026-01-12T17:10:00.000Z",
  "updatedAt": "2026-01-12T17:10:00.000Z",
  "author": {
    "id": 1,
    "email": "alice@example.com",
    "profile": {
      "name": "Alice Johnson-Smith",
      "avatar": "https://example.com/avatars/alice.jpg"
    }
  }
}
```

### Create Another Post

**Request:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Looking forward to the upcoming tech conference. Anyone else attending? Would love to connect!",
    "authorId": 1
  }'
```

### Get All Posts

**Request:**
```bash
curl -X GET http://localhost:3000/posts
```

**Expected Response (200):**
```json
[
  {
    "id": 2,
    "content": "Looking forward to the upcoming tech conference. Anyone else attending? Would love to connect!",
    "authorId": 1,
    "createdAt": "2026-01-12T17:15:00.000Z",
    "updatedAt": "2026-01-12T17:15:00.000Z",
    "author": {
      "id": 1,
      "email": "alice@example.com",
      "profile": {
        "name": "Alice Johnson-Smith",
        "avatar": "https://example.com/avatars/alice.jpg"
      }
    }
  },
  {
    "id": 1,
    "content": "Just finished implementing a new authentication system using Nest.js and Prisma! The modularity and type safety are amazing. 🚀",
    "authorId": 1,
    "createdAt": "2026-01-12T17:10:00.000Z",
    "updatedAt": "2026-01-12T17:10:00.000Z",
    "author": {
      "id": 1,
      "email": "alice@example.com",
      "profile": {
        "name": "Alice Johnson-Smith",
        "avatar": "https://example.com/avatars/alice.jpg"
      }
    }
  }
]
```

### Get Single Post

**Request:**
```bash
curl -X GET http://localhost:3000/posts/1
```

### Get User's Posts

**Request:**
```bash
curl -X GET http://localhost:3000/posts/user/1
```

### Update a Post

**Request:**
```bash
curl -X PUT http://localhost:3000/posts/1/user/1 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Just finished implementing a new authentication system using Nest.js and Prisma! The modularity and type safety are absolutely fantastic. 🚀 #WebDev #NestJS"
  }'
```

**Expected Response (200):**
```json
{
  "id": 1,
  "content": "Just finished implementing a new authentication system using Nest.js and Prisma! The modularity and type safety are absolutely fantastic. 🚀 #WebDev #NestJS",
  "authorId": 1,
  "createdAt": "2026-01-12T17:10:00.000Z",
  "updatedAt": "2026-01-12T17:20:00.000Z",
  "author": {
    "id": 1,
    "email": "alice@example.com",
    "profile": {
      "name": "Alice Johnson-Smith",
      "avatar": "https://example.com/avatars/alice.jpg"
    }
  }
}
```

### Delete a Post

**Request:**
```bash
curl -X DELETE http://localhost:3000/posts/2/user/1
```

**Expected Response (200):**
```json
{
  "message": "Post deleted successfully"
}
```

## 4. Multi-User Scenario

### Register Second User

**Request:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "bob@example.com",
    "password": "bobPassword456",
    "name": "Bob Smith",
    "bio": "Backend engineer specializing in microservices"
  }'
```

### Bob Creates a Post

**Request:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Exploring the world of distributed systems. Fascinating stuff!",
    "authorId": 2
  }'
```

### Alice Tries to Update Bob's Post (Should Fail)

**Request:**
```bash
curl -X PUT http://localhost:3000/posts/3/user/1 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Trying to modify someone elses post"
  }'
```

**Expected Response (403 Forbidden):**
```json
{
  "statusCode": 403,
  "message": "You can only update your own posts",
  "error": "Forbidden"
}
```

## 5. Error Scenarios

### Register with Existing Email

**Request:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "anotherPassword",
    "name": "Another Alice"
  }'
```

**Expected Response (409 Conflict):**
```json
{
  "statusCode": 409,
  "message": "Email already registered",
  "error": "Conflict"
}
```

### Login with Wrong Password

**Request:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "wrongPassword"
  }'
```

**Expected Response (401 Unauthorized):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### Get Non-Existent Post

**Request:**
```bash
curl -X GET http://localhost:3000/posts/999
```

**Expected Response (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Post not found",
  "error": "Not Found"
}
```

## 6. Cleanup Operations

### Delete User Profile (and all associated data)

**Request:**
```bash
curl -X DELETE http://localhost:3000/profiles/1
```

**Expected Response (200):**
```json
{
  "message": "Profile and user deleted successfully"
}
```

**Note:** This will delete:
- The User account
- The associated Profile
- All Posts created by the user

## Testing Flow

1. **Register 2-3 users**
2. **Login with each user** to verify authentication
3. **Update profiles** with additional information
4. **Create multiple posts** for each user
5. **Test read operations** (get all posts, get user's posts, get single post)
6. **Test update operations** (update own posts)
7. **Test authorization** (try to update/delete other users' posts - should fail)
8. **Test delete operations** (delete posts, delete profiles)
9. **Test error scenarios** (duplicate email, wrong password, non-existent resources)

## Postman Collection

If you're using Postman, you can create a collection with these requests. Make sure to:
1. Set the base URL as a variable: `{{baseUrl}}` = `http://localhost:3000`
2. Store user IDs as variables after registration for easier testing
3. Use environments to switch between different users

## Testing Tips

- Start with a fresh database for consistent results
- Use Prisma Studio (`npm run prisma:studio`) to view database state
- Test authorization by creating multiple users and attempting cross-user operations
- Verify cascade deletes by checking related records after deletion
- Test with various input data to ensure validation works correctly
