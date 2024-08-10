import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../Components/Header";
import "@testing-library/jest-dom";

describe("Header Tests", () => {
  test("Should render Header without any error", () => {
    render(<Header />);
    expect(screen.findByLabelText("Rewards Dashboard")).toBeTruthy();
  });
});
