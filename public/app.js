const state = {
  userEmail: "",
  dashboard: null,
  selectedSymbol: "",
  selectedTradeType: "Buy",
  liveInterval: null,
  search: "",
};

const loginView = document.getElementById("loginView");
const dashboardView = document.getElementById("dashboardView");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const logoutBtn = document.getElementById("logoutBtn");
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".page-section");
const stockSearch = document.getElementById("stockSearch");
const tradeModal = document.getElementById("tradeModal");
const tradeForm = document.getElementById("tradeForm");
const closeModalBtn = document.getElementById("closeModalBtn");
const quickBuyBtn = document.getElementById("quickBuyBtn");
const quickSellBtn = document.getElementById("quickSellBtn");
const profileForm = document.getElementById("profileForm");
const toast = document.getElementById("toast");
const authTabs = document.querySelectorAll(".auth-tab");
const authForms = document.querySelectorAll(".auth-form");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();
  let data;

  if (contentType.includes("application/json")) {
    data = raw ? JSON.parse(raw) : {};
  } else {
    data = {
      message: raw || "Server returned an unexpected response.",
    };
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.style.borderColor = isError ? "rgba(255, 111, 127, 0.35)" : "rgba(62, 207, 142, 0.35)";
  setTimeout(() => toast.classList.add("hidden"), 2800);
}

function setSection(sectionId) {
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.section === sectionId));
  sections.forEach((section) => section.classList.toggle("active", section.id === sectionId));
}

function setAuthView(view) {
  authTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.authView === view));
  authForms.forEach((form) => form.classList.toggle("active", form.id === `${view}Form`));
}

function renderStats() {
  const { stats, user } = state.dashboard;
  const items = [
    {
      label: "Portfolio Value",
      value: formatCurrency(stats.currentValue),
      note: "Marked to live market",
      delta: `${stats.totalPnL >= 0 ? "+" : ""}${formatCurrency(stats.totalPnL)}`,
      tone: stats.totalPnL >= 0 ? "positive" : "negative",
    },
    {
      label: "Invested Capital",
      value: formatCurrency(stats.invested),
      note: "Open holdings only",
      delta: `${stats.winners} winners / ${stats.losers} losers`,
      tone: stats.winners >= stats.losers ? "positive" : "negative",
    },
    {
      label: "Cash Balance",
      value: formatCurrency(user.cashBalance),
      note: "Available buying power",
      delta: user.riskProfile,
      tone: "positive",
    },
    {
      label: "Realized P&L",
      value: formatCurrency(stats.realizedPnL),
      note: `Best performer ${stats.bestPerformer}`,
      delta: `${stats.unrealizedPnL >= 0 ? "+" : ""}${formatCurrency(stats.unrealizedPnL)} open`,
      tone: stats.unrealizedPnL >= 0 ? "positive" : "negative",
    },
  ];

  document.getElementById("statsGrid").innerHTML = items
    .map(
      (item) => `
        <article class="stat-card">
          <p class="eyebrow">${item.label}</p>
          <div class="stat-value">${item.value}</div>
          <p class="muted">${item.note}</p>
          <p class="delta ${item.tone}">${item.delta}</p>
        </article>
      `
    )
    .join("");
}

function renderWatchlist() {
  document.getElementById("watchlist").innerHTML = state.dashboard.watchlist
    .map(
      (stock) => `
        <div class="watch-row clickable-stock" data-symbol="${stock.symbol}">
          <div>
            <strong>${stock.symbol}</strong>
            <p class="muted">${stock.company}</p>
          </div>
          <div>
            <strong>${formatCurrency(stock.price)}</strong>
            <p class="delta ${stock.changePercent >= 0 ? "positive" : "negative"}">
              ${stock.changePercent >= 0 ? "+" : ""}${stock.changePercent}%
            </p>
          </div>
        </div>
      `
    )
    .join("");

  document.querySelectorAll("#watchlist .clickable-stock").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedSymbol = row.dataset.symbol;
      renderAll();
    });
  });
}

