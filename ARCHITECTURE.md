# System Architecture & CRUD Operations

## 📋 Overview

This document describes the basic system structure and CRUD operations for the LinkedIn-inspired social network application.

## 🏗 System Architecture

### Three-Layer Architecture

```
┌─────────────────────────────────────────┐
│          Controller Layer               │
│  (HTTP Request Handling & Routing)      │
│                                         │
│  - AuthController                       │
│  - ProfileController                    │
│  - PostsController                      │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│          Service Layer                   │
│  (Business Logic & Validation)          │
│                                         │
│  - AuthService                          │
│  - ProfileService                       │
│  - PostsService                         │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│          Data Layer                      │
│  (Database Access via Prisma)           │
│                                         │
│  - PrismaService                        │
│  - SQLite Database                      │
└─────────────────────────────────────────┘
```

## 🔄 Data Flow

1. **Client Request** → Controller receives HTTP request
2. **Validation** → DTO validates request data
3. **Business Logic** → Service processes the request
4. **Database Operation** → Prisma executes SQL queries
5. **Response** → Data flows back through layers to client

## 📊 Entity Relationships

```
User (1) ──────────── (1) Profile
 │
 │
 └─── (1) ──────────── (Many) Posts
```

### Relationship Details

- **User ↔ Profile**: One-to-One
  - Each User has exactly one Profile
  - Profile is automatically created on User registration
  - Deleting User cascades to delete Profile

- **User ↔ Posts**: One-to-Many
  - Each User can have multiple Posts
  - Each Post belongs to one User (author)
  - Deleting User cascades to delete all their Posts

## 🔐 Entity: User (Authentication)

### Purpose
Handles user authentication with email and password.

### CRUD Operations

