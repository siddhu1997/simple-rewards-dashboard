import { transactionsDataComparator } from "../utils/Helpers";
import logger from "../utils/Logger";

export default async () => {
  try {
    const response = await fetch("/data/Transactions.json");
    const data = await response.json();
    return data.sort(transactionsDataComparator);
  } catch (error) {
    logger.error(error.message);
    return [];
  }
};
