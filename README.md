![enter image description here](https://www.shutterstock.com/image-vector/currency-exchange-money-conversion-euro-600nw-2169800853.jpg)

## Currency Convertor App

\*\*The currency converter app performs two main functions: currency conversion and transfer records management. It allows users to convert the value of one currency into another using up-to-date exchange rates, featuring a user-friendly interface for selecting currencies and entering amounts. Additionally, the app records details of currency transfers and provides the option to delete these transfer records as needed.

## Technologies Used💻

- Frontend: Next.js
- Backend: Node.js
- Database: MongoDB

## Prerequisites⚡

Node.js installed on your machine
MongoDB instance running (local or cloud-based)
Visual Studio Code (VS Code) installed

## Getting Started🐱‍🏍

- Clone the repository:

  > git clone https://github.com/Hirushi-Sandarashmi/Currency-Convertor-App.git
  > cd currency-converter-app

- Install dependencies for the frontend:

  cd frontend
  yarn

- Install dependencies for the backend:

  cd backend
  yarn

## Configuration✨

- **Set up environment variables:**
  Rename the envTemplate into `.env` file in the project root and change the following:

      For Back-End

  MONGO_URI=your-mongodb-uri
  PORT=your-port
  API_KEY=your-currency-api-key

      For Front-End

      JWT_SECRET=anything

  AUTH_SECRET=auth secret
  API_URL=your api url
  CURRENCY_API_KEY=currency api key

## Running the Project✔

- Back-End

  node .
  node index.js

- Front-End

  yarn run dev

## Demo

[https://drive.google.com/file/d/1rOaKg8tCkEFmkTvD7f7qa_IdVOwt26OF/view?usp=sharing](https://drive.google.com/file/d/1rOaKg8tCkEFmkTvD7f7qa_IdVOwt26OF/view?usp=sharing)

## Project Structure

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