function renderMarket() {
  const marketCards = document.getElementById("marketCards");
  if (!state.dashboard.market.length) {
    marketCards.innerHTML =
      '<div class="empty-state"><div class="market-card"><strong>No stocks found.</strong><p class="muted">Try a different search keyword.</p></div></div>';
    return;
  }

  marketCards.innerHTML = state.dashboard.market
    .map(
      (stock) => `
        <article class="market-card select-stock" data-symbol="${stock.symbol}">
          <div class="section-top">
            <div>
              <h4>${stock.symbol}</h4>
              <p class="muted">${stock.company}</p>
            </div>
            <span class="delta ${stock.changePercent >= 0 ? "positive" : "negative"}">
              ${stock.changePercent >= 0 ? "+" : ""}${stock.changePercent}%
            </span>
          </div>
          <span class="sector-chip">${stock.sector}</span>
          <div class="stat-value">${formatCurrency(stock.price)}</div>
          <p class="muted">Prev close ${formatCurrency(stock.previousClose)}</p>
          <div class="card-actions">
            <button class="primary-btn buy-trigger" data-symbol="${stock.symbol}">Buy</button>
            <button class="danger-btn sell-trigger" data-symbol="${stock.symbol}">Sell</button>
          </div>
        </article>
      `
    )
    .join("");

  marketCards.querySelectorAll(".buy-trigger").forEach((button) => {
    button.addEventListener("click", () => openTradeModal(button.dataset.symbol, "Buy"));
  });
  marketCards.querySelectorAll(".sell-trigger").forEach((button) => {
    button.addEventListener("click", () => openTradeModal(button.dataset.symbol, "Sell"));
  });
  marketCards.querySelectorAll(".select-stock").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) {
        return;
      }
      state.selectedSymbol = card.dataset.symbol;
      renderAll();
    });
  });
}

function renderHoldings() {
  const holdings = state.dashboard.holdings;
  const losses = holdings
    .filter((holding) => holding.unrealizedPnL < 0)
    .sort((a, b) => a.unrealizedPnL - b.unrealizedPnL);

    document.getElementById("holdingsList").innerHTML = holdings.length
      ? holdings
          .map(
            (holding) => `
              <div class="holding-row clickable-stock" data-symbol="${holding.symbol}">
                <div>
                  <strong>${holding.symbol}</strong>
                  <p class="muted">${holding.company}</p>
              </div>
              <div>
                <strong>${holding.quantity} shares</strong>
                <p class="delta ${holding.unrealizedPnL >= 0 ? "positive" : "negative"}">
                  ${formatCurrency(holding.unrealizedPnL)}
                </p>
              </div>
            </div>
          `
        )
        .join("")
    : '<div class="metric-card"><strong>No holdings yet.</strong><p class="muted">Place a buy order to build the portfolio.</p></div>';

    document.getElementById("lossLeaders").innerHTML = losses.length
      ? losses
          .map(
            (holding) => `
              <div class="holding-row clickable-stock" data-symbol="${holding.symbol}">
                <div>
                  <strong>${holding.symbol}</strong>
                  <p class="muted">${holding.quantity} shares | Avg ${formatCurrency(holding.avgBuy)}</p>
              </div>
              <div>
                <strong class="negative">${formatCurrency(holding.unrealizedPnL)}</strong>
                <p class="muted">${holding.changePercent}% today</p>
              </div>
            </div>
          `
          )
          .join("")
      : '<div class="metric-card"><strong>No active losses.</strong><p class="muted">Your open positions are holding above cost basis.</p></div>';

  document
    .querySelectorAll("#holdingsList .clickable-stock, #lossLeaders .clickable-stock")
    .forEach((row) => {
      row.addEventListener("click", () => {
        state.selectedSymbol = row.dataset.symbol;
        renderAll();
      });
    });
}

