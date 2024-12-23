# GTS TEST

## Description

Make a solution in Node + React (webpage) that solves the following problem.
A company sells hundreds of products on-line and customer place orders from all over the world,
just like eBay. Each product has a different weight and price. Every customer can order any number
of different products that need to be separated into one or more packages (each containing one or
more products) and then collected by the courier company for delivery to the customer.
There are certain rules for each package that must be followed:

1. The total cost of all products within a single package cannot exceed $250 for international
   customs purposes.
2. If multiple packages for the same order are required, then the weight of each package should
   have the lowest possible shipping cost for the order and be as evenly distributed as possible.
   Create a page which has the following:
   • A simple vertical list of products (in the format Name - price - weight), with a check box next to
   items
   • A button saying "Place order"
   • When the user clicks on "Place order", the selected items should be submitted to the same page
   and the above rules should be applied to potentially divide this order into multiple packages
   • Display the output result on the same page. Below is a sample output on how it should look like:
   This order has following packages:

   Package 1  
   Items - Item 1, Item 3, item 7  
   Total weight - 510g  
   Total price - $240  
   Courier price - $15

   Package 2  
   Items - Item 4, Item 6, item 2  
   Total weight - 530g  
   Total price - $160
   Courier price - $15

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for both backend and frontend)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (for frontend package management)

---

## Backend Setup (Node.js)

## 1. **Clone the repository:**

   git clone https://github.com/KashminShrestha/GTS_node_react.git
   cd GTS_node_react

## 2. **Navigate to the backend folder:**
   cd backend

## 3. **Install backend dependencies:**
    npm install

## 4. **Start the Server:**
    node server.js

    This will start the Node.js backend server.It will run on http://localhost:3001.

## Frontend Setup (React)
    cd frontend

## 1. **Install frontend dependencies:**
    npm install

## 2. **Start the Application:**
    npm run dev

    This will start the React development server.It will run on http://localhost:3000.


** If you are stuck while installation or have any error take Reference of ChatGPT or Claude or gemini for installation ** 
