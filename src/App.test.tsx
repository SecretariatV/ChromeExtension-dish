import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

const renderApp = () => render(<App />);

it("renders learn react link", () => {
  renderApp();
  const button = screen.getByText(/view full recipe/i);
  //@ts-ignore
  expect(button).toBeTruthy();
});
