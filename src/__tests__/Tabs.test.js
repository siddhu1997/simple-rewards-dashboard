import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RewardsTabs from "../Components/RewardsTabs";
import "@testing-library/jest-dom";

jest.mock("../Components/RewardTables/UserMonthlyRewards", () => () => (
  <div>User Monthly Rewards Content</div>
));
jest.mock("../Components/RewardTables/TotalRewards", () => () => (
  <div>Total Rewards Content</div>
));
jest.mock("../Components/RewardTables/Transactions", () => () => (
  <div>Transactions Content</div>
));

describe.skip("Tabs Component", () => {
  it("renders the User Monthly Rewards tab by default", () => {
    render(<RewardsTabs />);
    expect(
      screen.getByText("User Monthly Rewards Content"),
    ).toBeInTheDocument();
  });

  it("switches to Total Rewards tab", () => {
    render(<RewardsTabs />);
    fireEvent.click(screen.getByText("Total Rewards"));
    expect(screen.getByText("Total Rewards Content")).toBeInTheDocument();
  });

  it("switches to Transactions tab", () => {
    render(<RewardsTabs />);
    fireEvent.click(screen.getByText("Transactions"));
    expect(screen.getByText("Transactions Content")).toBeInTheDocument();
  });
});
