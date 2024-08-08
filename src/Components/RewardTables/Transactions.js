import { useState, useEffect } from "react";
import Table from "../Table";
import Shimmer from "../Shimmer";
import { calculateRewards } from "../../utils";
import { fetchMockData } from "../../utils/data";

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
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Improvement: Can convert to custom hook if API endpoint is same.
  useEffect(() => {
    const getData = async () => {
      const apiData = await fetchMockData();
      setData(apiData);
    };
    getData();
    // This batching is intentional to show Shimmer UI
    setIsLoading((_v) => {
      getData();
      return false;
    });
  }, []);

  if (isLoading) {
    return <Shimmer />;
  }

  const columns = [
    "transactionId",
    "name",
    "purchaseDate",
    "productPurchased",
    "price",
    "rewards",
  ];

  const formmatedData = userMonthlyRewardsFormatter(data);
  return <Table columns={columns} data={formmatedData} />;
};

export default Index;