function renderHistory() {
  document.getElementById("historyTable").innerHTML = state.dashboard.transactions
    .map(
      (trade) => `
        <tr>
          <td>${new Date(trade.createdAt).toLocaleString("en-IN")}</td>
          <td><strong>${trade.symbol}</strong></td>
          <td><span class="type-badge ${trade.type.toLowerCase()}">${trade.type}</span></td>
          <td>${trade.quantity}</td>
          <td>${formatCurrency(trade.price)}</td>
          <td>${formatCurrency(trade.total)}</td>
          <td>${trade.status}</td>
        </tr>
      `
    )
    .join("");
}

function renderPerformance() {
  const holdings = state.dashboard.holdings;
  const stats = state.dashboard.stats;
    document.getElementById("profitLossCards").innerHTML = holdings.length
      ? holdings
          .map(
            (holding) => `
              <div class="metric-card clickable-stock" data-symbol="${holding.symbol}">
                <div class="section-top">
                  <div>
                    <strong>${holding.symbol}</strong>
                  <p class="muted">${holding.company}</p>
                </div>
                <span class="delta ${holding.unrealizedPnL >= 0 ? "positive" : "negative"}">
                  ${formatCurrency(holding.unrealizedPnL)}
                </span>
              </div>
              <p class="muted">Avg Buy ${formatCurrency(holding.avgBuy)} | Current ${formatCurrency(holding.currentPrice)}</p>
            </div>
          `
          )
          .join("")
      : '<div class="metric-card"><strong>No open positions.</strong><p class="muted">Open trades will appear here after your first order.</p></div>';

  document.querySelectorAll("#profitLossCards .clickable-stock").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedSymbol = card.dataset.symbol;
      setSection("overview");
      renderAll();
    });
  });

  const metricItems = [
    { label: "Total P&L", value: formatCurrency(stats.totalPnL), tone: stats.totalPnL >= 0 ? "positive" : "negative" },
    { label: "Realized", value: formatCurrency(stats.realizedPnL), tone: stats.realizedPnL >= 0 ? "positive" : "negative" },
    { label: "Unrealized", value: formatCurrency(stats.unrealizedPnL), tone: stats.unrealizedPnL >= 0 ? "positive" : "negative" },
    { label: "Cash Balance", value: formatCurrency(state.dashboard.user.cashBalance), tone: "positive" },
  ];

  document.getElementById("metricsPanel").innerHTML = metricItems
    .map(
      (item) => `
        <div class="metric-card">
          <p class="eyebrow">${item.label}</p>
          <div class="stat-value">${item.value}</div>
          <p class="delta ${item.tone}">${item.tone === "positive" ? "Strong position" : "Needs attention"}</p>
        </div>
      `
    )
    .join("");
}

function renderProfile() {
  const user = state.dashboard.user;
  const entries = [
    ["Name", user.name],
    ["Email", user.email],
    ["Role", user.role],
    ["Location", user.location],
    ["Account ID", user.accountId],
    ["Strategy", user.strategy],
    ["Member Since", user.memberSince],
  ];

  document.getElementById("profileSummary").innerHTML = entries
    .map(
      ([label, value]) => `
        <div class="profile-row">
          <span class="muted">${label}</span>
          <strong>${value}</strong>
        </div>
      `
    )
    .join("");

  document.getElementById("riskProfile").value = user.riskProfile;
  document.getElementById("notifications").value = user.notifications;
  document.getElementById("preferredMarket").value = user.preferredMarket;
}

function renderSelectedStock() {
  const selected =
    state.dashboard.market.find((stock) => stock.symbol === state.selectedSymbol) ||
    state.dashboard.holdings.find((stock) => stock.symbol === state.selectedSymbol) ||
    state.dashboard.watchlist.find((stock) => stock.symbol === state.selectedSymbol) ||
    state.dashboard.market[0] ||
    state.dashboard.holdings[0] ||
    state.dashboard.watchlist[0];

  if (!selected) {
    document.getElementById("selectedStockCard").innerHTML =
      '<div class="muted">Choose a stock from the market explorer to place orders.</div>';
    quickBuyBtn.disabled = true;
    quickSellBtn.disabled = true;
    return;
  }

  state.selectedSymbol = selected.symbol;
  document.getElementById("ticketSymbol").textContent = `${selected.symbol} Order Ticket`;
  document.getElementById("ticketPrice").textContent = formatCurrency(selected.price);
  document.getElementById("selectedStockCard").innerHTML = `
    <div class="trade-row">
      <div>
        <strong>${selected.company}</strong>
        <p class="muted">${selected.sector}</p>
      </div>
      <div>
        <strong>${formatCurrency(selected.price)}</strong>
        <p class="delta ${selected.changePercent >= 0 ? "positive" : "negative"}">
          ${selected.changePercent >= 0 ? "+" : ""}${selected.changePercent}%
        </p>
      </div>
    </div>
    <p class="muted">Live quote updates automatically. Use quick order buttons or the explorer card actions.</p>
  `;
  quickBuyBtn.disabled = false;
  quickSellBtn.disabled = false;
}

