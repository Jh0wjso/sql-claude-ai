# SQL Claude AI

A Nest.js application with Prisma ORM and SQLite database.

## Description

This project is built with:
- [Nest.js](https://nestjs.com/) - A progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [SQLite](https://www.sqlite.org/) - Self-contained SQL database engine

## Installation

```bash
$ npm install
```

## Database Setup

```bash
# Generate Prisma Client
$ npm run prisma:generate

# Run migrations
$ npm run prisma:migrate

# Open Prisma Studio (Database GUI)
$ npm run prisma:studio
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Project Structure

```
src/
├── prisma/
│   ├── prisma.module.ts    # Prisma module configuration
│   └── prisma.service.ts   # Prisma service for database operations
├── app.controller.ts       # Application controller
├── app.module.ts           # Root module
├── app.service.ts          # Application service
└── main.ts                 # Application entry point

prisma/
└── schema.prisma           # Database schema definition
```

## Prisma Commands

```bash
# Generate Prisma Client after schema changes
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Open Prisma Studio (GUI for your database)
npm run prisma:studio
```

## Environment Variables

The `.env` file contains:
```
DATABASE_URL="file:./dev.db"
```

## License

This project is [UNLICENSED](LICENSE).
