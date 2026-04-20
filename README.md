# TradeSphere Pro

TradeSphere Pro is a full-stack stock trading final year project starter with:

- Express backend
- MongoDB persistence through Mongoose
- Working buy and sell APIs
- Live-updating graph driven by backend market simulation
- Login, history, portfolio, P&L, search, and profile management

## Main files

- [server.js](/C:/lk/server.js)
- [public/index.html](/C:/lk/public/index.html)
- [public/styles.css](/C:/lk/public/styles.css)
- [public/app.js](/C:/lk/public/app.js)
- [.env.example](/C:/lk/.env.example)

## Run locally

1. Install and start MongoDB on your machine.
2. Copy `.env.example` to `.env`.
3. Run `npm start`
4. Open [http://localhost:4000](http://localhost:4000)

## Deploy online

Recommended stack:

- Render for the Node.js app
- MongoDB Atlas for the database

### Render setup

1. Push this repo to GitHub.
2. In Render, create a new `Web Service`.
3. Connect the GitHub repo.
4. Use these settings:
   - Build command: `npm install`
   - Start command: `npm start`
5. Add environment variables:
   - `PORT` = `10000`
   - `MONGODB_URI` = your MongoDB Atlas connection string with a database name added at the end

Example format:

```env
mongodb+srv://USERNAME:PASSWORD@cluster0.example.mongodb.net/tradesphere_pro?retryWrites=true&w=majority&appName=Cluster0
```

Important:

- Do not commit your real MongoDB password into the repo.
- If you shared your password publicly, rotate it in MongoDB Atlas before production use.

## Demo login

- Email: `investor@tradesphere.com`
- Password: `Trade@123`

## Notes

- On first run, the app seeds demo user, stock, and transaction data into MongoDB.
- Every buy or sell action creates a MongoDB trade record and updates the portfolio plus cash balance.
- The live graph updates every few seconds from the backend.
