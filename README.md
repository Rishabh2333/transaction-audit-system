# 💸 Transaction Audit System

## 📹 Project Demo Video (Unlisted)
▶️ (https://drive.google.com/file/d/1rliA3dyiV6SV3OHMiWnpxzVJnapmj6li/view?usp=drive_link)

▶️ https://drive.google.com/file/d/1Cu8C_mPLO8rUP6qq69cg7FWXTPKfK7bs/view?usp=drive_link

## 🌐 Project Overview

The Transaction Audit System is a full-stack application designed to provide secure user authentication, atomic peer-to-peer fund transfers, and immutable transaction audit logging.

The application demonstrates data consistency and reliability using database-level transactions. User authentication is implemented using JWT-based stateless authentication, and all fund transfers are executed atomically using Prisma transactions, ensuring that either all changes succeed or none are applied.

Each transaction is persistently recorded in an audit log, enabling traceability, accountability, and transaction history tracking.

## 🛠 Technology Stack

### Backend
- Node.js
- Express.js
- Prisma ORM (v7)
- SQLite
- JWT (JSON Web Tokens)
- bcrypt

### Frontend
- React.js (Vite)
- Fetch API
- CSS

### AI Tools
- ChatGPT (used for guidance and structuring)

## ⚙️ Setup and Run Instructions

### Prerequisites
- Node.js (v18 or above)
- npm
- Git

### 📥 Clone the Repository

```bash
git clone https://github.com/Rishabh2333/transaction-audit-system.git
cd transaction-audit-system


### 🔧 Backend Setup

```bash
cd backend
npm install


Create a .env file inside the backend directory:

PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=file:./dev.db


Generate the Prisma client and start the backend server:

npx prisma generate
npm run dev


Backend runs at:

http://localhost:5000

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev



Frontend will run at:

http://localhost:5173

## 📡 API Documentation

### Authentication

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| POST   | /api/auth/register  | Register a new user             |
| POST   | /api/auth/login     | User login (JWT issued)         |
| GET    | /api/auth/me        | Fetch authenticated user data  |

### Transactions

| Method | Endpoint                        | Description                  |
| ------ | ------------------------------- | ---------------------------- |
| POST   | /api/transactions/transfer      | Atomic fund transfer         |
| GET    | /api/transactions/history       | User transaction history     |

## 🗄 Database Schema (Prisma)

### User Model
- id
- name
- email (unique)
- password (hashed)
- balance
- createdAt

### Transaction Model
- id
- senderId
- receiverId
- amount
- createdAt

### AuditLog Model
- id
- transactionId
- senderId
- receiverId
- amount
- status
- timestamp


## 📁 Backend Folder Structure

```text
backend/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── transactionController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   │
│   ├── prismaClient.js
│   └── index.js
│
├── .env
└── package.json

## 📁 Frontend Folder Structure

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
└── package.json


## 🔐 Security Highlights

- JWT-based stateless authentication
- Password hashing using bcrypt
- Protected API routes using authentication middleware
- Atomic database transactions using Prisma
- Immutable transaction audit logs for traceability


##⚙️ Atomic Transaction Design

-All fund transfers are executed inside a single Prisma transaction to guarantee:
-Sender balance deduction
-Receiver balance credit
-Transaction record creation
-Audit log insertion
-If any step fails, the entire operation is rolled back, ensuring data consistency.

## 🤖 AI-Assisted Development

- Assisted in backend architecture planning
- Helped design Prisma schema and model relations
- Guided implementation of atomic fund transfers using Prisma transactions
- Assisted with JWT authentication and authorization flow
- Helped structure frontend-backend integration
- Assisted in structuring and documenting this README.md


👤 Author

Rishabh Mishra
B.Tech Student
VJTI
