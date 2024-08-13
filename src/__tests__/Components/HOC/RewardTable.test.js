import React from "react";
import { render, screen } from "@testing-library/react";
import getRewardTable from "../../../Components/HOC/RewardTable";
import Table from "../../../Components/Table";
import { totalRewardsFormatter } from "../../../utils/Helpers";
import { CONSTANTS } from "../../../utils/Config";
import transactionsData from "../../../../public/data/Transactions.json";
import "@testing-library/jest-dom";

describe("RewardsTable HOC Tests", () => {
  test("Displays No Data Available when data is not present", () => {
    const WrappedTable = getRewardTable(Table, {
      serializer: () => [],
      columns: [],
    });

    render(<WrappedTable data={[]} />);

    const label = screen.findByLabelText("No data available!");
    expect(label).toBeTruthy();
  });

  test("Renders Total Rewards table without any errors", () => {
    const WrappedTable = getRewardTable(Table, {
      serializer: totalRewardsFormatter,
      columns: CONSTANTS.TOTAL_REWARDS_COLUMNS,
    });

    render(<WrappedTable data={transactionsData} />);

    const table = screen.getAllByRole("table");
    expect(table).toHaveLength(1);
  });
});
