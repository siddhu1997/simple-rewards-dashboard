import Table from "../Table";
import { generateRandomData } from "../../utils/data";
import { calculateRewards } from "../../utils";

const userMonthlyRewardsFormatter = (data) => {
  return data.map(({ customerId, name, timestamp, price }) => {
    const date = new Date(timestamp);
    return {
      customerId,
      name,
      month: date.toLocaleString("en-US", { month: "long" }),
      year: date.getFullYear(),
      rewards: calculateRewards(price),
    };
  });
};

const Index = () => {
  const columns = ["customerId", "name", "month", "year", "rewards"];
  const data = userMonthlyRewardsFormatter(generateRandomData());

  return <Table columns={columns} data={data} />;
};

export default Index;
