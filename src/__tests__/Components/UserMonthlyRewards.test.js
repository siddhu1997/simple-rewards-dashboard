import React from "react";
import { render, screen } from "@testing-library/react";
import UserMonthlyRewardsTable from "../../Components/UserMonthlyRewards";
import mockData from "../../../public/data/UserMonthlyRewards.json";
import { userMonthlyRewardsFormatter } from "../../utils/Helpers";
import { CONSTANTS } from "../../utils/Config";
import "@testing-library/jest-dom";

describe("UserMonthlyRewards Tests", () => {
  test("Displays correct number of tables", () => {
    const data = userMonthlyRewardsFormatter(mockData);
    render(
      <UserMonthlyRewardsTable
        data={data}
        columns={CONSTANTS.USER_MONTHLY_REWARDS_COLUMNS}
      />,
    );

    const tables = screen.getAllByRole("table");
    expect(tables).toHaveLength(3);
  });
});
