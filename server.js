const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4001);
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tradesphere_pro";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    location: String,
    accountId: String,
    strategy: String,
    memberSince: String,
    riskProfile: String,
    notifications: String,
    preferredMarket: String,
    cashBalance: Number,
  },
  { timestamps: true }
);

const stockSchema = new mongoose.Schema(
  {
    symbol: { type: String, unique: true },
    company: String,
    sector: String,
    price: Number,
    previousClose: Number,
    history: [Number],
  },
  { timestamps: true }
);

const tradeSchema = new mongoose.Schema(
  {
    userEmail: String,
    symbol: String,
    company: String,
    type: String,
    quantity: Number,
    price: Number,
    total: Number,
    status: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Stock = mongoose.model("Stock", stockSchema);
const Trade = mongoose.model("Trade", tradeSchema);

const seededUser = {
  name: "Aarav Mehta",
  email: "investor@tradesphere.com",
  password: "Trade@123",
  role: "Retail Trader",
  location: "Bengaluru, India",
  accountId: "TS-IND-90441",
  strategy: "Growth + Swing Trading",
  memberSince: "January 2024",
  riskProfile: "Moderate",
  notifications: "Realtime Alerts",
  preferredMarket: "NASDAQ & NSE",
  cashBalance: 225000,
};

const seededStocks = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    sector: "Technology",
    price: 192.42,
    previousClose: 188.24,
    history: [174, 176, 178, 182, 186, 189, 192],
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp.",
    sector: "Technology",
    price: 421.18,
    previousClose: 414.81,
    history: [372, 381, 389, 397, 405, 414, 421],
  },
  {
    symbol: "TSLA",
    company: "Tesla Inc.",
    sector: "Automotive",
    price: 168.73,
    previousClose: 175.52,
    history: [221, 214, 205, 197, 188, 176, 169],
  },
  {
    symbol: "NVDA",
    company: "NVIDIA Corp.",
    sector: "Semiconductors",
    price: 902.67,
    previousClose: 876.3,
    history: [688, 720, 748, 781, 820, 865, 903],
  },
  {
    symbol: "RELIANCE",
    company: "Reliance Industries",
    sector: "Energy",
    price: 2987.2,
    previousClose: 3016.9,
    history: [2842, 2891, 2944, 3012, 3061, 3024, 2987],
  },
  {
    symbol: "GOOGL",
    company: "Alphabet Inc.",
    sector: "Technology",
    price: 176.84,
    previousClose: 174.16,
    history: [162, 165, 168, 170, 172, 175, 177],
  },
  {
    symbol: "AMZN",
    company: "Amazon.com Inc.",
    sector: "E-Commerce",
    price: 186.34,
    previousClose: 182.92,
    history: [171, 173, 176, 178, 181, 184, 186],
  },
  {
    symbol: "META",
    company: "Meta Platforms",
    sector: "Technology",
    price: 511.42,
    previousClose: 505.31,
    history: [462, 474, 481, 492, 499, 507, 511],
  },
  {
    symbol: "NFLX",
    company: "Netflix Inc.",
    sector: "Streaming",
    price: 623.18,
    previousClose: 614.77,
    history: [582, 590, 598, 606, 611, 618, 623],
  },
  {
    symbol: "AMD",
    company: "Advanced Micro Devices",
    sector: "Semiconductors",
    price: 171.58,
    previousClose: 168.44,
    history: [149, 152, 156, 161, 164, 168, 172],
  },
  {
    symbol: "JPM",
    company: "JPMorgan Chase",
    sector: "Banking",
    price: 198.63,
    previousClose: 196.11,
    history: [182, 184, 187, 189, 193, 196, 199],
  },
  {
    symbol: "BAC",
    company: "Bank of America",
    sector: "Banking",
    price: 41.26,
    previousClose: 40.84,
    history: [37, 37.8, 38.4, 39.1, 39.8, 40.5, 41.2],
  },
  {
    symbol: "WMT",
    company: "Walmart Inc.",
    sector: "Retail",
    price: 68.14,
    previousClose: 67.42,
    history: [61, 62.3, 63.9, 64.8, 66.1, 67.1, 68.1],
  },
  {
    symbol: "DIS",
    company: "Walt Disney Co.",
    sector: "Entertainment",
    price: 118.52,
    previousClose: 116.03,
    history: [101, 104, 108, 111, 114, 116, 118.5],
  },
  {
    symbol: "TCS",
    company: "Tata Consultancy Services",
    sector: "IT Services",
    price: 4187.45,
    previousClose: 4138.2,
    history: [3910, 3968, 4015, 4064, 4109, 4142, 4187],
  },
  {
    symbol: "INFY",
    company: "Infosys Ltd.",
    sector: "IT Services",
    price: 1598.25,
    previousClose: 1579.1,
    history: [1495, 1512, 1531, 1548, 1564, 1582, 1598],
  },
  {
    symbol: "HDFCBANK",
    company: "HDFC Bank",
    sector: "Banking",
    price: 1684.6,
    previousClose: 1669.45,
    history: [1554, 1581, 1606, 1628, 1646, 1668, 1685],
  },
  {
    symbol: "ICICIBANK",
    company: "ICICI Bank",
    sector: "Banking",
    price: 1128.3,
    previousClose: 1114.7,
    history: [1032, 1051, 1069, 1084, 1097, 1112, 1128],
  },
  {
    symbol: "SBIN",
    company: "State Bank of India",
    sector: "Banking",
    price: 812.45,
    previousClose: 803.1,
    history: [742, 756, 769, 781, 792, 804, 812],
  },
  {
    symbol: "TATAMOTORS",
    company: "Tata Motors",
    sector: "Automotive",
    price: 1045.15,
    previousClose: 1022.4,
    history: [922, 945, 963, 981, 998, 1024, 1045],
  },
  {
    symbol: "MARUTI",
    company: "Maruti Suzuki",
    sector: "Automotive",
    price: 12684.8,
    previousClose: 12522.6,
    history: [11820, 11975, 12110, 12295, 12448, 12560, 12685],
  },
  {
    symbol: "ADANIENT",
    company: "Adani Enterprises",
    sector: "Infrastructure",
    price: 3291.9,
    previousClose: 3254.4,
    history: [2988, 3041, 3090, 3146, 3208, 3255, 3292],
  },
  {
    symbol: "ASIANPAINT",
    company: "Asian Paints",
    sector: "Consumer Goods",
    price: 3048.35,
    previousClose: 3017.15,
    history: [2879, 2918, 2944, 2977, 3006, 3022, 3048],
  },
  {
    symbol: "HINDUNILVR",
    company: "Hindustan Unilever",
    sector: "Consumer Goods",
    price: 2599.7,
    previousClose: 2571.8,
    history: [2448, 2474, 2498, 2522, 2549, 2576, 2600],
  },
];

