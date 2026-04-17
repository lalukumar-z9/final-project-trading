const stockData = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    sector: "Technology",
    price: 192.42,
    change: 2.12,
    shares: 18,
    avgBuy: 174.35,
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp.",
    sector: "Technology",
    price: 421.18,
    change: 1.48,
    shares: 10,
    avgBuy: 389.1,
  },
  {
    symbol: "TSLA",
    company: "Tesla Inc.",
    sector: "Automotive",
    price: 168.73,
    change: -3.86,
    shares: 14,
    avgBuy: 201.5,
  },
  {
    symbol: "NVDA",
    company: "NVIDIA Corp.",
    sector: "Semiconductors",
    price: 902.67,
    change: 4.94,
    shares: 6,
    avgBuy: 755.22,
  },
  {
    symbol: "RELIANCE",
    company: "Reliance Industries",
    sector: "Energy",
    price: 2987.2,
    change: -1.16,
    shares: 9,
    avgBuy: 3052.8,
  },
];

const transactions = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    type: "Buy",
    qty: 8,
    price: 180.25,
    date: "2026-04-15",
    status: "Executed",
  },
  {
    symbol: "TSLA",
    company: "Tesla Inc.",
    type: "Sell",
    qty: 4,
    price: 171.4,
    date: "2026-04-14",
    status: "Closed in loss",
  },
  {
    symbol: "NVDA",
    company: "NVIDIA Corp.",
    type: "Buy",
    qty: 2,
    price: 887.1,
    date: "2026-04-12",
    status: "Executed",
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp.",
    type: "Buy",
    qty: 5,
    price: 409.85,
    date: "2026-04-11",
    status: "Executed",
  },
  {
    symbol: "RELIANCE",
    company: "Reliance Industries",
    type: "Sell",
    qty: 3,
    price: 3008.4,
    date: "2026-04-09",
    status: "Booked partial profit",
  },
  {
    symbol: "TSLA",
    company: "Tesla Inc.",
    type: "Buy",
    qty: 10,
    price: 205.22,
    date: "2026-04-07",
    status: "Executed",
  },
];

const lossTrend = [
  { day: "Mon", value: -1200 },
  { day: "Tue", value: -1850 },
  { day: "Wed", value: -960 },
  { day: "Thu", value: -2410 },
  { day: "Fri", value: -1620 },
  { day: "Sat", value: -1180 },
  { day: "Sun", value: -820 },
];

const profile = {
  name: "Aarav Mehta",
  email: "investor@tradesphere.com",
  role: "Retail Trader",
  location: "Bengaluru, India",
  accountId: "TS-IND-90441",
  strategy: "Growth + Swing Trading",
  memberSince: "January 2024",
};

const loginCard = document.getElementById("loginCard");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const stockSearch = document.getElementById("stockSearch");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".content-section");
const historyTable = document.getElementById("historyTable");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function buildStats() {
  const statsGrid = document.getElementById("statsGrid");
  const invested = stockData.reduce((sum, stock) => sum + stock.avgBuy * stock.shares, 0);
  const currentValue = stockData.reduce((sum, stock) => sum + stock.price * stock.shares, 0);
  const profitLoss = currentValue - invested;
  const winners = stockData.filter((stock) => stock.price > stock.avgBuy).length;

  const stats = [
    {
      label: "Portfolio Value",
      value: formatCurrency(currentValue),
      note: "Across 5 tracked holdings",
      delta: `${profitLoss >= 0 ? "+" : ""}${formatCurrency(profitLoss)}`,
      tone: profitLoss >= 0 ? "positive" : "negative",
    },
    {
      label: "Total Invested",
      value: formatCurrency(invested),
      note: "Capital deployed",
      delta: "+12.8% this quarter",
      tone: "positive",
    },
    {
      label: "Winning Positions",
      value: `${winners}/5`,
      note: "Stocks in profit",
      delta: "Balanced exposure",
      tone: "positive",
    },
    {
      label: "Risk Exposure",
      value: "Medium",
      note: "Volatility-controlled profile",
      delta: "-3.2% max drawdown",
      tone: "negative",
    },
  ];

  statsGrid.innerHTML = stats
    .map(
      (stat) => `
        <article class="stat-card">
          <p class="eyebrow">${stat.label}</p>
          <div class="value">${stat.value}</div>
          <p class="muted">${stat.note}</p>
          <p class="delta ${stat.tone}">${stat.delta}</p>
        </article>
      `
    )
    .join("");
}

