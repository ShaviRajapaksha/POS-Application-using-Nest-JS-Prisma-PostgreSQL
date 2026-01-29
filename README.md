
# POS Application using Nest.JS, Prisma & PostgreSQL

## Overview
A Point of Sale (POS) application built with modern backend technologies for efficient transaction management and inventory tracking.

## Tech Stack
- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Language**: TypeScript

## Features
- User authentication & authorization
- Product & inventory management
- Sales transaction processing
- Customer management
- Reporting & analytics

## Prerequisites
- Node.js (v14+)
- PostgreSQL
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/ShaviRajapaksha/POS-Application-using-Nest-JS-Prisma-PostgreSQL.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run migrations
npx prisma migrate dev

# Start the application
npm run start
```

## Project Structure
```
src/
├── modules/
├── prisma/
├── common/
└── main.ts
```

## Database Setup
```bash
npx prisma studio  # View & manage data
npx prisma migrate dev  # Run migrations
```

## Complete Architecture
<table>
 <tr>
 <td>
<img width="513" height="731" alt="Screenshot 2026-01-30 005304" src="https://github.com/user-attachments/assets/3d806dad-5d14-4c98-8ea5-f5ce6c905036" />
 </td>
  <td>
<img width="767" height="702" alt="Screenshot 2026-01-30 010527" src="https://github.com/user-attachments/assets/e5949b93-8804-4aa6-8aa8-656f7a7352b4" />
 </td>
 </tr>
</table>