#### CREATE - Register User
- **Endpoint**: `POST /auth/register`
- **Input**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "User Name",
    "bio": "Optional bio"
  }
  ```
- **Process**:
  1. Check if email already exists
  2. Hash password using bcrypt (10 salt rounds)
  3. Create User record in database
  4. Automatically create associated Profile
  5. Return User with Profile (password excluded)
- **Output**: User object with embedded Profile

#### READ - Login User
- **Endpoint**: `POST /auth/login`
- **Input**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Process**:
  1. Find User by email
  2. Compare provided password with hashed password
  3. If valid, return User with Profile
  4. If invalid, throw UnauthorizedException
- **Output**: User object with Profile and success message

### Security Features
- Passwords are never stored in plain text
- Passwords are never returned in API responses
- bcrypt provides secure one-way hashing
- Email uniqueness is enforced at database level

## 👤 Entity: Profile

### Purpose
Stores user profile information associated with their account.

### CRUD Operations

#### CREATE
- **Method**: Automatic
- **Trigger**: Created automatically during user registration
- **Default Values**: 
  - `name` from registration
  - `bio` from registration (optional)
  - Other fields set to null

#### READ - Get Profile
- **Endpoint**: `GET /profiles/:userId`
- **Process**:
  1. Find Profile by userId
  2. Include associated User data
  3. Throw NotFoundException if not found
- **Output**: Profile with User information

#### UPDATE - Update Profile
- **Endpoint**: `PUT /profiles/:userId`
- **Input**:
  ```json
  {
    "name": "Updated Name",
    "bio": "Updated bio",
    "avatar": "https://example.com/avatar.jpg",
    "location": "City, Country",
    "website": "https://website.com"
  }
  ```
- **Process**:
  1. Verify Profile exists
  2. Update only provided fields
  3. Return updated Profile with User data
- **Output**: Updated Profile object

#### DELETE - Delete Profile
- **Endpoint**: `DELETE /profiles/:userId`
- **Process**:
  1. Verify Profile exists
  2. Delete User (Profile deletion cascades automatically)
  3. All Posts are also deleted (cascade)
- **Output**: Success message

### Fields
- **Required**: `name`
- **Optional**: `bio`, `avatar`, `location`, `website`
- **Automatic**: `userId`, `createdAt`, `updatedAt`

## 📝 Entity: Post

### Purpose
Enables users to create and manage text-only posts.

### CRUD Operations

#### CREATE - Create Post
- **Endpoint**: `POST /posts`
- **Input**:
  ```json
  {
    "content": "Post content here",
    "authorId": 1
  }
  ```
- **Process**:
  1. Verify User (author) exists
  2. Create Post with content and authorId
  3. Return Post with author's Profile information
- **Output**: Post object with author details

#### READ Operations

##### Get All Posts
- **Endpoint**: `GET /posts`
- **Process**:
  1. Fetch all Posts from database
  2. Include author Profile information
  3. Order by creation date (newest first)
- **Output**: Array of Post objects

##### Get Single Post
- **Endpoint**: `GET /posts/:id`
- **Process**:
  1. Find Post by ID
  2. Include author Profile information
  3. Throw NotFoundException if not found
- **Output**: Single Post object

##### Get User's Posts
- **Endpoint**: `GET /posts/user/:userId`
- **Process**:
  1. Find all Posts by authorId
  2. Include author Profile information
  3. Order by creation date (newest first)
- **Output**: Array of Post objects by specific user

#### UPDATE - Update Post
- **Endpoint**: `PUT /posts/:id/user/:userId`
- **Input**:
  ```json
  {
    "content": "Updated content"
  }
  ```
- **Process**:
  1. Find Post by ID
  2. Verify Post belongs to User (authorId === userId)
  3. Update Post content
  4. Throw ForbiddenException if not owner
- **Output**: Updated Post object
- **Authorization**: User can only update their own posts

#### DELETE - Delete Post
- **Endpoint**: `DELETE /posts/:id/user/:userId`
- **Process**:
  1. Find Post by ID
  2. Verify Post belongs to User (authorId === userId)
  3. Delete Post from database
  4. Throw ForbiddenException if not owner
- **Output**: Success message
- **Authorization**: User can only delete their own posts

### Authorization Logic
```typescript
// Ownership Verification
if (post.authorId !== userId) {
  throw new ForbiddenException('You can only modify your own posts');
}
```

## 🔒 Security & Authorization

### Authentication
- Password hashing with bcrypt
- No password storage in plain text
- Email uniqueness constraint

### Authorization Rules
1. **Posts**: Users can only UPDATE or DELETE their own posts
2. **Profile**: Users should only modify their own profile (controlled by userId parameter)
3. **Cascade Deletion**: Deleting a User removes Profile and all Posts

### Error Handling
- `NotFoundException`: Resource doesn't exist
- `ConflictException`: Email already registered
- `UnauthorizedException`: Invalid login credentials
- `ForbiddenException`: Attempting to modify others' content

## 📈 Data Access Patterns

### Eager Loading
All queries include related data to minimize database roundtrips:
- User queries include Profile
- Post queries include author's User and Profile

### Ordering
- Posts are ordered by `createdAt DESC` (newest first)

### Soft vs Hard Delete
- Currently implements **hard delete**
- All deletions are permanent
- Cascade rules ensure data consistency

## 🔄 Transaction Handling

### User Registration
Uses Prisma transaction to ensure atomicity:
```typescript
const user = await this.prisma.user.create({
  data: {
    email,
    password: hashedPassword,
    profile: {
      create: {
        name,
        bio,
      },
    },
  },
});
```
- If Profile creation fails, User creation is rolled back
- Ensures data consistency

## 📝 Summary

This application provides a complete CRUD system for a basic social network with:

- ✅ User registration and authentication
- ✅ Automatic profile creation
- ✅ Full profile management
- ✅ Complete post CRUD operations
- ✅ Ownership verification and authorization
- ✅ Relational data integrity
- ✅ Error handling and validation

The architecture is modular, scalable, and follows NestJS best practices with clear separation of concerns between controllers, services, and data access layers.
