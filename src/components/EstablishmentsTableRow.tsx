import "./EstablishmentsTableRow.css";

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
  selectEstablishment: (selectEstablishment: any) => void;
}> = ({ establishment, selectEstablishment }) => {
  return (
    <div className="establishments-row">
      <td onClick={() => selectEstablishment(establishment)}>
        {establishment?.BusinessName}
      </td>
      <td>{establishment?.RatingValue}</td>
    </div>
  );
};