function buildWatchlist() {
  const watchlist = document.getElementById("watchlist");
  watchlist.innerHTML = stockData
    .map(
      (stock) => `
        <div class="watch-item">
          <div>
            <strong>${stock.symbol}</strong>
            <p class="muted">${stock.company}</p>
          </div>
          <div>
            <strong>${formatCurrency(stock.price)}</strong>
            <p class="delta ${stock.change >= 0 ? "positive" : "negative"}">
              ${stock.change >= 0 ? "+" : ""}${stock.change}%
            </p>
          </div>
        </div>
      `
    )
    .join("");
}

function buildMarketCards(filter = "") {
  const marketCards = document.getElementById("marketCards");
  const term = filter.trim().toLowerCase();
  const filteredStocks = stockData.filter((stock) => {
    if (!term) return true;
    return (
      stock.symbol.toLowerCase().includes(term) ||
      stock.company.toLowerCase().includes(term) ||
      stock.sector.toLowerCase().includes(term)
    );
  });

  marketCards.innerHTML = filteredStocks
    .map(
      (stock) => `
        <article class="market-card">
          <div class="panel-head">
            <div>
              <strong>${stock.symbol}</strong>
              <p class="muted">${stock.company}</p>
            </div>
            <span class="delta ${stock.change >= 0 ? "positive" : "negative"}">
              ${stock.change >= 0 ? "+" : ""}${stock.change}%
            </span>
          </div>
          <span class="sector-tag">${stock.sector}</span>
          <div class="value">${formatCurrency(stock.price)}</div>
          <p class="muted">Average buy: ${formatCurrency(stock.avgBuy)} | Qty: ${stock.shares}</p>
          <div class="card-actions">
            <button type="button" class="buy-btn">Buy</button>
            <button type="button" class="sell-btn">Sell</button>
          </div>
        </article>
      `
    )
    .join("");
}

function buildHoldings() {
  const holdingsList = document.getElementById("holdingsList");
  const totalValue = stockData.reduce((sum, stock) => sum + stock.price * stock.shares, 0);

  holdingsList.innerHTML = stockData
    .map((stock) => {
      const value = stock.price * stock.shares;
      const weight = ((value / totalValue) * 100).toFixed(1);
      const pnl = (stock.price - stock.avgBuy) * stock.shares;

      return `
        <div class="holding-row">
          <div>
            <strong>${stock.symbol}</strong>
            <p class="muted">${stock.company}</p>
          </div>
          <div>
            <strong>${weight}%</strong>
            <p class="delta ${pnl >= 0 ? "positive" : "negative"}">${formatCurrency(pnl)}</p>
          </div>
        </div>
      `;
    })
    .join("");
}

function buildHistory(filter = "") {
  const term = filter.trim().toLowerCase();
  const rows = transactions.filter((trade) => {
    if (!term) return true;
    return (
      trade.symbol.toLowerCase().includes(term) ||
      trade.company.toLowerCase().includes(term) ||
      trade.type.toLowerCase().includes(term)
    );
  });

  historyTable.innerHTML = rows
    .map(
      (trade) => `
        <tr>
          <td><strong>${trade.symbol}</strong></td>
          <td>${trade.company}</td>
          <td><span class="history-pill ${trade.type.toLowerCase()}">${trade.type}</span></td>
          <td>${trade.qty}</td>
          <td>${formatCurrency(trade.price)}</td>
          <td>${trade.date}</td>
          <td>${trade.status}</td>
        </tr>
      `
    )
    .join("");
}

