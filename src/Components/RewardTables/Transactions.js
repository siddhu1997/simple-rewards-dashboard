import Table from "../Table";
import { generateRandomData } from "../../utils/data";
import { calculateRewards } from "../../utils";

const userMonthlyRewardsFormatter = (data) => {
  return data.map(
    ({ transactionId, name, price, productPurchased, purchaseDate }) => {
      return {
        transactionId,
        name,
        purchaseDate,
        productPurchased,
        price: `$${price.toFixed(2)}`,
        rewards: calculateRewards(price),
      };
    },
  );
};

const Index = () => {
  const columns = [
    "transactionId",
    "name",
    "purchaseDate",
    "productPurchased",
    "price",
    "rewards",
  ];
  const data = userMonthlyRewardsFormatter(generateRandomData());

  return <Table columns={columns} data={data} />;
};

export default Index;
