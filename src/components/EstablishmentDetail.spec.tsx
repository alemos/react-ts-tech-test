import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EstablishmentDetails } from "./EstablishmentDetail";

describe("EstablishmentDetails Component", () => {
  it("renders establishment details correctly", () => {
    const establishment = {
      BusinessName: "Restaurant A",
      AddressLine3: "123 Main St",
      BusinessType: "Restaurant",
      LocalAuthorityName: "City Hall",
      PostCode: "12345",
    };

    render(
      <MemoryRouter initialEntries={["/establishment"]}>
        <EstablishmentDetails obj={{ state: establishment }} />
      </MemoryRouter>
    );

    expect(screen.getByText("Hello!")).toBeInTheDocument();
    expect(
      screen.getByText(`BusinessName - ${establishment.BusinessName}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`AddressLine3 - ${establishment.AddressLine3}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`BusinessType - ${establishment.BusinessType}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `LocalAuthorityName - ${establishment.LocalAuthorityName}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`PostCode - ${establishment.PostCode}`)
    ).toBeInTheDocument();
  });

  it("renders a link to the homepage", () => {
    render(
      <MemoryRouter initialEntries={["/establishment"]}>
        <EstablishmentDetails obj={{ state: {} }} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Home/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
