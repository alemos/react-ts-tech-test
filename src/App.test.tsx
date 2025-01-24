import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./components/HomePage", () => () => <div>Mock Home Page</div>);
jest.mock("./components/EstablishmentDetail", () => ({
  EstablishmentDetails: () => <div>Mock Establishment Details</div>,
}));

describe("App Component", () => {
  test("renders the HomePage component at the root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Home Page")).toBeInTheDocument();
  });

  test("renders the EstablishmentDetails component at /establishment path", () => {
    render(
      <MemoryRouter initialEntries={["/establishment"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Establishment Details")).toBeInTheDocument();
  });
});
