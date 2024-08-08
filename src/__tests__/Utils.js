import { calculateRewards } from "../utils";

describe("Utils Tests", () => {
   it("Should calculate value for price greater than 100", () => {
     const result = calculateRewards(120);
     expect(result).toBe("90.00");
   });
   it("Should calculate value for price less than 50", () => {
     const result = calculateRewards(44);
     expect(result).toBe("0.00");
   });
});