const seededTrades = [
  {
    userEmail: seededUser.email,
    symbol: "AAPL",
    company: "Apple Inc.",
    type: "Buy",
    quantity: 8,
    price: 180.25,
    total: 1442,
    status: "Executed",
    createdAt: new Date("2026-04-15T09:30:00Z"),
    updatedAt: new Date("2026-04-15T09:30:00Z"),
  },
  {
    userEmail: seededUser.email,
    symbol: "TSLA",
    company: "Tesla Inc.",
    type: "Sell",
    quantity: 4,
    price: 171.4,
    total: 685.6,
    status: "Closed in loss",
    createdAt: new Date("2026-04-14T11:00:00Z"),
    updatedAt: new Date("2026-04-14T11:00:00Z"),
  },
  {
    userEmail: seededUser.email,
    symbol: "NVDA",
    company: "NVIDIA Corp.",
    type: "Buy",
    quantity: 2,
    price: 887.1,
    total: 1774.2,
    status: "Executed",
    createdAt: new Date("2026-04-12T12:00:00Z"),
    updatedAt: new Date("2026-04-12T12:00:00Z"),
  },
  {
    userEmail: seededUser.email,
    symbol: "MSFT",
    company: "Microsoft Corp.",
    type: "Buy",
    quantity: 5,
    price: 409.85,
    total: 2049.25,
    status: "Executed",
    createdAt: new Date("2026-04-11T14:30:00Z"),
    updatedAt: new Date("2026-04-11T14:30:00Z"),
  },
  {
    userEmail: seededUser.email,
    symbol: "RELIANCE",
    company: "Reliance Industries",
    type: "Buy",
    quantity: 3,
    price: 3008.4,
    total: 9025.2,
    status: "Executed",
    createdAt: new Date("2026-04-09T10:15:00Z"),
    updatedAt: new Date("2026-04-09T10:15:00Z"),
  },
  {
    userEmail: seededUser.email,
    symbol: "TSLA",
    company: "Tesla Inc.",
    type: "Buy",
    quantity: 10,
    price: 205.22,
    total: 2052.2,
    status: "Executed",
    createdAt: new Date("2026-04-07T13:10:00Z"),
    updatedAt: new Date("2026-04-07T13:10:00Z"),
  },
];

const marketState = new Map();

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function roundPrice(value) {
  return Number(value.toFixed(2));
}

function initializeMarket(stocks) {
  stocks.forEach((stock) => {
    if (!marketState.has(stock.symbol)) {
      marketState.set(stock.symbol, {
        symbol: stock.symbol,
        price: stock.price,
        previousClose: stock.previousClose,
        history: [...stock.history],
      });
    }
  });
}

