# 📚 Stationery Shop - Express + MongoDB + TypeScript

Welcome to the **Stationery Shop**, a feature-rich platform designed for managing stationery products and customer orders with ease. Built using **TypeScript**, **Express.js**, and **MongoDB**, this application offers efficient tools for product management, order processing, and revenue tracking.


---

## 🌐 Live URL

[**Stationery Shop**](https://stationery-shop-blond.vercel.app)  
_Experience the application live._

---


## ✨ Features

- **Stationery Products Management:**
  - Create, Read, Update, and Delete products.
  - Product information includes name, brand, price, category, description, quantity, and in-stock status.
  - Product categories include Writing, Office Supplies, Art Supplies, Educational, and Technology.

- **Order Management:**
  - Customers can place orders for products.
  - Automatically reduces the quantity of products in stock.
  - Updates in-stock status when the quantity reaches zero.

- **Revenue Calculation:**
  - Aggregate total revenue from all orders using MongoDB aggregation.

## 🛠 Technologies Used

- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **TypeScript** - Strongly typed superset of JavaScript
- **Node.js** - JavaScript runtime for server-side applications

---

 ## 📂 Folder Structure: ##

```

stationery-shop/
│
├── 📁dist/                                         # Contains route handlers for each resource (compiled JavaScript files)
│   ├── 📁config                                    # Configuration files
|   |   └── index.js
│   ├── 📁module                                    # Contains modules for each feature (orders, products)
|   |   ├── 📁orders
│   |   |   ├── order.controller.js                 # Controller for handling order operations
│   |   |   ├── order.interface.js                  # Type definitions for order
│   |   |   ├── order.model.js                      # Mongoose model for orders
│   |   |   ├── order.route.js                      # Routes for orders API
│   |   |   └── order.service.js                    # Business logic for orders
|   |   |   
|   |   └── 📁stationery-products    
│   |   |   ├── stationeryProduct.controller.js     # Controller for handling product operations
│   |   |   ├── stationeryProduct.interface.js      # Type definitions for products
│   |   |   ├── stationeryProduct.model.js          # Mongoose model for products
│   |   |   ├── stationeryProduct.route.js          # Routes for product API
│   |   |   └── stationeryProduct.service.js        # Business logic for products
|   |   |   
|   ├── app.js                                      # Main application file that sets up the Express app
|   └── server.js                                   # The entry point for starting the server
│
├── 📁node-modules/                                 # Contains Mongoose models for products and orders
│   ├── productModel.ts
│   └── orderModel.ts
│
├── 📁src/                                          # Contains API routes for products and orders
│   ├── 📁config                                    # Contains source files (TypeScript files)
|   |   └── index.ts                                # Configuration files
│   ├── 📁module                                   # Contains modules for each feature (orders, products)
|   |   ├── 📁orders
|   |   |   ├── order.controller.ts                 # Controller for handling order operations
|   |   |   ├── order.interface.ts                  # Type definitions for order
|   |   |   ├── order.model.ts                      # Mongoose model for orders
|   |   |   ├── order.route.ts                      # Routes for orders API
|   |   |   └── order.service.ts                    # Business logic for orders
|   |   |   
|   |   └── 📁stationery-products    
|   |   |   ├── stationeryProduct.controller.ts     # Controller for handling product operations
|   |   |   ├── stationeryProduct.interface.ts      # Type definitions for products
|   |   |   ├── stationeryProduct.model.ts          # Mongoose model for products
|   |   |   ├── stationeryProduct.route.ts          # Routes for product API
|   |   |   └── stationeryProduct.service.ts        # Business logic for products
|   |   |   
|   ├── app.ts                                      # Main application file that sets up the Express app
|   └── server.ts                                   # The entry point for starting the server
│
├── .env                                            # Environment variables (e.g., MongoDB URI)
├── .gitignore                                      # Files and folders to be ignored by Git
├── .prettierrc                                     # Prettier configuration for code formatting
├── eslint.config.mjs                               # ESLint configuration for code linting
├── package-lock.json                               # Automatically generated file for project dependencies
├── package.json                                    # Project metadata and dependencies
├── README.md                                       # Project documentation
└── tsconfig.json                                   # TypeScript configuration

```


---

## 🚀 Project Setup Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (LTS version)
- **MongoDB** (Running locally or using MongoDB Atlas for cloud)

### Steps to Set Up Locally

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Badhon-Roy/Stationery-Shop
    cd Stationery-Shop
    ```
2. **Install Dependencies:**

   ```bash
   npm install
    ```
3. **Set Up MongoDB:**
- If you're using a local MongoDB instance, make sure MongoDB is running.
- If you're using MongoDB Atlas, create a cluster and get the connection string.
- Update your `.env` file with the MongoDB connection string:
   ```bash
    MONGO_URI=your-mongodb-connection-uri
    PORT=5000
    ```
4. **Run the Application:**

   ```bash
   npm run dev
    ```
---

## 🧩 API Endpoints: ##
 **Products**
- GET `/api/products` - Retrieve all products.
- POST `/api/products` - Add a new product.
- PUT `/api/products/:id` - Update a product by ID.
- DELETE `/api/products/:id` - Delete a product by ID.

 **Orders**
- GET `/api/orders` - Retrieve all orders.
- POST `/api/orders` - Place a new order.
- GET `/api/revenue` - Calculate total revenue.


