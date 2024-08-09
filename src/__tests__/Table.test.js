import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "../Components/Table";
import "@testing-library/jest-dom";

describe("Table Component", () => {
  const columns = [
    { name: "Transaction ID", value: "transactionId" },
    { name: "Customer Name", value: "name" },
    { name: "Purchase Date", value: "purchaseDate" },
    { name: "Product", value: "productPurchased" },
    { name: "Price", value: "price" },
    { name: "Rewards", value: "rewards" },
  ];
  const data = [
    {
      transactionId: 1,
      name: "John Doe",
      purchaseDate: "2023-05-21",
      productPurchased: "Amazon Gift Card",
      price: "$29.99",
      rewards: 50,
    },
    {
      transactionId: 2,
      name: "Jane Smith",
      purchaseDate: "2023-06-11",
      productPurchased: "Uber coupon",
      price: "$15.50",
      rewards: 20,
    },
  ];

  test("renders table headers correctly", () => {
    render(<Table columns={columns} data={data} />);
    columns.forEach((column) => {
      expect(screen.getByText(column.name)).toBeInTheDocument();
    });
  });

  test("renders table data correctly", () => {
    render(<Table columns={columns} data={data} />);
    data.forEach((row) => {
      Object.values(row).forEach((cell) => {
        expect(screen.getByText(cell)).toBeInTheDocument();
      });
    });
  });
});
