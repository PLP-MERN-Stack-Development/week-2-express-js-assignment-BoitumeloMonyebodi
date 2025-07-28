# Express.js Products API – Week 2 Assignment

## Overview
This RESTful API manages products with full CRUD operations, filtering, searching, pagination, authentication, and error handling built using Express.js.

---

## Setup Instructions

1. Clone the repo and install dependencies:
`bash
npm install

Create a .env file based on .env.example:
PORT=3000 API_KEY=your-secret-api-key 

Start the server:
bash
node server.js 
Server will run on http://localhost:3000

Project Structure 
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validateProduct.js
├── models/
│   └── productModel.js
├── routes/
│   └── productRoutes.js
├── utils/
│   └── errors.js
├── .env.example
├── server.js
├── package.json
├── README.md

Tools & Libraries
Express.js
uuid
body-parser
dotenv


Author
Boitumelo Monyebodi
PLP – MERN Stack Development

How to test
Use Postman, Insomnia, or curl. Example curl command:
bash
curl -H "x-api-key: your-secret-api-key" http://localhost:3000/api/products