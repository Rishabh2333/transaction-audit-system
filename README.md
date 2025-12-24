📹 Project Demo Video (Unlisted)

▶️ (Add your YouTube unlisted demo link here)

🌐 Live Project (Optional)

🔗 (If deployed, add link here)

📌 Project Overview

This project is an implementation of Assignment 2 – Real-time Transaction & Audit Log System.

The application enables secure peer-to-peer fund transfers between users with strict transactional integrity. All balance updates and audit log entries are executed atomically using Prisma ORM transactions, ensuring that either all operations succeed or none are applied.

User authentication is handled via JWT-based stateless authentication, and all transaction-related endpoints are protected. Every successful fund transfer generates an immutable audit log, providing traceability and accountability.

The system follows a clean backend-first architecture with an optional lightweight frontend to demonstrate real-world usability. AI-assisted development was used responsibly as permitted by the submission guidelines.

🛠️ Technology Stack
Backend

Node.js

Express.js

Prisma ORM

SQLite

JWT (JSON Web Tokens)

Frontend (Optional)

React.js

Vite

Axios

AI Tools

ChatGPT (for guided development and debugging)

⚙️ Setup and Run Instructions
Prerequisites

Node.js (v18 or above)

npm

Git

📥 Clone the Repository
git clone <your-repository-url>
cd transaction-audit-system

🔧 Backend Setup
cd backend
npm install


Create a .env file inside the backend directory:

PORT=5000
JWT_SECRET=supersecretkey


Initialize the database and Prisma client:

npx prisma migrate dev
npx prisma generate


Start the backend server:

npm run dev


Backend will run at:

http://localhost:5000

🎨 Frontend Setup (Optional)
cd frontend
npm install
npm run dev


Frontend will run at:

http://localhost:5173

📡 API Documentation
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	User login (JWT)
Transactions
Method	Endpoint	Description
POST	/api/transactions/transfer	Atomic fund transfer
GET	/api/transactions/history	Fetch user transaction audit history
🗄️ Database Schema (Prisma Models)
User

id

name

email (unique)

password (hashed)

balance

createdAt

Transaction

id

senderId

receiverId

amount

createdAt

AuditLog

id

transactionId (unique)

senderId

receiverId

amount

status

createdAt

📁 Backend Folder Structure
backend/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── transactionController.js
│   │   └── historyController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── historyRoutes.js
│   │
│   ├── prismaClient.js
│   └── index.js
│
├── .env
└── package.json

📁 Frontend Folder Structure (Optional)
frontend/
│
├── src/
│   ├── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
└── package.json

🔐 Security Highlights

JWT-based stateless authentication

Protected transaction routes

Prisma $transaction() for atomic operations

Immutable audit logs

Server-side validation for all transfers

⚙️ Atomic Transaction Design

All fund transfers are executed inside a single Prisma transaction to guarantee:

Sender balance deduction

Receiver balance credit

Transaction record creation

Audit log insertion

If any step fails, the entire operation is rolled back, ensuring data consistency.

🤖 AI-Assisted Development

AI tools were used to:

Assist in designing Prisma schema relationships

Guide implementation of atomic transaction logic

Debug Prisma & JWT integration issues

Help structure backend controllers and routes

Assist in preparing this README documentation

All logic was reviewed, tested, and validated manually.

👤 Author

Rishabh Mishra
B.Tech Student
VJTI
