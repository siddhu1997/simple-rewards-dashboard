import dayjs from "dayjs";

/**
 * Helper function to serialize UserMonthlyRewards row data
 * @param {Object} param
 * @param {String} param.customerId - customer id
 * @param {String} param.name - customer name
 * @param {String} param.timestamp - ts of purchase
 * @param {Number} param.price - price of the product
 * @returns {Object}
 */
const serializeUserMonthlyRewardsRowData = ({
  customerId,
  name,
  timestamp,
  price,
}) => {
  const date = dayjs(timestamp);
  return {
    customerId,
    name,
    month: date.format("MMMM"), // full name of th e month
    year: date.format("YYYY"),
    rewards: calculateRewards(price),
  };
};

/**
 * Helper function to format API data for UserMonthly Rewards Table
 *
 * @param {Array<Object>} data
 * @param {String} data.customerId - customer id
 * @param {String} data.name - customer name
 * @param {String} data.timestamp - ts of the purchase
 * @param {Number} data.price - purchase amount
 * @returns {Object} - A map with months as keys and array of serialsed elements as values.
 */
export const userMonthlyRewardsFormatter = (data = []) => {
  return data.reduce((acc, curr) => {
    const month = dayjs(curr.timestamp).format("MMMM");
    const serializedData = serializeUserMonthlyRewardsRowData(curr);
    if (acc[month]) {
      acc[month].push(serializedData);
    } else {
      acc[month] = [serializedData];
    }
    return acc;
  }, {});
};

/**
 * Helper function to calculate eligible reward points
 * @param {Number} price - price to consider for reward points
 * @param {Number} precision - Non Zero positive value; 0 means return as such
 * @returns {Number} eligible reward points
 */
const calculateRewards = (price, precision = 2) => {
  const amount = Math.ceil(price);
  let rewards = 0;

  if (amount > 100) {
    rewards += (amount - 100) * 2; // 2 points for every dollar over $100
    rewards += 50; // 1 point for every dollar between $50 and $100
  } else if (amount > 50) {
    rewards += (amount - 50) * 1; // 1 point for every dollar between $50 and $100
  }

  if (precision) {
    rewards.toFixed(precision);
  }

  return rewards;
};

/**
 * Helper function to format Tota Rewards data
 *
 * @param {Array<Object>} data
 * @param {String} data.name - customer name
 * @param {String} data.customerId - customer id,
 * @param {Number} data.price - price of product
 * @returns {Object} - Object containing total eligible rewards mapped to customer
 */
export const totalRewardsFormatter = (data = []) => {
  const calculatedRewardsData = data.reduce(
    (acc, { name, price, customerId }) => {
      const reward = calculateRewards(price, 0);
      if (acc[name]) {
        acc[name].rewards += reward;
      } else {
        acc[name] = {
          rewards: reward,
          customerId,
          name,
        };
      }
      return acc;
    },
    {},
  );

  return Object.keys(calculatedRewardsData).map((customer) => ({
    ...calculatedRewardsData[customer],
    rewards: calculatedRewardsData[customer].rewards.toFixed(2),
  }));
};

/**
 * Helper function to format Transactions table data
 *
 * @param {Array<Object>} data
 * @param {String} data.name - customer name
 * @param {String} data.transactionId - Transaction id
 * @param {String} data.productPurchased - Name of the product
 * @param {String} timestamp - ts of purchase
 * @returns
 */
export const transactionsFormatter = (data = []) => {
  return data.map(
    ({ transactionId, name, price, productPurchased, timestamp }) => ({
      transactionId,
      name,
      purchaseDate: dayjs(timestamp).format("DD/MM/YYYY"),
      price: `$${price.toFixed(2)}`,
      productPurchased,
      rewards: calculateRewards(price),
    }),
  );
};
