import React from "react";
import { render, screen } from "@testing-library/react";
import getRewardTable from "../../../Components/HOC/RewardTable";
import Table from "../../../Components/Table";
import { getTotalRewardsAPI } from "../../../Services";
import { totalRewardsFormatter } from "../../../utils/Helpers";
import { CONSTANTS } from "../../../utils/Config";
import "@testing-library/jest-dom";

describe("RewardsTable HOC Tests", () => {
  test("Displays No Data Available when data is not present", () => {
    const WrappedTable = getRewardTable(Table, {
      fetchData: () => null,
      serializer: () => null,
      columns: [],
    });

    render(<WrappedTable />);

    const label = screen.findByLabelText("No data available!");
    expect(label).toBeTruthy();
  });

  test("Renders Total Rewards table without any errors", () => {
    const WrappedTable = getRewardTable(Table, {
      fetchData: getTotalRewardsAPI,
      serializer: totalRewardsFormatter,
      columns: CONSTANTS.TOTAL_REWARDS_COLUMNS,
    });

    render(<WrappedTable />);

    const table = screen.getAllByRole("table");
    expect(table).toHaveLength(1);
  });
});
