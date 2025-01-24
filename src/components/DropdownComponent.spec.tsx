import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./DropdownComponent";

describe("Dropdown Component", () => {
  const mockOptions = ["Option 1", "Option 2", "Option 3"];
  const mockOnSelect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders dropdown button with placeholder", () => {
    render(<Dropdown options={mockOptions} onSelect={mockOnSelect} />);

    const button = screen.getByRole("button", { name: /select an option/i });
    expect(button).toBeInTheDocument();
  });

  test("opens the dropdown menu when the button is clicked", () => {
    render(<Dropdown options={mockOptions} onSelect={mockOnSelect} />);

    const button = screen.getByRole("button", { name: /select an option/i });

    fireEvent.click(button);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  test("closes the dropdown menu when an option is selected", () => {
    render(<Dropdown options={mockOptions} onSelect={mockOnSelect} />);

    const button = screen.getByRole("button", { name: /select an option/i });

    fireEvent.click(button);

    const firstOption = screen.getByText("Option 1");
    fireEvent.click(firstOption);

    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    expect(mockOnSelect).toHaveBeenCalledWith("Option 1");
  });

  test("handles custom placeholder correctly", () => {
    render(
      <Dropdown
        options={mockOptions}
        onSelect={mockOnSelect}
        placeholder="Custom Placeholder"
      />
    );

    const button = screen.getByRole("button", { name: /custom placeholder/i });
    expect(button).toBeInTheDocument();
  });
});
