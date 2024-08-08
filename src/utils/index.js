export const calculateRewards = (price) => {
  const amount = Math.ceil(price);
  let rewards = 0;

  if (amount > 100) {
    rewards += (amount - 100) * 2; // 2 points for every dollar over $100
    rewards += 50; // 1 point for every dollar between $50 and $100
  } else if (amount > 50) {
    rewards += (amount - 50) * 1; // 1 point for every dollar between $50 and $100
  }

  return rewards.toFixed(2);
};
