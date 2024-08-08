import Table from "../Table";
import { generateRandomData } from "../../utils/data";
import { calculateRewards } from "../../utils";

const userMonthlyRewardsFormatter = (data) => {
  return data.map(({ name, price }) => {
    return {
      name,
      rewards: calculateRewards(price),
    };
  });
};

const Index = () => {
  const columns = ["name", "rewards"];
  const data = userMonthlyRewardsFormatter(generateRandomData());

  return <Table columns={columns} data={data} />;
};

export default Index;