function buildProfitLoss() {
  const profitLossList = document.getElementById("profitLossList");
  const metricStack = document.getElementById("metricStack");

  const cards = stockData.map((stock) => {
    const pnl = (stock.price - stock.avgBuy) * stock.shares;
    const returnRate = (((stock.price - stock.avgBuy) / stock.avgBuy) * 100).toFixed(2);
    return `
      <div class="profit-loss-card">
        <div class="panel-head">
          <div>
            <strong>${stock.symbol}</strong>
            <p class="muted">${stock.company}</p>
          </div>
          <div class="delta ${pnl >= 0 ? "positive" : "negative"}">${formatCurrency(pnl)}</div>
        </div>
        <p class="muted">Avg buy ${formatCurrency(stock.avgBuy)} | Current ${formatCurrency(stock.price)}</p>
        <p class="delta ${pnl >= 0 ? "positive" : "negative"}">${returnRate}% return</p>
      </div>
    `;
  });

  const portfolioPnL = stockData.reduce(
    (sum, stock) => sum + (stock.price - stock.avgBuy) * stock.shares,
    0
  );
  const realized = 18425;
  const metrics = [
    { label: "Net P&L", value: formatCurrency(portfolioPnL), tone: portfolioPnL >= 0 ? "positive" : "negative" },
    { label: "Realized Gains", value: formatCurrency(realized), tone: "positive" },
    { label: "Loss-Making Positions", value: "2", tone: "negative" },
    { label: "Best Performer", value: "NVDA", tone: "positive" },
  ];

  profitLossList.innerHTML = cards.join("");
  metricStack.innerHTML = metrics
    .map(
      (metric) => `
        <div class="metric-card">
          <p class="eyebrow">${metric.label}</p>
          <div class="value">${metric.value}</div>
          <p class="delta ${metric.tone}">${metric.tone === "positive" ? "Healthy momentum" : "Needs review"}</p>
        </div>
      `
    )
    .join("");
}

function buildProfile() {
  const profileSummary = document.getElementById("profileSummary");
  profileSummary.innerHTML = Object.entries(profile)
    .map(
      ([key, value]) => `
        <div class="profile-row">
          <span class="muted">${key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</span>
          <strong>${value}</strong>
        </div>
      `
    )
    .join("");
}

function buildChart() {
  const container = document.getElementById("lossChart");
  const width = 520;
  const height = 280;
  const padding = 28;
  const values = lossTrend.map((point) => Math.abs(point.value));
  const max = Math.max(...values);
  const stepX = (width - padding * 2) / (lossTrend.length - 1);

  const points = lossTrend
    .map((point, index) => {
      const x = padding + index * stepX;
      const y = padding + ((Math.abs(point.value) / max) * (height - padding * 2));
      return { x, y, day: point.day, value: point.value };
    });

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  const labels = points
    .map(
      (point) => `
        <text x="${point.x}" y="${height - 8}" text-anchor="middle" class="axis-label">${point.day}</text>
      `
    )
    .join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Loss trend graph">
      <defs>
        <linearGradient id="lossGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="rgba(255, 107, 107, 0.45)"></stop>
          <stop offset="100%" stop-color="rgba(255, 107, 107, 0.03)"></stop>
        </linearGradient>
      </defs>
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.1)" />
      <path d="${areaPath}" class="chart-area"></path>
      <path d="${linePath}" class="chart-line"></path>
      ${labels}
    </svg>
  `;
}

function switchSection(sectionId) {
  navLinks.forEach((button) => {
    button.classList.toggle("active", button.dataset.section === sectionId);
  });
  sections.forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginCard.classList.add("hidden");
  dashboard.classList.remove("hidden");
});

logoutBtn.addEventListener("click", () => {
  dashboard.classList.add("hidden");
  loginCard.classList.remove("hidden");
  loginForm.reset();
  document.getElementById("email").value = profile.email;
  document.getElementById("password").value = "Trade@123";
});

stockSearch.addEventListener("input", (event) => {
  buildHistory(event.target.value);
  buildMarketCards(event.target.value);
});

navLinks.forEach((button) => {
  button.addEventListener("click", () => {
    switchSection(button.dataset.section);
  });
});

buildStats();
buildWatchlist();
buildMarketCards();
buildHoldings();
buildHistory();
buildProfitLoss();
buildProfile();
buildChart();
