import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings } from "../api/ratingsAPI";
import Dropdown from "./DropdownComponent";
import "./PaginatedEstablishmentsTable.css";

const tableStyle = {
  background: "#82C7AF",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
  minHeight: "400px",
  minWidth: "550px",
};

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  const [establishments, setEstablishments] = useState<
    { [key: string]: string }[]
  >([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);

  const dropdownOptions: any[] = ["Option 1", "Option 2", "Option 3"];

  useEffect(() => {
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setEstablishments(result?.establishments);
      },
      (error) => {
        setError(error);
      }
    );
    console.log("establishments", establishments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // remove 'establishments' and console.log
  }, []);

  async function handlePreviousPage() {
    setEstablishments([]);
    pageNum > 1 && setPageNum(pageNum - 1);
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setEstablishments(result.establishments);
      },
      (error) => {
        setError(error);
      }
    );
  }

  async function handleNextPage() {
    setEstablishments([]);
    pageNum < pageCount && setPageNum(pageNum + 1);
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setEstablishments(result.establishments);
      },
      (error) => {
        setError(error);
      }
    );
  }

  const selectDropdownOption = (option: string) => {
    console.log("selectDropdownOption", option);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <div>
          <h2>Food Hygiene Ratings</h2>
          <Dropdown options={dropdownOptions} onSelect={selectDropdownOption} />
        </div>
        {establishments?.length ? (
          <EstablishmentsTable establishments={establishments} />
        ) : (
          <div className="loading">LOADING</div>
        )}
        <EstablishmentsTableNavigation
          pageNum={pageNum}
          pageCount={pageCount}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    );
  }
};
