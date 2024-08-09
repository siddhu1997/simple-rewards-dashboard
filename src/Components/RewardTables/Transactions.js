import { useState, useEffect } from "react";
import Table from "../Table";
import Shimmer from "../Shimmer";
import { transactionsFormatter } from "../../utils/Helpers";
import getTransactionsAPI from "../../Services/GetTransactionsAPI";

const Index = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Improvement: Can convert to custom hook if API endpoint is same.
  useEffect(() => {
    const getData = async () => {
      const apiData = await getTransactionsAPI();
      setData(transactionsFormatter(apiData));
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

  if (!isLoading && !data?.length) {
    return <h1>No data available!</h1>;
  }

  return <Table columns={columns} data={data} />;
};

export default Index;
