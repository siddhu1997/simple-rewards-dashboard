import React from "react";
import { render, screen } from "@testing-library/react";
import Shimmer from "../../Components/Shimmer";
import "@testing-library/jest-dom";

describe("Shimmer Tests", () => {
  test("Should render Shimmer table without any errors", () => {
    render(<Shimmer />);

    const table = screen.getAllByRole("table");
    expect(table).toHaveLength(1);
  });
});
