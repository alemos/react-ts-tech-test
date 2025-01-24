import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { EstablishmentDetails } from "./EstablishmentDetail";
import userEvent from "@testing-library/user-event";

const mockedUsedNavigate = jest.fn();
const mockedMemoryRouter = jest.fn();

jest.doMock("react-router-dom", () => ({
  ...jest.requireMock("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  MemoryRouter: () => mockedMemoryRouter,
}));

const mockLocationState = {
  state: {
    BusinessName: "Test Business",
    AddressLine3: "123 Test Street",
    BusinessType: "Retail",
    LocalAuthorityName: "Test Authority",
    PostCode: "AB12 3CD",
  },
};

describe("EstablishmentDetails Component", () => {
  test("renders the establishment details correctly", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/details", ...mockLocationState }]}
      >
        <Routes>
          <Route path="/details" element={<EstablishmentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Hello!")).toBeInTheDocument();
    expect(
      screen.getByText("BusinessName - Test Business")
    ).toBeInTheDocument();
    expect(
      screen.getByText("AddressLine3 - 123 Test Street")
    ).toBeInTheDocument();
    expect(screen.getByText("BusinessType - Retail")).toBeInTheDocument();
    expect(
      screen.getByText("LocalAuthorityName - Test Authority")
    ).toBeInTheDocument();
    expect(screen.getByText("PostCode - AB12 3CD")).toBeInTheDocument();

    const homeButton = screen.getByRole("button", { name: "Home" });
    expect(homeButton).toBeInTheDocument();
  });

  test("navigates back to the home page when the Home button is clicked", async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/details", ...mockLocationState }]}
      >
        <Routes>
          <Route path="/details" element={<EstablishmentDetails />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const homeButton = screen.getByRole("button", { name: "Home" });
    await userEvent.click(homeButton);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
