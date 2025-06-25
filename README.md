 Express.js Product API
A robust RESTful API built with Express.js that allows you to manage products with full CRUD functionality, search, filtering, pagination, and category-based statistics. The project includes custom middleware for logging, authentication, input validation, and centralized error handling.

📦 Features
✅ Full CRUD operations for product management

✅ Search products by name

✅ Filter by category

✅ Pagination support

✅ Statistics: Count by category

✅ Middleware for:

Logging requests

API key-based authentication

Product validation

Error handling

📁 Project Structure
pgsql
Copy code
.
├── server.js
├── routes/
│   └── products.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validateProduct.js
├── models/
│   └── productData.js
├── utils/
│   └── errors.js
├── .env
├── package.json
└── README.md
⚙️ Setup Instructions
Clone the repository

bash
Copy code
git clone https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-BoitumeloMonyebodi.git
cd express-product-api
Install dependencies

bash
Copy code
npm install
Set up environment variables

Create a .env file:

ini
Copy code
PORT=3000
API_KEY=your_api_key_here
Start the server

bash
Copy code
node server.js
🔐 Authentication
All protected routes require an API key in the header:

makefile
Copy code
x-api-key: your_api_key_here
Requests without a valid key return a 401 Unauthorized error.

🧪 API Endpoints
Base URL: /api/products
Method	Endpoint	Description
GET	/	Get all products (supports ?category=, ?page=, ?limit=)
GET	/:id	Get product by ID
POST	/	Create a new product
PUT	/:id	Update an existing product
DELETE	/:id	Delete a product
GET	/search/:name	Search products by name
GET	/stats/count-by-category	Get product count by category

🧩 Middleware Overview
Middleware	Purpose
logger.js	Logs incoming requests with timestamps
auth.js	Validates API key
validateProduct.js	Ensures product data integrity
errorHandler.js	Handles all unhandled errors and formats responses

❗ Error Handling
Custom error classes:

js
Copy code
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
Example:
NotFoundError → 404

ValidationError → 400

Fallback errors default to 500 (Internal Server Error).

🧪 Sample In-Memory Database
The app uses an in-memory array (models/productData.js) as a mock database:

js
Copy code
const products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 1500,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Headphones',
    description: 'Noise-cancelling headphones',
    price: 200,
    category: 'electronics',
    inStock: true,
  }
];









