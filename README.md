# inventory-system

repliet hosting link :- https://replit.com/@122101028/inventory-system

How to Run
On Replit:

Visit the live link above
Click "Run" button
Use the webview interface

Locally:


git clone https://github.com/PuneethPavuluri/inventory-system.git  
cd inventory-system  
npm install  
npm start  

{Setup & Run
1. Clone the Repository
git clone https://github.com/PuneethPavuluri/inventory-system.git
cd inventory-system
2. Install Dependencies
npm install  # For Node.js backend
3. Run the Application
npm start  # Starts the backend server
Open index.html in a browser (or use Live Server in VS Code).}


 Mini Inventory Management System
 
 Features
 
Product Management:-

Add new products (name, SKU, category, initial stock)
Update stock (increase/decrease quantity)
View all products with current stock

Transaction Tracking :-

Record IN/OUT transactions for products
View transaction history per product



Project- code stucture
inventory-system/
├── data/
│   └── db.js          # In-memory database setup
├── public/
│   ├── index.html     # Main interface
│   ├── styles.css     # CSS styling
│   └── script.js      # Frontend logic
├── routes/
│   ├── products.js    # Product API routes
│   └── transactions.js # Transaction API routes
├── index.js          # Main Express server
└── package.json       # Dependencies
