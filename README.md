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

## Demo login

- Email: `investor@tradesphere.com`
- Password: `Trade@123`

## Notes

- On first run, the app seeds demo user, stock, and transaction data into MongoDB.
- Every buy or sell action creates a MongoDB trade record and updates the portfolio plus cash balance.
- The live graph updates every few seconds from the backend.
