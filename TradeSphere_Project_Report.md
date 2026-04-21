# PROJECT REPORT

## Advanced Stock Trading and Portfolio Management Application

### TradeSphere Pro

**A Full-Stack Web Application for Stock Search, Portfolio Tracking, Profit and Loss Analysis, Transaction History, and Live Market Visualization**

---

**Submitted By:** `[Your Name Here]`  
**Student ID:** `[Your Student ID Here]`  
**Course / Department:** `[Your Department Here]`  
**Guide / Mentor:** `[Guide Name Here]`  
**College Name:** `[College Name Here]`  
**Date of Submission:** April 2026  

---

## How To Use This Report

This report is prepared for the project **TradeSphere Pro**, developed as a final year project based on the SRS and the implemented web application. It follows the structure of a professional academic project document. Replace the placeholder personal details with your own information and insert screenshots from your application where marked.

---

# 01 PROJECT OVERVIEW

## 1.1 Project Title and Objective

**Project Title:** Advanced Stock Trading and Portfolio Management Application  
**Application Name:** TradeSphere Pro

The main objective of this project is to build a modern web-based stock trading system that allows users to register, log in, search stocks, monitor market data, view stock charts, perform buy and sell operations, track their portfolio, analyze profit and loss, and manage their trading profile. The application is designed to simulate a real-world trading platform with an attractive dashboard, live-style market updates, company-wise stock analysis, and a MongoDB-backed backend.

This project focuses on combining frontend design, backend development, database integration, and portfolio analytics into a single full-stack solution suitable for academic demonstration as well as practical learning.

## 1.2 Problem Statement

Traditional academic stock trading projects are often limited to static pages and do not simulate the experience of a real trading application. Most simple systems do not provide:

- proper user registration and login
- meaningful portfolio management
- company-wise stock research
- graphical visualization of market movement
- buy and sell workflows that update database records
- realistic dashboard sections such as holdings, watchlist, stock history, and profile management

This project solves that problem by providing an interactive trading platform where users can experience a realistic stock dashboard, perform transactions, and analyze market and portfolio performance from a single interface.

## 1.3 Scope of the Project

The scope of this project includes:

- user registration and login
- stock market explorer
- live-style candlestick chart for selected stocks
- buy and sell stock operations
- transaction history management
- portfolio holdings and allocation
- profit and loss analysis
- company deep-dive research section
- user profile and trading preferences
- MongoDB-based storage for users, trades, and stocks
- cloud deployment readiness using Render and MongoDB Atlas

The current project simulates market movement rather than connecting to a real stock exchange API, which makes it suitable for demonstration and academic evaluation.

## 1.4 Tools and Technologies Used

| Tool / Technology | Version / Platform | Purpose in This Project |
|---|---|---|
| HTML5 | Frontend | Structure of web pages |
| CSS3 | Frontend | Styling, layout, and responsive design |
| JavaScript | Frontend | Dynamic UI, chart rendering, interactions |
| Node.js | Backend runtime | Server-side application execution |
| Express.js | Backend framework | API routes and web server |
| MongoDB | Database | Storing users, stock data, and trade records |
| Mongoose | ODM | Schema modeling and MongoDB interaction |
| Render | Deployment platform | Hosting the application online |
| MongoDB Atlas | Cloud database | Online database hosting |
| Git / GitHub | Version control | Source code management and deployment workflow |

---

# 02 SYSTEM ANALYSIS

## 2.1 Existing System

In many simple existing systems:

- stock pages are static
- login is not connected to a real database
- buy and sell buttons do not work properly
- charts are limited to simple line graphs
- there is no deep company analysis
- portfolio calculations are often missing or unrealistic

Such systems do not provide a practical trading experience.

## 2.2 Proposed System

The proposed system, **TradeSphere Pro**, is a complete web application that includes:

- user authentication using MongoDB
- stock search across multiple companies
- interactive market cards
- company-specific chart view
- working buy and sell operations
- stored transaction history
- automatic portfolio updates after each order
- detailed profit and loss analytics
- company research information such as sector, CEO, headquarters, market cap, P/E ratio, employees, and investment thesis

