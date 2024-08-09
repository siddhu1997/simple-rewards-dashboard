export const CONSTANTS = {
  LOG_LEVEL: process.env.REACT_APP_APP_ENV === "production" ? "warn" : "log",
  ROWS_PER_PAGE: 5,
  USER_MONTHLY_REWARDS_COLUMNS: [
    { name: "Customer ID", value: "customerId" },
    { name: "Name", value: "name" },
    { name: "Month", value: "month" },
    { name: "Year", value: "year" },
    { name: "Rewards", value: "rewards" },
  ],
  TOTAL_REWARDS_COLUMNS: [
    { name: "Customer ID", value: "customerId" },
    { name: "Customer Name", value: "name" },
    { name: "Rewards", value: "rewards" },
  ],
  TRANSACTIONS_COLUMNS: [
    { name: "Transaction ID", value: "transactionId" },
    { name: "Customer Name", value: "name" },
    { name: "Purchase Date", value: "purchaseDate" },
    { name: "Product", value: "productPurchased" },
    { name: "Price", value: "price" },
    { name: "Rewards", value: "rewards" },
  ],
};
