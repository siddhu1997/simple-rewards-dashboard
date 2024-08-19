import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(isBetween);
dayjs.extend(advancedFormat);

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
}) => ({
  customerId,
  name,
  purchaseDate: dayjs(timestamp).format("DD/MM/YYYY"),
  price: `$${price.toFixed(2)}`,
  rewards: calculateRewards(price),
});

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
export const userMonthlyRewardsFormatter = (data = [], startDate) => {
  let formattedData = data;
  if (startDate) {
    formattedData = filterDatesInRange(formattedData, startDate);
  }
  return formattedData.reduce((acc, curr) => {
    const month = dayjs(curr.timestamp).format("MMMM YYYY");
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
 * @returns {Number} eligible reward points
 */
const calculateRewards = (price) => {
  const amount = Math.floor(price);
  let rewards = 0;

  if (amount > 100) {
    rewards += (amount - 100) * 2; // 2 points for every dollar over $100
    rewards += 50; // 1 point for every dollar between $50 and $100
  } else if (amount > 50) {
    rewards += (amount - 50) * 1; // 1 point for every dollar between $50 and $100
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
      const reward = calculateRewards(price);
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
    rewards: calculatedRewardsData[customer].rewards,
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

/**
 * Helper method to filter date within 3 month period from reference date.
 *
 * @param {Array<Object>} array - Array of transactions
 * @param {String} array.timestamp - ts of purchase
 * @param {String} referenceDate - Ref start date in YYYY-MM-DD format
 * @returns {Array<Object>}
 */
export const filterDatesInRange = (array, referenceDate) => {
  const startDate = dayjs(referenceDate);
  const endDate = startDate.add(3, "month");

  return array.filter((item) =>
    dayjs(item.timestamp).isBetween(startDate, endDate, "day", "[)"),
  );
};

/**
 * Helper comparator function to sort transactions data in ascending order
 *
 * @param {Object} rec1
 * @param {Object} rec2
 * @returns {Boolean}
 */
export const transactionsDataComparator = (rec1, rec2) =>
  dayjs(rec1.timestamp).diff(dayjs(rec2.timestamp));

export const getThemeClasses = (isDarkMode, otherClasses, invert = false) => {
  let base = otherClasses;
  if (invert) {
    base += ` ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`;
  } else {
    base += ` ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`;
  }
  return base;
};
