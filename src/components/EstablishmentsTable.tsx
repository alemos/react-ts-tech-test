import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";
import "./EstablishmentsTable.css";
import { getEstablishmentDetails } from "../api/ratingsAPI";
import { useNavigate } from "react-router-dom";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
  establishments: { [key: string]: any }[] | null | undefined;
}> = ({ establishments }) => {
  const navigate = useNavigate();
  const onSelect = (establishment: any) => {

    const url: string = establishment.links[0].href || "";
    // console.log("select selectEstablishment", establishment, "url", url);
    getEstablishmentDetails(url).then(
      (result) => {
        if (result) {
          navigate("/establishment", { state: result });
        }
      },
      (error) => {
        console.log("error", error);
        // setError(error);
      }
    );
  };

  return (
    <table>
      <tbody>
        <tr>
          <th style={headerStyle}>Business Name</th>
          <th style={headerStyle}>Rating Value</th>
        </tr>
        <div className="loaded-table">
          {establishments &&
            establishments?.map(
              (
                establishment: { [key: string]: string } | null | undefined,
                index: React.Key | null | undefined
              ) => (
                <EstablishmentsTableRow
                  key={index}
                  establishment={establishment}
                  selectEstablishment={onSelect}
                />
              )
            )}
        </div>
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
};
