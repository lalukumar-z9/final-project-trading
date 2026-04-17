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

const stockProfiles = {
  AAPL: {
    description: "Apple designs premium consumer electronics, software, and services with a strong recurring revenue ecosystem.",
    headquarters: "Cupertino, California",
    ceo: "Tim Cook",
    founded: 1976,
    employees: "161K",
    marketCap: "2.95T",
    peRatio: 30.8,
    dividendYield: "0.52%",
    riskLevel: "Moderate",
    thesis: "Services growth, brand loyalty, and product ecosystem strength support long-term quality compounding.",
  },
  MSFT: {
    description: "Microsoft operates cloud, productivity, enterprise software, and AI infrastructure businesses globally.",
    headquarters: "Redmond, Washington",
    ceo: "Satya Nadella",
    founded: 1975,
    employees: "221K",
    marketCap: "3.12T",
    peRatio: 35.4,
    dividendYield: "0.68%",
    riskLevel: "Moderate",
    thesis: "Azure, enterprise software stickiness, and AI monetization make Microsoft a core platform stock.",
  },
  TSLA: {
    description: "Tesla manufactures electric vehicles, battery systems, and energy products with high growth and volatility.",
    headquarters: "Austin, Texas",
    ceo: "Elon Musk",
    founded: 2003,
    employees: "140K",
    marketCap: "538B",
    peRatio: 51.2,
    dividendYield: "0.00%",
    riskLevel: "High",
    thesis: "EV scale, energy storage, and autonomy optionality create upside, but execution risk remains elevated.",
  },
  NVDA: {
    description: "NVIDIA builds GPUs and accelerated computing platforms used in AI, gaming, data centers, and automotive.",
    headquarters: "Santa Clara, California",
    ceo: "Jensen Huang",
    founded: 1993,
    employees: "29K",
    marketCap: "2.21T",
    peRatio: 58.7,
    dividendYield: "0.03%",
    riskLevel: "High",
    thesis: "AI infrastructure leadership and pricing power make NVIDIA a high-growth semiconductor leader.",
  },
  RELIANCE: {
    description: "Reliance spans energy, telecom, retail, and digital platforms, making it one of India's most diversified giants.",
    headquarters: "Mumbai, India",
    ceo: "Mukesh Ambani",
    founded: 1966,
    employees: "389K",
    marketCap: "20.2T",
    peRatio: 24.5,
    dividendYield: "0.35%",
    riskLevel: "Moderate",
    thesis: "Telecom and retail scale paired with energy cash flows provide diversified compounding potential.",
  },
  GOOGL: { description: "Alphabet dominates search, digital advertising, cloud, and AI-enabled internet platforms.", headquarters: "Mountain View, California", ceo: "Sundar Pichai", founded: 1998, employees: "182K", marketCap: "2.14T", peRatio: 27.1, dividendYield: "0.42%", riskLevel: "Moderate", thesis: "Search cash generation funds cloud and AI expansion, giving Alphabet durable digital platform strength." },
  AMZN: { description: "Amazon leads in e-commerce, logistics, cloud infrastructure, and platform-enabled consumer services.", headquarters: "Seattle, Washington", ceo: "Andy Jassy", founded: 1994, employees: "1.53M", marketCap: "1.94T", peRatio: 45.3, dividendYield: "0.00%", riskLevel: "Moderate", thesis: "AWS economics and fulfillment scale support long-term operating leverage across multiple businesses." },
  META: { description: "Meta operates social media, advertising, messaging, and metaverse technology platforms worldwide.", headquarters: "Menlo Park, California", ceo: "Mark Zuckerberg", founded: 2004, employees: "67K", marketCap: "1.29T", peRatio: 29.6, dividendYield: "0.41%", riskLevel: "Moderate", thesis: "Massive ad reach and disciplined spending strengthen Meta's cash flow and AI product potential." },
  NFLX: { description: "Netflix provides subscription streaming entertainment with global scale and a strong content brand.", headquarters: "Los Gatos, California", ceo: "Ted Sarandos / Greg Peters", founded: 1997, employees: "13K", marketCap: "268B", peRatio: 39.2, dividendYield: "0.00%", riskLevel: "Moderate", thesis: "Pricing power, advertising tier growth, and content efficiency improve long-term streaming economics." },
  AMD: { description: "AMD develops CPUs, GPUs, and data center chips competing across PC, gaming, and AI workloads.", headquarters: "Santa Clara, California", ceo: "Lisa Su", founded: 1969, employees: "28K", marketCap: "277B", peRatio: 46.8, dividendYield: "0.00%", riskLevel: "High", thesis: "Server share gains and AI chip expansion provide upside, though competition is intense." },
  JPM: { description: "JPMorgan Chase is a leading global bank with strong consumer, corporate, and investment banking franchises.", headquarters: "New York, New York", ceo: "Jamie Dimon", founded: 2000, employees: "309K", marketCap: "570B", peRatio: 13.4, dividendYield: "2.14%", riskLevel: "Moderate", thesis: "Balance sheet strength and diversified fee income make JPM a resilient financial compounder." },
  BAC: { description: "Bank of America serves retail, commercial, and wealth clients through one of the largest US banking networks.", headquarters: "Charlotte, North Carolina", ceo: "Brian Moynihan", founded: 1904, employees: "213K", marketCap: "324B", peRatio: 12.1, dividendYield: "2.45%", riskLevel: "Moderate", thesis: "Rate sensitivity and consumer banking scale support earnings leverage in stable credit cycles." },
  WMT: { description: "Walmart operates global retail, grocery, logistics, and membership-led commerce at enormous scale.", headquarters: "Bentonville, Arkansas", ceo: "Doug McMillon", founded: 1962, employees: "2.1M", marketCap: "548B", peRatio: 31.2, dividendYield: "1.32%", riskLevel: "Low",
    thesis: "Defensive cash flows, supply-chain strength, and omnichannel execution support durable retail leadership." },
  DIS: { description: "Disney combines media networks, streaming, consumer products, and world-famous theme parks.", headquarters: "Burbank, California", ceo: "Bob Iger", founded: 1923, employees: "225K", marketCap: "216B", peRatio: 25.6, dividendYield: "0.68%", riskLevel: "Moderate", thesis: "Parks profitability and improving streaming economics create a recovery plus franchise value story." },
  TCS: { description: "TCS is a global IT services leader delivering consulting, software, and digital transformation.", headquarters: "Mumbai, India", ceo: "K Krithivasan", founded: 1968, employees: "603K", marketCap: "15.2T", peRatio: 31.1, dividendYield: "1.24%", riskLevel: "Low", thesis: "Large enterprise relationships and execution consistency make TCS a high-quality IT compounder." },
  INFY: { description: "Infosys offers digital consulting, cloud modernization, and outsourcing services to global enterprises.", headquarters: "Bengaluru, India", ceo: "Salil Parekh", founded: 1981, employees: "317K", marketCap: "6.6T", peRatio: 27.4, dividendYield: "1.98%", riskLevel: "Low", thesis: "Strong margins, digital capability, and global delivery scale support stable long-term growth." },
  HDFCBANK: { description: "HDFC Bank is one of India's strongest private banks with leading retail and corporate franchises.", headquarters: "Mumbai, India", ceo: "Sashidhar Jagdishan", founded: 1994, employees: "208K", marketCap: "12.8T", peRatio: 19.2, dividendYield: "1.10%", riskLevel: "Low", thesis: "Asset quality, low-cost deposits, and franchise trust make HDFC Bank a core financial holding." },
  ICICIBANK: { description: "ICICI Bank is a major Indian private sector bank with improving profitability and digital capabilities.", headquarters: "Mumbai, India", ceo: "Sandeep Bakhshi", founded: 1994, employees: "141K", marketCap: "8.0T", peRatio: 18.1, dividendYield: "0.74%", riskLevel: "Moderate", thesis: "Credit growth, retail mix, and strong provisioning discipline support earnings momentum." },
  SBIN: { description: "State Bank of India is India's largest public sector bank with massive retail and corporate reach.", headquarters: "Mumbai, India", ceo: "C S Setty", founded: 1955, employees: "236K", marketCap: "7.3T", peRatio: 10.5, dividendYield: "1.66%", riskLevel: "Moderate", thesis: "Scale, lower valuations, and operating leverage make SBI attractive despite public-sector complexity." },
  TATAMOTORS: { description: "Tata Motors manufactures passenger vehicles, commercial vehicles, and owns Jaguar Land Rover.", headquarters: "Mumbai, India", ceo: "P B Balaji", founded: 1945, employees: "91K", marketCap: "3.8T", peRatio: 16.9, dividendYield: "0.00%", riskLevel: "High", thesis: "JLR recovery and domestic EV positioning create cyclical upside with execution sensitivity." },
  MARUTI: { description: "Maruti Suzuki is India's dominant passenger car maker with strong distribution and brand presence.", headquarters: "New Delhi, India", ceo: "Hisashi Takeuchi", founded: 1981, employees: "19K", marketCap: "3.9T", peRatio: 29.8, dividendYield: "1.02%", riskLevel: "Moderate", thesis: "Volume leadership and premiumization keep Maruti central to India's auto growth story." },
  ADANIENT: { description: "Adani Enterprises incubates businesses across airports, energy transition, mining, and infrastructure.", headquarters: "Ahmedabad, India", ceo: "Vinay Prakash", founded: 1993, employees: "23K", marketCap: "3.8T", peRatio: 72.4, dividendYield: "0.00%", riskLevel: "High", thesis: "Incubation model offers big upside, though leverage and execution risk remain significant." },
  ASIANPAINT: { description: "Asian Paints leads decorative paints and home improvement with a strong retail distribution network.", headquarters: "Mumbai, India", ceo: "Amit Syngle", founded: 1942, employees: "12K", marketCap: "2.9T", peRatio: 54.3, dividendYield: "0.93%", riskLevel: "Low", thesis: "Brand strength and retail reach create resilient consumer franchise economics." },
  HINDUNILVR: { description: "Hindustan Unilever owns leading consumer staples brands across personal care, food, and home products.", headquarters: "Mumbai, India", ceo: "Rohit Jawa", founded: 1933, employees: "8K", marketCap: "6.1T", peRatio: 58.1, dividendYield: "1.53%", riskLevel: "Low", thesis: "Staples resilience, premium brands, and distribution depth support defensive compounding." },
};

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
      ...(stockProfiles[stock.symbol] || {}),
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
      description: stock.description,
      headquarters: stock.headquarters,
      ceo: stock.ceo,
      founded: stock.founded,
      employees: stock.employees,
      marketCap: stock.marketCap,
      peRatio: stock.peRatio,
      dividendYield: stock.dividendYield,
      riskLevel: stock.riskLevel,
      thesis: stock.thesis,
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
