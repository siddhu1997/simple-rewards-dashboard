import { useState, useEffect } from "react";
import Table from "../Table";
import Shimmer from "../Shimmer";
import { calculateRewards } from "../../utils";
import { fetchMockData } from "../../utils/data";

const transactionsFormatter = (data = []) => {
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
      const apiData = await fetchMockData({});
      setData(apiData);
    };
    // This batching is intentional to show Shimmer UI
    setIsLoading((_v) => {
      getData();
      return false;
    });
  }, []);

  const columns = [
    { name: "Transaction ID", value: "transactionId" },
    { name: "Customer Name", value: "name" },
    { name: "Purchase Date", value: "purchaseDate" },
    { name: "Product", value: "productPurchased" },
    { name: "Price", value: "price" },
    { name: "Rewards", value: "rewards" },
  ];

  if (isLoading) {
    return <Shimmer columns={columns.length} />;
  }

  const formmatedData = transactionsFormatter(data);
  return <Table columns={columns} data={formmatedData} />;
};

export default Index;
