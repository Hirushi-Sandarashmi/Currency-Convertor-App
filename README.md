\***\*\*\*\*\*\*\***\*\*\***\*\*\*\*\*\*\***Currency Converter App**\*\***\*\*\*\***\*\***\*\*\*\***\*\***\*\*\*\***\*\***\***\*\***\*\*\*\***\*\***\*\*\*\***\*\***\*\*\*\***\*\***
**\***Technologies Used**\*\*\***
Frontend: Next.js
Backend: Node.js
Database: MongoDB

\***\*Project Structure**\*\*\*\*\*

/project-root
├── /frontend # Frontend files (Next.js)
│ ├── /pages # Next.js pages
│ ├── /components # Reusable components
│ ├── /public # Static files
│ ├── /styles # CSS/SCSS files
│ └── /utils # Utility functions
├── /backend # Backend files (Node.js)
│ ├── /controllers # Controllers
│ ├── /models # Database models (Mongoose)
│ ├── /routes # API routes
│ ├── /config # Configuration files (e.g., environment variables)
│ ├── /middleware # Middleware functions
│ └── server.js # Entry point for the server
├── /db # Database configuration
│ └── connect.js # MongoDB connection setup
├── .env # Environment variables
├── package.json # Project dependencies
└── README.md # Project documentation

**\*\***Step-by-Step Run Instructions**\***

\*Step-by-Step Run Instructions
-Prerequisites
Node.js installed on your machine
MongoDB instance running (local or cloud-based)
Visual Studio Code (VS Code) installed

\*Installation

\*Install dependencies for the frontend:

If you don't have yarn installed, you can install it
-yarn
Optionally, delete package-lock.json if you want to:
-rm package-lock.json

Configuration
Set up environment variables:
Create a .env file in the project root and add the following:

for back end :env-
MONGO_URI=your-mongodb-uri
PORT=your-port
API_KEY=your-currency-api-key-

ex: JWT_SECRET="Hirushi"
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/CurrencyApi
CURRENCY_API_KEY="1a54e5687eb89f5aa508cc2c"

for front end: env
ex:AUTH_SECRET="1dlbQXnjV8itpI7qXewHiXOBAsT2fs4e5LudLZVqV4I="
API_URL="http://127.0.0.1:3001/api/"
CURRENCY_API_KEY="1a54e5687eb89f5aa508cc2c"

\*Running the Project
Start the MongoDB server:
Ensure your MongoDB server is running. If using a local instance, you can start it with:

---back-end---
code .
node index.js
---fron-end---
Start the frontend development server:
yarn run dev
Access the application:
Open your browser and go to http://localhost:3000

---

live demo:https://drive.google.com/file/d/1rOaKg8tCkEFmkTvD7f7qa_IdVOwt26OF/view?usp=sharing

---
