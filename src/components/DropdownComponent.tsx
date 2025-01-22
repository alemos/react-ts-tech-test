import React, { useState } from "react";
import "./DropdownComponent.css";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        {placeholder}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
