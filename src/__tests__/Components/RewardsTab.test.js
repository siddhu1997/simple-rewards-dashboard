import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RewardTabs from "../../Components/RewardTabs";
import userMonthlyRewardsData from "../../../public/data/UserMonthlyRewards.json";
import "@testing-library/jest-dom";

describe("RewardTabs Tests", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(userMonthlyRewardsData),
      }),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Should render User Monthly Rewards Table initially", async () => {
    render(<RewardTabs />);

    await waitFor(() => {
      const tables = screen.getAllByRole("table");
      expect(tables).toHaveLength(3);
    });
  });

  test("Should render Total Rewards table when 2nd tab is selected", async () => {
    render(<RewardTabs />);

    fireEvent.click(screen.getByText("Total Rewards"));

    await waitFor(() => {
      expect(screen.getByText("Customer ID")).toBeInTheDocument();
    });
  });
});
