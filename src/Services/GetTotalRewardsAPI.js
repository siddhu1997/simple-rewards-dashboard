import logger from "../utils/Logger";

export default async () => {
  try {
    const response = await fetch("/data/TotalRewards.json");
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error(error.message);
    return [];
  }
};
