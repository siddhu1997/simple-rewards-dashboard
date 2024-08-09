import { nanoid } from "nanoid";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

export function generateRandomData() {
  const names = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Chris Evans",
    "Emma Watson",
    "Olivia Brown",
    "Liam Johnson",
    "Sophia Davis",
    "Isabella Miller",
    "Noah Wilson",
    "Mason Taylor",
    "Logan Moore",
    "Ava White",
    "James Anderson",
    "Lucas Thompson",
    "Ethan Clark",
    "Amelia Rodriguez",
    "Mia Martinez",
    "Charlotte Lee",
    "Michael Harris",
  ];

  const products = [
    "Food voucher Elite",
    "Uber coupon",
    "BookMyShow voucher",
    "Amazon Gift Card",
    "Nykaa",
    "Flipkart Voucher",
    "Food voucher Classic",
  ];

  const data = [];

  for (let i = 1; i <= 20; i++) {
    const randomName = names[getRandomInt(names.length)];
    const randomProduct = products[getRandomInt(products.length)];
    const randomTimestamp = getRandomDate(
      new Date(2022, 0, 1),
      new Date(2024, 11, 31),
    );
    const randomPurchaseDate = getRandomDate(
      new Date(2023, 0, 1),
      new Date(2024, 11, 31),
    );
    const randomPrice = getRandomFloat(5, 100);

    data.push({
      transactionId: nanoid(7),
      customerId: i,
      name: randomName,
      timestamp: randomTimestamp.toISOString(),
      purchaseDate: randomPurchaseDate.toISOString(),
      productPurchased: randomProduct,
      price: parseFloat(randomPrice),
    });
  }

  return data;
}

export const fetchMockData = ({ year }) => {
  const start = Date.now();
  while (Date.now() - start < 300) {
    continue;
  }
  return new Promise((resolve) => {
    let data = generateRandomData();
    if (year === "all") {
      data = data.sort((a, b) => a.timestamp - b.timestamp);
    } else if (year) {
      data = data.filter(({ timestamp }) => {
        const currYear = new Date(timestamp).getFullYear().toString();
        return currYear === year;
      });
    }
    resolve(data);
  });
};