function tickMarket(symbol) {
  const updateOne = (entry) => {
    const drift = randomBetween(-0.018, 0.022);
    entry.price = roundPrice(Math.max(10, entry.price * (1 + drift / 4)));
    entry.history.push(entry.price);
    if (entry.history.length > 18) {
      entry.history.shift();
    }
    return {
      ...entry,
      changePercent: roundPrice(
        ((entry.price - entry.previousClose) / entry.previousClose) * 100
      ),
    };
  };

  if (symbol) {
    const entry = marketState.get(symbol);
    return entry ? updateOne(entry) : null;
  }

  return Array.from(marketState.values()).map((entry) => updateOne(entry));
}

async function seedDatabase() {
  const userCount = await User.countDocuments();
  const tradeCount = await Trade.countDocuments();

  if (!userCount) {
    await User.create(seededUser);
  }
  if (!tradeCount) {
    await Trade.insertMany(seededTrades);
  }

  for (const stock of seededStocks) {
    await Stock.updateOne(
      { symbol: stock.symbol },
      { $setOnInsert: stock },
      { upsert: true }
    );
  }

  initializeMarket(await Stock.find().lean());
}

function computePortfolio(stocks, trades) {
  const positions = new Map();
  let realizedPnL = 0;

  trades
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .forEach((trade) => {
      if (!positions.has(trade.symbol)) {
        positions.set(trade.symbol, {
          symbol: trade.symbol,
          company: trade.company,
          quantity: 0,
          costBasis: 0,
        });
      }

      const position = positions.get(trade.symbol);

      if (trade.type === "Buy") {
        position.quantity += trade.quantity;
        position.costBasis += trade.total;
      } else {
        const avg = position.quantity > 0 ? position.costBasis / position.quantity : 0;
        const soldCost = avg * trade.quantity;
        realizedPnL += trade.total - soldCost;
        position.quantity -= trade.quantity;
        position.costBasis -= soldCost;
      }
    });

  const liveStocks = stocks.map((stock) => {
    const market = marketState.get(stock.symbol);
    const price = market ? market.price : stock.price;
    const changePercent = market
      ? roundPrice(((market.price - market.previousClose) / market.previousClose) * 100)
      : roundPrice(((stock.price - stock.previousClose) / stock.previousClose) * 100);

    return {
      ...stock,
      price,
      changePercent,
      history: market ? market.history : stock.history,
    };
  });

  const holdings = [];
  let invested = 0;
  let currentValue = 0;
  let losers = 0;

  positions.forEach((position, symbol) => {
    if (position.quantity <= 0) {
      return;
    }

    const stock = liveStocks.find((item) => item.symbol === symbol);
    if (!stock) {
      return;
    }

    const avgBuy = position.costBasis / position.quantity;
    const marketValue = stock.price * position.quantity;
    const unrealizedPnL = marketValue - position.costBasis;

    if (unrealizedPnL < 0) {
      losers += 1;
    }

    invested += position.costBasis;
    currentValue += marketValue;

    holdings.push({
      symbol,
      company: stock.company,
      sector: stock.sector,
      quantity: position.quantity,
      avgBuy: roundPrice(avgBuy),
      currentPrice: stock.price,
      marketValue: roundPrice(marketValue),
      unrealizedPnL: roundPrice(unrealizedPnL),
      changePercent: stock.changePercent,
      history: stock.history,
    });
  });

  const unrealizedPnL = roundPrice(currentValue - invested);
  const totalPnL = roundPrice(realizedPnL + unrealizedPnL);
  const bestPerformer = holdings
    .slice()
    .sort((a, b) => b.unrealizedPnL - a.unrealizedPnL)[0];

  return {
    holdings,
    watchlist: liveStocks,
    transactions: trades
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    stats: {
      invested: roundPrice(invested),
      currentValue: roundPrice(currentValue),
      unrealizedPnL,
      realizedPnL: roundPrice(realizedPnL),
      totalPnL,
      winners: holdings.length - losers,
      losers,
      bestPerformer: bestPerformer ? bestPerformer.symbol : "AAPL",
    },
  };
}

