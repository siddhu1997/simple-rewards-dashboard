import "@testing-library/jest-dom";
import {
  userMonthlyRewardsFormatter,
  totalRewardsFormatter,
  transactionsFormatter,
} from "../../utils/Helpers";

describe("Helpers Tests", () => {
  describe("Tests for userMonthlyRewardsFormatter", () => {
    test("Should return object with months as keys and transactions array as value", () => {
      const input = [
        {
          customerId: "123",
          name: "Jon Doe",
          timestamp: "2024-07-01",
          price: 120,
        },
      ];
      const expectedResult = {
        July: [
          {
            customerId: "123",
            name: "Jon Doe",
            month: "July",
            year: "2024",
            rewards: 90,
          },
        ],
      };
      expect(userMonthlyRewardsFormatter(input)).toEqual(expectedResult);
    });
  });

  describe("Tests for totalRewardsFormatter", () => {
    test("Should return an array of formatted data", () => {
      const input = [
        {
          customerId: "123",
          name: "John Doe",
          timestamp: "2024-07-01",
          price: 120,
        },
        {
          customerId: "123",
          name: "John Doe",
          timestamp: "2024-07-02",
          price: 120,
        },
      ];
      const expectedResult = [
        {
          name: "John Doe",
          customerId: "123",
          rewards: "180.00",
        },
      ];
      expect(totalRewardsFormatter(input)).toEqual(expectedResult);
    });
  });

  describe("Tests for transactionsFormatter", () => {
    test("Should return an array of formatted data", () => {
      const input = [
        {
          transactionId: "123",
          name: "John Doe",
          productPurchased: "Amazon Voucher",
          timestamp: "2024-07-01",
          price: 120,
        },
      ];
      const expectedResult = [
        {
          transactionId: "123",
          productPurchased: "Amazon Voucher",
          price: "$120.00",
          purchaseDate: "01/07/2024",
          name: "John Doe",
          rewards: 90,
        },
      ];
      expect(transactionsFormatter(input)).toEqual(expectedResult);
    });
  });
});
