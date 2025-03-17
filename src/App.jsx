
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "YOUR_API_KEY"; // Replace with your Finnhub API key

const StockTracker = () => {
  const [symbol, setSymbol] = useState("AAPL"); // Default stock symbol
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStockData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );
      setStockData(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStockData();
  }, [symbol]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>NYSE & NASDAQ Stock Tracker</h1>
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., TSLA, AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      />
      <button onClick={fetchStockData}>Get Price</button>

      {loading && <p>Loading...</p>}

      {stockData && (
        <div>
          <h2>{symbol} Stock Data</h2>
          <p>Open: ${stockData.o}</p>
          <p>High: ${stockData.h}</p>
          <p>Low: ${stockData.l}</p>
          <p>Current Price: ${stockData.c}</p>
        </div>
      )}
    </div>
  );
};

export default StockTracker;
