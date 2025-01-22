import React from "react";
import { Link, useLocation } from "react-router-dom";

const detailStyle = {
  color: "white",
};
export const EstablishmentDetails: React.FC<any> = ({ obj }: any) => {
  const location = useLocation();
  const establishment = location.state;

  return (
    <div style={detailStyle}>
      <h1>Hello!</h1>
      <p>BusinessName - {establishment.BusinessName}</p>
      <p>AddressLine3 - {establishment.AddressLine3}</p>
      <p>BusinessType - {establishment.BusinessType}</p>
      <p>LocalAuthorityName - {establishment.LocalAuthorityName}</p>
      <p>PostCode - {establishment.PostCode}</p>
      <Link to="/">
        <button>Home</button>
      </Link>
      ;
    </div>
  );
};