async function getDashboard(email, search = "") {
  const user = await User.findOne({ email }).lean();
  if (!user) {
    return null;
  }

  const stocks = await Stock.find().lean();
  const trades = await Trade.find({ userEmail: email }).lean();
  const portfolio = computePortfolio(stocks, trades);
  const searchTerm = search.trim().toLowerCase();

  const market = portfolio.watchlist.filter((stock) => {
    if (!searchTerm) {
      return true;
    }
    return (
      stock.symbol.toLowerCase().includes(searchTerm) ||
      stock.company.toLowerCase().includes(searchTerm) ||
      stock.sector.toLowerCase().includes(searchTerm)
    );
  });

  const transactions = portfolio.transactions.filter((trade) => {
    if (!searchTerm) {
      return true;
    }
    return (
      trade.symbol.toLowerCase().includes(searchTerm) ||
      trade.company.toLowerCase().includes(searchTerm) ||
      trade.type.toLowerCase().includes(searchTerm)
    );
  });

  const chartSymbol = market[0]?.symbol || portfolio.watchlist[0]?.symbol || "AAPL";
  const chart = marketState.get(chartSymbol) || marketState.get("AAPL");

  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location,
      accountId: user.accountId,
      strategy: user.strategy,
      memberSince: user.memberSince,
      riskProfile: user.riskProfile,
      notifications: user.notifications,
      preferredMarket: user.preferredMarket,
      cashBalance: user.cashBalance,
    },
    market,
    watchlist: portfolio.watchlist.slice(0, 5),
    holdings: portfolio.holdings,
    transactions,
    stats: portfolio.stats,
    chart: {
      symbol: chartSymbol,
      points: chart ? chart.history : [],
    },
  };
}

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ email }).lean();

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  return res.json({
    message: "Login successful",
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, preferredMarket } = req.body || {};
  const safeEmail = String(email || "").trim().toLowerCase();

  if (!name || !safeEmail || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const existingUser = await User.findOne({ email: safeEmail }).lean();
  if (existingUser) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  const createdUser = await User.create({
    name: String(name).trim(),
    email: safeEmail,
    password: String(password),
    role: "Retail Trader",
    location: "India",
    accountId: `TS-${Date.now().toString().slice(-6)}`,
    strategy: "Growth + Swing Trading",
    memberSince: new Date().toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    }),
    riskProfile: "Moderate",
    notifications: "Realtime Alerts",
    preferredMarket: preferredMarket || "NASDAQ & NSE",
    cashBalance: 150000,
  });

  return res.status(201).json({
    message: "Registration successful. Your trading account is ready.",
    user: {
      name: createdUser.name,
      email: createdUser.email,
    },
  });
});

app.get("/api/dashboard", async (req, res) => {
  tickMarket();
  const dashboard = await getDashboard(req.query.email, req.query.search || "");
  if (!dashboard) {
    return res.status(404).json({ message: "User not found." });
  }
  return res.json(dashboard);
});

app.get("/api/live/:symbol", async (req, res) => {
  const market = tickMarket(req.params.symbol.toUpperCase());
  if (!market) {
    return res.status(404).json({ message: "Stock not found." });
  }
  return res.json({
    symbol: market.symbol,
    price: market.price,
    changePercent: market.changePercent,
    points: market.history,
  });
});

app.post("/api/trades", async (req, res) => {
  const { email, symbol, type, quantity } = req.body || {};
  const safeSymbol = String(symbol || "").toUpperCase();
  const qty = Number(quantity);

  if (!email || !safeSymbol || !["Buy", "Sell"].includes(type) || qty <= 0) {
    return res.status(400).json({ message: "Trade payload is invalid." });
  }

  const user = await User.findOne({ email });
  const stock = await Stock.findOne({ symbol: safeSymbol }).lean();

  if (!user || !stock) {
    return res.status(404).json({ message: "User or stock not found." });
  }

  tickMarket(safeSymbol);
  const market = marketState.get(safeSymbol);
  const tradePrice = market.price;
  const total = roundPrice(tradePrice * qty);

  const trades = await Trade.find({ userEmail: email }).lean();
  const portfolio = computePortfolio(await Stock.find().lean(), trades);
  const holding = portfolio.holdings.find((item) => item.symbol === safeSymbol);

  if (type === "Buy" && user.cashBalance < total) {
    return res
      .status(400)
      .json({ message: "Insufficient cash balance for this buy order." });
  }

  if (type === "Sell" && (!holding || holding.quantity < qty)) {
    return res.status(400).json({ message: "Not enough shares available to sell." });
  }

  await Trade.create({
    userEmail: email,
    symbol: safeSymbol,
    company: stock.company,
    type,
    quantity: qty,
    price: tradePrice,
    total,
    status: type === "Buy" ? "Executed" : "Booked through market order",
  });

  user.cashBalance = roundPrice(
    type === "Buy" ? user.cashBalance - total : user.cashBalance + total
  );
  await user.save();

  const dashboard = await getDashboard(email);
  return res.status(201).json({
    message: `${type} order for ${safeSymbol} executed successfully.`,
    dashboard,
  });
});

app.patch("/api/profile", async (req, res) => {
  const { email, riskProfile, notifications, preferredMarket } = req.body || {};
  const user = await User.findOneAndUpdate(
    { email },
    { riskProfile, notifications, preferredMarket },
    { new: true }
  ).lean();

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.json({
    message: "Profile updated successfully.",
    user,
  });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`TradeSphere Pro running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server. Check MongoDB connection.", error.message);
    process.exit(1);
  }
}

startServer();