function buildCandles(points = []) {
  if (!points.length) {
    return [];
  }

  const source = points.length < 12 ? [...points, ...points.slice(-4)] : points;
  const candles = [];

  for (let index = 0; index < source.length - 1; index += 2) {
    const open = source[index];
    const close = source[Math.min(index + 1, source.length - 1)];
    const upperBase = Math.max(open, close);
    const lowerBase = Math.min(open, close);
    const high = upperBase * (1 + (0.002 + ((index % 3) * 0.0015)));
    const low = lowerBase * (1 - (0.0022 + ((index % 2) * 0.0018)));

    candles.push({
      open,
      close,
      high,
      low,
    });
  }

  return candles.slice(-8);
}

function setOhlcStats(candle) {
  const change = candle.close - candle.open;
  const changePct = (change / candle.open) * 100;
  const volatility = ((candle.high - candle.low) / candle.open) * 100;
  const tone = change >= 0 ? "positive" : "negative";
  const now = new Date().toLocaleString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  document.getElementById("ohlcTime").textContent = `Time ${now}`;
  document.getElementById("ohlcOpen").innerHTML = `Open <span class="${tone}">${candle.open.toFixed(2)}</span>`;
  document.getElementById("ohlcHigh").innerHTML = `High <span class="positive">${candle.high.toFixed(2)}</span>`;
  document.getElementById("ohlcLow").innerHTML = `Low <span class="positive">${candle.low.toFixed(2)}</span>`;
  document.getElementById("ohlcClose").innerHTML = `Close <span class="${tone}">${candle.close.toFixed(2)}</span>`;
  document.getElementById("ohlcChange").innerHTML = `Change <span class="${tone}">${change.toFixed(2)} (${changePct.toFixed(2)}%)</span>`;
  document.getElementById("ohlcVolatility").innerHTML = `Volatility <span class="positive">${volatility.toFixed(2)}%</span>`;
}

