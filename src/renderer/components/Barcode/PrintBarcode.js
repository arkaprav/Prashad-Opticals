import Barcode from 'react-barcode';

export default function PrintBarcode({
  brand,
  name,
  code,
  retail_price,
  type,
}) {
  return (
    <div className="barcode">
      <div className="details">
        <h4>{brand}</h4>
        <h5>Rs. {retail_price}</h5>
        <h6>{type}</h6>
      </div>
      <div className="main">
        <p>{name}</p>
        <Barcode width={1} height={40} value={code} />
      </div>
    </div>
  );
}
