import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./DropdownComponent";

const options = ["Option 1", "Option 2", "Option 3"];

describe.only("Dropdown Component", () => {
  it("renders the dropdown button with placeholder", () => {
    render(<Dropdown options={options} onSelect={() => {}} />);
    const button = screen.getByText(/Select an option/i);
    expect(button).toBeInTheDocument();
  });

  it("opens and closes the dropdown menu", () => {
    render(
      <Dropdown
        options={options}
        onSelect={() => {}}
        placeholder="Select an option"
      />
    );
    const button = screen.getByText(/Select an option/i);

    fireEvent.click(button);
    expect(screen.getByText(/Option 1/i)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByRole("dropdown-button")).not.toBeInTheDocument();
  });

  it("selects an option and closes the dropdown", () => {
    const onSelectMock = jest.fn();
    render(<Dropdown options={options} onSelect={onSelectMock} />);
    const button = screen.getByText(/Select an option/i);

    fireEvent.click(button);
    const option = screen.getByText("Option 2");
    fireEvent.click(option);

    expect(onSelectMock).toHaveBeenCalledWith("Option 2");
    expect(screen.queryByRole("dropdown")).not.toBeInTheDocument();
  });

  it("renders with a custom placeholder", () => {
    render(
      <Dropdown
        options={options}
        onSelect={() => {}}
        placeholder="Select an option"
      />
    );
    const button = screen.getByText(/Select an option/i);
    expect(button).toBeInTheDocument();
  });
});