## 2.3 Feasibility Study

### Technical Feasibility

The project is technically feasible because it uses standard web technologies that are widely available and well supported. Node.js, Express, MongoDB, HTML, CSS, and JavaScript are suitable for building a scalable trading dashboard.

### Economic Feasibility

The development cost is low because open-source technologies and free-tier hosting services are used. MongoDB Atlas and Render provide accessible deployment options for student projects.

### Operational Feasibility

The system is user-friendly and can be operated easily through a browser. The dashboard is visually structured for easy access to trading and analysis features.

---

# 03 REQUIREMENTS SPECIFICATION

## 3.1 Functional Requirements

The application supports the following functional requirements:

1. User registration
2. User login
3. Stock search by company, symbol, or sector
4. Market explorer for multiple stock companies
5. Stock chart visualization
6. Buy stock functionality
7. Sell stock functionality
8. Portfolio holdings view
9. Transaction history display
10. Profit and loss calculation
11. Company deep-dive analysis
12. Profile management and user preferences

## 3.2 Non-Functional Requirements

- responsive design for browser use
- attractive and modern UI
- fast loading of dashboard sections
- maintainable code structure
- secure separation of configuration using environment variables
- scalable backend architecture

---

# 04 SYSTEM DESIGN

## 4.1 Architecture Overview

The system follows a client-server architecture:

1. The frontend is built using HTML, CSS, and JavaScript.
2. The backend is built using Node.js and Express.js.
3. MongoDB stores application data.
4. The frontend sends requests to backend APIs.
5. The backend performs logic, updates MongoDB, and returns JSON responses.

## 4.2 Main Modules

### 4.2.1 Authentication Module

- register new users
- log in existing users
- store user information in MongoDB

### 4.2.2 Market Explorer Module

- display multiple stock companies
- search by company, symbol, or sector
- allow selection of a company for detailed graph and analysis

### 4.2.3 Trading Module

- place buy orders
- place sell orders
- validate holdings and cash balance
- save transactions to the database

### 4.2.4 Portfolio Module

- show open holdings
- calculate invested value
- calculate current market value
- show unrealized profit and loss
- show realized profit and loss

### 4.2.5 Company Research Module

- display company description
- show headquarters, CEO, founding year, employees
- show market cap, P/E ratio, dividend yield
- display risk level and investment thesis

### 4.2.6 Profile Module

- show user account details
- update preferences such as risk profile and preferred market

## 4.3 Database Design

Three major collections are used in MongoDB:

### User Collection

Stores:

- name
- email
- password
- role
- location
- account ID
- strategy
- risk profile
- preferred market
- cash balance

### Stock Collection

Stores:

- symbol
- company name
- sector
- current price
- previous close
- price history

### Trade Collection

Stores:

- user email
- stock symbol
- company name
- trade type
- quantity
- price
- total
- status
- timestamps

---

# 05 IMPLEMENTATION DETAILS

## 5.1 Frontend Implementation

The frontend contains:

- login and register page
- dashboard sidebar
- watchlist
- market explorer cards
- quick order ticket
- candlestick chart
- transaction history section
- performance section
- profile section
- company deep-dive area

The UI is styled using custom CSS to create a professional trading-dashboard look with dark theme, colored stock badges, responsive panels, and visually rich cards.

## 5.2 Backend Implementation

