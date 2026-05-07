E-Commerce Backend API

A complete backend project for an E-Commerce application built using Node.js, Express.js, MongoDB, and JWT Authentication.
This project follows the MVC architecture and includes authentication, role-based access control, category management, product management, and user-specific product handling.
```
Features
User Registration & Login
JWT Authentication
Cookie-based Authentication
Role-Based Access Control (Admin/User)
Password Hashing using bcrypt
Product CRUD Operations
Category CRUD Operations
User-specific Products
Protected Routes using Middleware
MongoDB Database Integration
MVC Architecture
REST API Development
Error Handling Middleware


Tech Stack
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
cookie-parser
dotenv
nodemon


Project Structure
E-commerce-backend-practical/
│
├── config/
├── controller/
├── middleware/
├── model/
├── routes/
├── utils/
├── .env
├── server.js
├── package.json
└── README.md

Installation

Clone the repository:

git clone https://github.com/vaishali2801/E-commerce-backend-practical.git

Move to the project folder:

cd E-commerce-backend-practical


Install dependencies:

npm install
Environment Variables

Create a .env file in the root directory and add:

PORT=5000
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
Run Project

Start development server:

npm run dev

Start production server:

npm start
API Endpoints
Authentication Routes

Method	Endpoint	Description
POST	/register	Register User
POST	/login	Login User
POST	/logout	Logout User

Product Routes
Method	Endpoint	Description

GET	/products	Get All Products
GET	/product/:id	Get Single Product
POST	/product/create	Create Product
PUT	/product/update/:id	Update Product
DELETE	/product/delete/:id	Delete Product

Category Routes
Method	Endpoint	Description

GET	/categories	Get All Categories
POST	/category/create	Create Category
PUT	/category/update/:id	Update Category
DELETE	/category/delete/:id	Delete Category

Authentication Flow
User registers account
Password gets hashed using bcrypt
User logs in
JWT token is generated
Token stored in cookies
Middleware verifies token for protected routes

Roles
Admin

Manage Products
Manage Categories
Access Protected Routes

User
View Products
Access Own Products

Middleware
Authentication Middleware
Role Authorization Middleware
Error Handling Middleware

Database Models
User Model
name
email
password
role
phone
city
address

Product Model
title
description
price
image
category
owner

Category Model
name
description

```

Author
Chauhan Vaishali
GitHub: vaishali2801
LinkedIn: Vaishali Chauhan