function drawChart(points = [], symbol = "") {
  const width = 900;
  const height = 390;
  const leftPad = 10;
  const rightPad = 46;
  const topPad = 16;
  const bottomPad = 20;
  const candles = buildCandles(points);

  if (!candles.length) {
    document.getElementById("liveChart").innerHTML = "";
    return;
  }

  const values = candles.flatMap((candle) => [candle.high, candle.low]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(0.01, max - min);
  const plotHeight = height - topPad - bottomPad;
  const plotWidth = width - leftPad - rightPad;
  const candleGap = plotWidth / candles.length;
  const candleWidth = Math.max(10, candleGap * 0.42);

  const scaleY = (value) =>
    topPad + ((max - value) / range) * plotHeight;

  const gridValues = Array.from({ length: 6 }, (_, index) => max - (range / 5) * index);
  const gridLines = gridValues
    .map((value) => {
      const y = scaleY(value);
      return `
        <line class="chart-grid-line" x1="${leftPad}" y1="${y}" x2="${width - rightPad}" y2="${y}"></line>
        <text class="chart-label" x="${width - rightPad + 8}" y="${y + 4}">${value.toFixed(2)}</text>
      `;
    })
    .join("");

  const verticalMarkerX = leftPad + candleGap * 2.3;
  const verticalMarker = `<line class="chart-grid-vertical" x1="${verticalMarkerX}" y1="${topPad}" x2="${verticalMarkerX}" y2="${height - bottomPad}"></line>`;

  const candleMarkup = candles
    .map((candle, index) => {
      const x = leftPad + candleGap * index + candleGap / 2;
      const openY = scaleY(candle.open);
      const closeY = scaleY(candle.close);
      const highY = scaleY(candle.high);
      const lowY = scaleY(candle.low);
      const top = Math.min(openY, closeY);
      const bodyHeight = Math.max(4, Math.abs(closeY - openY));
      const tone = candle.close >= candle.open ? "candle-up" : "candle-down";

      return `
        <line class="candle-wick ${tone}" x1="${x}" y1="${highY}" x2="${x}" y2="${lowY}"></line>
        <rect class="candle-body ${tone}" x="${x - candleWidth / 2}" y="${top}" width="${candleWidth}" height="${bodyHeight}"></rect>
        <text class="chart-label" x="${x}" y="${height - 4}" text-anchor="middle">T${index + 1}</text>
      `;
    })
    .join("");

  const latest = candles[candles.length - 1];
  const latestY = scaleY(latest.close);
  const priceLine = `
    <line class="price-line" x1="${leftPad}" y1="${latestY}" x2="${width - rightPad}" y2="${latestY}"></line>
    <rect class="price-tag" x="${width - rightPad + 4}" y="${latestY - 12}" width="48" height="24" rx="6"></rect>
    <text class="price-tag-text" x="${width - rightPad + 28}" y="${latestY + 4}" text-anchor="middle">${latest.close.toFixed(2)}</text>
  `;

  document.getElementById("chartTitle").textContent = `${symbol} Price`;
  document.getElementById("chartSpotPrice").textContent = `INR ${latest.close.toFixed(2)}`;
  setOhlcStats(latest);
  document.getElementById("liveChart").innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" aria-label="Candlestick stock chart">
      ${gridLines}
      ${verticalMarker}
      ${candleMarkup}
      ${priceLine}
    </svg>
  `;
}

async function fetchDashboard() {
  const query = new URLSearchParams({
    email: state.userEmail,
    search: state.search,
  });
  state.dashboard = await api(`/api/dashboard?${query.toString()}`);
  if (!state.selectedSymbol) {
    state.selectedSymbol = state.dashboard.chart.symbol;
  }
  renderAll();
}

function renderAll() {
  const chartStock =
    state.dashboard.market.find((stock) => stock.symbol === state.selectedSymbol) ||
    state.dashboard.holdings.find((stock) => stock.symbol === state.selectedSymbol) ||
    state.dashboard.watchlist.find((stock) => stock.symbol === state.selectedSymbol) ||
    state.dashboard.market[0] ||
    state.dashboard.holdings[0] ||
    state.dashboard.watchlist[0];

  if (chartStock) {
    state.selectedSymbol = chartStock.symbol;
  }

  document.getElementById("headerTitle").textContent = `${state.dashboard.user.name}'s Trading Desk`;
  renderStats();
  renderWatchlist();
  renderMarket();
  renderHoldings();
  renderHistory();
  renderPerformance();
  renderProfile();
  renderSelectedStock();
  drawChart(chartStock?.history || state.dashboard.chart.points, chartStock?.symbol || state.dashboard.chart.symbol);

  if (chartStock) {
    document.getElementById("chartChange").textContent = `${chartStock.changePercent >= 0 ? "+" : ""}${chartStock.changePercent}%`;
    document.getElementById("chartChange").className = `delta ${chartStock.changePercent >= 0 ? "positive" : "negative"}`;
  }
}

function openTradeModal(symbol, type) {
  state.selectedSymbol = symbol;
  state.selectedTradeType = type;
  document.getElementById("modalTypeLabel").textContent = `${type} Order`;
  document.getElementById("modalTitle").textContent = `${type} ${symbol}`;
  document.getElementById("tradeSymbol").value = symbol;
  document.getElementById("tradeQuantity").value = 1;
  tradeModal.classList.remove("hidden");
}

function closeTradeModal() {
  tradeModal.classList.add("hidden");
}

async function submitTrade(event) {
  event.preventDefault();
  const quantity = Number(document.getElementById("tradeQuantity").value);
  const symbol = document.getElementById("tradeSymbol").value;

  const result = await api("/api/trades", {
    method: "POST",
    body: JSON.stringify({
      email: state.userEmail,
      symbol,
      type: state.selectedTradeType,
      quantity,
    }),
  });

  state.dashboard = result.dashboard;
  closeTradeModal();
  renderAll();
  showToast(result.message);
}

async function saveProfile(event) {
  event.preventDefault();
  const result = await api("/api/profile", {
    method: "PATCH",
    body: JSON.stringify({
      email: state.userEmail,
      riskProfile: document.getElementById("riskProfile").value,
      notifications: document.getElementById("notifications").value,
      preferredMarket: document.getElementById("preferredMarket").value,
    }),
  });

  state.dashboard.user = {
    ...state.dashboard.user,
    riskProfile: result.user.riskProfile,
    notifications: result.user.notifications,
    preferredMarket: result.user.preferredMarket,
  };
  renderProfile();
  showToast(result.message);
}

async function enterDashboard(email) {
  state.userEmail = email;
  await fetchDashboard();
  loginView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
  startLivePolling();
}

function startLivePolling() {
  if (state.liveInterval) {
    clearInterval(state.liveInterval);
  }

  state.liveInterval = setInterval(async () => {
    if (!state.userEmail || !state.selectedSymbol) {
      return;
    }
    try {
      const live = await api(`/api/live/${state.selectedSymbol}`);
      drawChart(live.points, live.symbol);
      document.getElementById("ticketPrice").textContent = formatCurrency(live.price);
      document.getElementById("chartChange").textContent = `${live.changePercent >= 0 ? "+" : ""}${live.changePercent}%`;
      document.getElementById("chartChange").className = `delta ${live.changePercent >= 0 ? "positive" : "negative"}`;
      await fetchDashboard();
    } catch (error) {
      showToast(error.message, true);
    }
  }, 4000);
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    await enterDashboard(email);
    showToast("Logged in successfully.");
  } catch (error) {
    showToast(error.message, true);
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const payload = {
      name: document.getElementById("registerName").value.trim(),
      email: document.getElementById("registerEmail").value.trim(),
      password: document.getElementById("registerPassword").value.trim(),
      preferredMarket: document.getElementById("registerMarket").value.trim(),
    };

    const result = await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    document.getElementById("email").value = payload.email;
    document.getElementById("password").value = payload.password;
    setAuthView("login");
    await enterDashboard(payload.email);
    showToast(result.message);
    registerForm.reset();
    document.getElementById("registerMarket").value = "NASDAQ & NSE";
  } catch (error) {
    showToast(error.message, true);
  }
});

logoutBtn.addEventListener("click", () => {
  state.userEmail = "";
  state.dashboard = null;
  state.selectedSymbol = "";
  if (state.liveInterval) {
    clearInterval(state.liveInterval);
  }
  dashboardView.classList.add("hidden");
  loginView.classList.remove("hidden");
  showToast("Logged out.");
});

stockSearch.addEventListener("input", async (event) => {
  state.search = event.target.value.trim();
  await fetchDashboard();
});

navItems.forEach((item) => {
  item.addEventListener("click", () => setSection(item.dataset.section));
});

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => setAuthView(tab.dataset.authView));
});

closeModalBtn.addEventListener("click", closeTradeModal);
tradeModal.addEventListener("click", (event) => {
  if (event.target === tradeModal) {
    closeTradeModal();
  }
});
tradeForm.addEventListener("submit", (event) => {
  submitTrade(event).catch((error) => showToast(error.message, true));
});
profileForm.addEventListener("submit", (event) => {
  saveProfile(event).catch((error) => showToast(error.message, true));
});

quickBuyBtn.addEventListener("click", () => openTradeModal(state.selectedSymbol, "Buy"));
quickSellBtn.addEventListener("click", () => openTradeModal(state.selectedSymbol, "Sell"));