The backend uses Express.js to implement APIs such as:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/dashboard`
- `GET /api/live/:symbol`
- `POST /api/trades`
- `PATCH /api/profile`

These routes handle authentication, dashboard loading, live stock updates, order placement, and profile updates.

## 5.3 Portfolio Logic

Portfolio calculations are based on transaction history. The backend computes:

- quantity of each stock held
- average buy price
- current market price
- market value
- unrealized profit/loss
- realized profit/loss
- total portfolio profit/loss

This makes the project more realistic than a static portfolio system.

## 5.4 Chart Implementation

The graph section uses custom JavaScript and SVG rendering to display a trading-style candlestick chart. Features include:

- stock-specific chart
- OHLC information
- price line marker
- timeframe controls
- stock selection from cards and lists
- chart updates when a user clicks any company stock

## 5.5 Deployment Readiness

The project is prepared for deployment using:

- `render.yaml` for Render configuration
- MongoDB Atlas connection string through environment variables
- `.env.example` for configuration guidance

---

# 06 KEY FEATURES OF THE FINAL APPLICATION

## 6.1 Login and Register Page

The application includes both login and registration forms. New users can create an account and immediately access the dashboard.

## 6.2 Multi-Company Stock Explorer

The system supports a large number of stock companies from both US and Indian markets such as Apple, Microsoft, Tesla, NVIDIA, Reliance, Alphabet, Amazon, Meta, Infosys, TCS, HDFC Bank, and others.

## 6.3 Interactive Buy and Sell System

Users can click Buy or Sell from the stock cards or quick ticket area. Orders are validated and stored in MongoDB.

## 6.4 Stock History

Every order is recorded with symbol, type, quantity, price, total, date, and status.

## 6.5 Profit and Loss Section

The system shows:

- total profit/loss
- realized profit/loss
- unrealized profit/loss
- cash balance

## 6.6 Portfolio Research

The portfolio section gives much deeper information than a normal student project by showing not only holdings but also company-level insights and fundamentals.

## 6.7 Company Deep Dive

When a user clicks any stock, the right-side section shows detailed company information and a short investment thesis.

---

# 07 TESTING

## 7.1 Test Cases

| Test Case | Input | Expected Result | Status |
|---|---|---|---|
| User Login | Valid email and password | User enters dashboard | Passed |
| User Registration | New user data | New account created in MongoDB | Passed |
| Stock Search | Company name or symbol | Matching stocks displayed | Passed |
| Buy Stock | Valid symbol and quantity | Trade stored and portfolio updated | Passed |
| Sell Stock | Valid symbol and quantity | Trade stored and holdings updated | Passed |
| Invalid Sell | Sell more than owned quantity | Error message shown | Passed |
| Profile Update | Change preferences | User preferences updated | Passed |
| Stock Selection | Click any company stock | Graph updates for selected stock | Passed |

## 7.2 Validation Performed

- JavaScript syntax validation
- Node server syntax validation
- route testing for authentication and trading
- frontend interaction testing
- deployment configuration preparation

---

# 08 RESULTS AND OUTPUT

The final output of the project is a full-stack trading dashboard capable of:

- authenticating users
- storing users and trades in MongoDB
- displaying multiple companies
- visualizing live-style stock charts
- supporting buy/sell operations
- calculating portfolio performance
- showing deep company information

The completed application is significantly more advanced than a basic final year project and better reflects real-world financial dashboard design.

**Insert Screenshots Here:**

1. Login page screenshot  
2. Register page screenshot  
3. Dashboard overview screenshot  
4. Market explorer screenshot  
5. Stock graph screenshot  
6. Transaction history screenshot  
7. Performance section screenshot  
8. Portfolio research and company deep-dive screenshot  

---

# 09 CHALLENGES FACED

During development, the following challenges were encountered:

- converting a simple static prototype into a real MongoDB-backed application
- building a realistic trading dashboard UI
- implementing buy and sell validation
- creating a stock-specific graph interaction model
- making the portfolio section more detailed and research-oriented
- preparing the app for online deployment using Render and MongoDB Atlas

These challenges were addressed through incremental backend development, frontend redesign, and careful database modeling.

---

# 10 FUTURE ENHANCEMENTS

The following improvements can be added in future versions:

- integration with real-time stock market APIs
- advanced candlestick analytics with volume bars
- admin dashboard
- watchlist alerts and notifications
- password encryption and JWT authentication
- order book and stop-loss features
- mobile app version
- AI-based stock recommendation engine

---

# 11 CONCLUSION

The **Advanced Stock Trading and Portfolio Management Application (TradeSphere Pro)** successfully demonstrates a complete full-stack web project with both academic and practical value. It integrates user management, stock exploration, portfolio tracking, profit and loss analytics, company research, and database-driven trading operations in one cohesive system.

The project meets the goals described in the SRS and presents a strong final year submission because it combines software engineering, database design, user experience, analytics, and deployment readiness in a realistic way.

---

# 12 REFERENCES

1. MongoDB Documentation  
2. Express.js Documentation  
3. Node.js Documentation  
4. Render Deployment Documentation  
5. HTML, CSS, and JavaScript official references  

---

# 13 LITERATURE SURVEY

## 13.1 Introduction to the Literature Survey

Before building the final system, it was important to understand how modern trading platforms, financial dashboards, and academic portfolio systems are usually designed. A literature survey helps identify existing solutions, recognize their strengths and weaknesses, and define the practical gap that the present project aims to address.

The stock trading domain includes several categories of systems:

- brokerage and real trading platforms
- stock visualization platforms
- investment analytics dashboards
- educational stock simulators
- simplified student database projects

Most real platforms such as Zerodha, Groww, Robinhood, TradingView, and Yahoo Finance provide deep stock charts, market data, watchlists, and portfolio insights. However, they are large production systems with enterprise-grade infrastructure and are difficult to reproduce in a student project.

At the same time, many academic stock projects are very limited. They often focus on:

- only login and registration
- very small data sets
- no proper portfolio calculations
- no realistic company information
- no advanced charting
- no cloud deployment preparation

This created an opportunity to design a project that balances academic feasibility and real-world relevance.

## 13.2 Review of Existing Online Trading Platforms

### TradingView

TradingView is one of the most popular charting platforms. It offers:

- advanced candlestick charts
- technical indicators
- multi-timeframe support
- watchlists
- company data and financial summaries

From a design perspective, TradingView demonstrates the importance of:

- clean graph visualization
- stock-specific switching
- dense but readable market information
- interaction-driven dashboard design

The present project borrowed inspiration from this type of chart layout by integrating a trading-style dark panel, candlestick-style display, and stock-specific graph updates.

### Robinhood and Groww

Platforms like Robinhood and Groww are known for beginner-friendly design. Their key strengths include:

- simple onboarding
- clear buy and sell flows
- portfolio summaries
- profit/loss visualization

These systems show that a good financial application should reduce friction for the user. As a result, this project was designed with:

- direct action buttons
- a quick order ticket
- guided profile settings
- simple navigation across modules

### Yahoo Finance and Moneycontrol

Yahoo Finance and Moneycontrol emphasize market information and company-specific data. They provide:

- company profiles
- sector information
- market cap
- stock statistics
- price movement tracking

These platforms influenced the company research portion of TradeSphere Pro. Instead of limiting the dashboard to prices and holdings only, the project includes a company deep-dive section with:

- description
- headquarters
- CEO
- employees
- market cap
- P/E ratio
- dividend yield
- investment thesis

## 13.3 Review of Academic Stock Market Projects

A review of common academic stock market projects shows that many of them suffer from the following limitations:

1. They use static HTML pages without actual CRUD functionality.
2. They do not calculate portfolio holdings using transaction history.
3. They use very few companies, which makes the dashboard unrealistic.
4. They ignore cloud deployment and production environment setup.
5. They treat the project as a simple database form rather than a user-facing financial application.

This project improves on those limitations by:

- integrating frontend and backend properly
- storing and updating trades in MongoDB
- calculating holdings dynamically
- providing deeper market and company information
- preparing the app for deployment on Render with MongoDB Atlas

## 13.4 Research Gap Identified

From the review, the following research gap was identified:

There is a lack of student-level projects that combine:

- modern UI design
- real trading workflow simulation
- MongoDB-based persistence
- multiple market companies
- deep company-level research
- chart-based interaction
- deployment readiness

Therefore, the current project was designed to serve as a bridge between a simple academic assignment and a realistic practical web application.

## 13.5 Contribution of the Present Work

The main contribution of this work is the development of a web-based stock trading application that:

- simulates a modern market dashboard
- supports user registration and login
- offers stock-by-stock chart switching
- executes buy and sell actions using backend validation
- calculates portfolio and P&L metrics dynamically
- presents deeper company analysis in the same system

This makes the project suitable for final year submission while still being close to a production-style application architecture.

---

# 14 DEVELOPMENT METHODOLOGY

## 14.1 Methodology Adopted

The project followed an **incremental and modular development methodology**. Instead of attempting to build the whole platform in one step, the system was divided into logical modules and implemented phase by phase.

The development process included:

1. Requirement understanding from the SRS document
2. Initial UI prototype creation
3. Backend API and database integration
4. Implementation of buy/sell logic
5. Expansion of stock data and portfolio analytics
6. Improvement of charts and company deep-dive details
7. Deployment preparation
8. Documentation and report generation

## 14.2 Requirement Analysis Phase

The first step was reading the SRS and identifying the primary requirements:

- login page
- stock history
- profit and loss
- graph for loss
- search options
- profile section
- real-world trading app appearance

These high-level requirements were converted into more detailed application tasks. For example:

- "login page" became user authentication with register and login support
- "graph" became a stock-specific candlestick chart
- "profit and loss" became portfolio analytics and performance cards
- "search options" became market explorer filtering by company, symbol, and sector

## 14.3 Design Phase

During the design phase, the application layout was divided into:

- authentication area
- sidebar navigation
- top dashboard area
- chart and order panel
- market card explorer
- holdings and deep-dive research panels
- history section
- performance section
- profile section

The objective was to keep the interface visually rich while still remaining easy to explain in an academic presentation.

## 14.4 Implementation Phase

Implementation was carried out in multiple backend and frontend iterations:

### Iteration 1

- created the initial dashboard
- added login layout
- created market cards and portfolio summary

### Iteration 2

- integrated MongoDB
- created Mongoose schemas
- added login API
- added dashboard API

### Iteration 3

- implemented registration
- implemented buy and sell routes
- validated portfolio balance and share quantity

### Iteration 4

- improved graph styling
- created candlestick-style chart
- added stock-specific graph switching

### Iteration 5

- expanded the stock universe
- added logos and stock badges
- created company deep-dive and portfolio research section

### Iteration 6

- added deployment preparation
- created Render configuration
- validated startup and environment variable flow

## 14.5 Testing and Improvement Phase

After implementation, continuous testing was performed to identify:

- broken routes
- JSON parsing issues
- stale server processes
- MongoDB connection errors
- missing registration route issues
- stock graph switching behavior
- chart rendering consistency

Each problem was resolved through code correction, server restarts, environment validation, or UI improvements.

## 14.6 Documentation Phase

The final phase involved documenting the project in a format similar to a model project report. This included:

- describing objectives and problem statements
- documenting technologies used
- explaining system design and modules
- writing testing and deployment sections
- preparing appendices and submission checklist

---

# 15 DETAILED MODULE WORKFLOW

## 15.1 Authentication Workflow

The authentication workflow begins when a user accesses the landing page. The user can either log in with an existing account or register a new one.

### Login flow

1. User enters email and password.
2. Frontend sends the data to `/api/auth/login`.
3. Backend verifies the user using MongoDB.
4. If valid, the dashboard data is loaded.
5. User enters the main trading interface.

### Registration flow

1. User enters name, email, password, and preferred market.
2. Frontend sends the data to `/api/auth/register`.
3. Backend checks whether the email already exists.
4. If not, a new user record is created with initial trading settings and cash balance.
5. The new user can immediately access the dashboard.

## 15.2 Dashboard Loading Workflow

When the dashboard loads:

1. The backend retrieves user data.
2. It retrieves all available stocks.
3. It retrieves the user’s transaction history.
4. It computes holdings and P&L.
5. It filters the market list according to the search term.
6. It sends a combined JSON response to the frontend.

This approach reduces unnecessary API calls and allows the dashboard to be rendered from a single structured response.

## 15.3 Buy Stock Workflow

The buy workflow operates as follows:

1. User clicks Buy on a stock card or quick order ticket.
2. A trade modal opens.
3. User enters quantity.
4. Frontend sends a buy request to `/api/trades`.
5. Backend validates:
   - user exists
   - stock exists
   - quantity is valid
   - cash balance is sufficient
6. Trade is stored in MongoDB.
7. User cash balance is updated.
8. Portfolio metrics are recalculated.
9. Updated dashboard is returned.

## 15.4 Sell Stock Workflow

The sell workflow is similar but includes holding validation:

1. User selects a stock.
2. User clicks Sell.
3. Frontend sends sell request with symbol and quantity.
4. Backend validates:
   - stock exists
   - user exists
   - user owns enough shares
5. Trade is stored.
6. Cash balance is increased.
7. Holdings are updated.
8. Dashboard refreshes with new P&L metrics.

## 15.5 Portfolio Research Workflow

The portfolio research area is generated from computed holdings. For each stock currently owned by the user, the backend combines:

- transaction-based holding quantity
- live-style price
- average buy price
- unrealized P&L
- company profile details

This makes the portfolio section much more meaningful than simply listing stock symbols.

## 15.6 Company Deep-Dive Workflow

When the user clicks a stock from:

- watchlist
- market explorer
- holdings
- profit/loss cards

the selected symbol becomes active. The frontend then:

- updates the graph
- updates the quick ticket
- updates chart title and price label
- updates the company deep-dive panel

This creates a consistent interaction pattern across the dashboard.

---

# 16 ALGORITHMS AND BUSINESS LOGIC

## 16.1 Holding Calculation Logic

The application calculates holdings using trade history rather than directly storing share counts. This is a more realistic approach.

### Steps

1. Sort transactions by date.
2. For each stock, create a position object.
3. Add quantity and cost basis for Buy orders.
4. Reduce quantity and cost basis for Sell orders.
5. Calculate average buy price for remaining shares.

### Formula

**Average Buy Price**

`Average Buy Price = Total Cost Basis / Current Quantity Held`

## 16.2 Unrealized Profit and Loss

Unrealized P&L is calculated using current market value and cost basis.

### Formula

`Unrealized P&L = Current Market Value - Total Cost Basis`

where:

`Current Market Value = Current Price × Quantity Held`

## 16.3 Realized Profit and Loss

Realized P&L is generated when shares are sold.

### Formula

`Realized P&L = Sell Value - Cost of Sold Shares`

This is calculated while processing transactions in chronological order.

## 16.4 Total Portfolio Profit and Loss

The total profit or loss is:

`Total P&L = Realized P&L + Unrealized P&L`

This value is shown on the dashboard to summarize overall portfolio performance.

## 16.5 Search Algorithm

The search feature works by comparing the lowercased search term against:

- stock symbol
- company name
- sector

This allows flexible search behavior and improves usability.

## 16.6 Market Simulation Logic

The project currently simulates live market movement instead of connecting to a live API. The market tick function:

- adds a small drift to the current price
- updates price history
- recalculates change percentage
- keeps the most recent history points for graph rendering

This makes the project visually dynamic while remaining suitable for a student environment.

---

# 17 USER MANUAL

## 17.1 How to Start the Application

1. Open terminal in the project folder.
2. Ensure MongoDB is running locally or set a valid Atlas URI.
3. Run:

```bash
npm start
```

4. Open the browser at:

```bash
http://localhost:4001
```

## 17.2 How to Register

1. Open the application.
2. Click the Register tab.
3. Enter full name, email, password, and preferred market.
4. Click Create Account.
5. The account is created and can be used immediately.

## 17.3 How to Log In

1. Go to the Login tab.
2. Enter email and password.
3. Click Enter Trading Desk.
4. Dashboard loads automatically.

## 17.4 How to Search Stocks

1. Use the search bar at the top of the dashboard.
2. Type a symbol, company name, or sector.
3. Matching stocks are shown in the market explorer.

## 17.5 How to View a Stock Graph

1. Click any company stock from:
   - watchlist
   - market explorer
   - holdings
   - performance cards
2. The graph panel updates to that stock.
3. OHLC and market values also update.

## 17.6 How to Buy Shares

1. Click Buy on a stock card.
2. Enter the quantity in the order modal.
3. Confirm the order.
4. The trade is recorded and the dashboard refreshes.

## 17.7 How to Sell Shares

1. Click Sell on a stock you own.
2. Enter quantity.
3. Confirm the order.
4. If quantity is valid, the system executes the sale and updates the portfolio.

## 17.8 How to Check Portfolio Details

1. View the Portfolio Research area in the overview section.
2. Click any holding to inspect detailed company analysis.
3. Check market value, P&L, P/E ratio, dividend yield, and investment thesis.

## 17.9 How to Update Profile

1. Open the Profile section.
2. Change risk profile, notification mode, or preferred market.
3. Click Save Profile.

---

# 18 DEPLOYMENT AND MAINTENANCE

## 18.1 Deployment Strategy

The project is designed to be deployed as a Node.js web service using Render, while MongoDB Atlas is used as the online database.

### Deployment files

- `render.yaml`
- `.env.example`
- `package.json`

### Environment variables required

- `PORT`
- `MONGODB_URI`

## 18.2 Deployment Steps Summary

1. Push the code to GitHub.
2. Create a new web service on Render.
3. Connect the GitHub repository.
4. Add `MONGODB_URI` in Render dashboard.
5. Add proper Atlas IP access.
6. Deploy the application.

## 18.3 Common Deployment Issues

### Issue 1: Application exits with status 1

Possible cause:

- missing environment variables
- invalid MongoDB connection string

### Issue 2: Atlas connection failure

Possible cause:

- IP not whitelisted in MongoDB Atlas

### Issue 3: Register route not working

Possible cause:

- old server process still running on the local port

## 18.4 Maintenance Considerations

To maintain the application properly:

- keep MongoDB credentials secure
- rotate database passwords if exposed
- monitor hosting logs
- update package dependencies carefully
- avoid hardcoding sensitive data
- add authentication hardening in future versions

---

# 19 LIMITATIONS OF THE PRESENT SYSTEM

Although the project is functionally strong, it still has some limitations:

1. It uses simulated market movement instead of real stock API integration.
2. Passwords are not yet encrypted using hashing.
3. There is no admin role management panel.
4. Technical indicators are limited in the chart.
5. The order engine is educational, not exchange-connected.
6. There is no full OTP or email verification workflow.

These limitations are acceptable for a final year academic project and leave clear future enhancement opportunities.

---

# 20 PERSONAL LEARNING OUTCOMES

This project provided practical experience in:

- frontend UI design
- dashboard-based web application development
- backend API development with Express.js
- database modeling using MongoDB and Mongoose
- business logic implementation for portfolio analytics
- state handling in JavaScript
- deployment configuration using Render and Atlas
- debugging runtime issues in a full-stack application

The project also improved understanding of how academic requirements can be transformed into a realistic digital product.

---

# APPENDIX A — FILES USED IN THE PROJECT

| File Name | File Type | Purpose |
|---|---|---|
| `server.js` | JavaScript | Backend server and API logic |
| `public/index.html` | HTML | Main frontend layout |
| `public/styles.css` | CSS | Styling and responsive UI |
| `public/app.js` | JavaScript | Frontend logic and chart rendering |
| `.env.example` | Config | Example environment variables |
| `render.yaml` | YAML | Render deployment configuration |
| `README.md` | Markdown | Project instructions and deployment notes |

---

# APPENDIX B — SCREENSHOT CHECKLIST

- Cover page completed  
- Login page screenshot added  
- Register page screenshot added  
- Dashboard screenshot added  
- Market explorer screenshot added  
- Chart screenshot added  
- History screenshot added  
- Portfolio research screenshot added  
- Performance screenshot added  
- Profile screenshot added  

---

# APPENDIX C — PERSONAL DECLARATION

I hereby declare that this project report titled **“Advanced Stock Trading and Portfolio Management Application”** is my own work carried out as part of my final year academic project. The work presented in this report is original to the best of my knowledge and has not been submitted elsewhere for any other degree or academic requirement.

**Signature:** ____________________  
**Name:** `[Your Name Here]`  
**Date:** ____________________  
