import { useEffect, useState } from 'react';
import { useApp } from '../../../context/AppContext';

export default function PrescriptionReceipt({
  ID,
  createdAt,
  customerID,
  lensID,
  lenstype,
  prescription,
}) {
  const { customers, lens } = useApp();
  const [patient, setPatient] = useState([]);
  const [products, setProducts] = useState([]);
  const {
    rightSph,
    rightCyl,
    rightAxis,
    rightPD,
    rightVA,
    rightPrism,
    leftSph,
    leftCyl,
    leftAxis,
    leftPD,
    leftVA,
    leftPrism,
    nearAddRight,
    nearAddLeft,
    IPD,
  } = JSON.parse(prescription);
  useEffect(() => {
    setPatient(
      customers.filter((cust) => {
        return cust.ID === customerID;
      }),
    );
    setProducts(
      lens.filter((len) => {
        return len.ID === lensID;
      }),
    );
  }, [customerID, lensID]);
  const { name, address, mail, mobile } = patient[0];
  const prodOut = products.map((prod) => {
    return (
      <tr>
        <td>{prod.code}</td>
        <td>{prod.name}</td>
        <td>{prod.brand}</td>
        <td>{lenstype}</td>
      </tr>
    );
  });
  return (
    <div className="background">
      <div className="pid">Prescription ID: {ID}</div>
      <div className="top">
        <div className="customer">
          <p>
            <span>Name:</span> <span>{name}</span>
          </p>
          <p>
            <span>Address:</span> <span>{address}</span>
          </p>
          <p>
            <span>Email:</span> <span>{mail}</span>
          </p>
          <p>
            <span>Phone:</span> <span>{mobile}</span>
          </p>
        </div>
        <div className="other">
          <p>
            <span>Date: </span> <span>{createdAt}</span>
          </p>
        </div>
      </div>
      <div className="order-product">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>{prodOut}</tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Eyes</th>
              <th>Sph</th>
              <th>Cyl</th>
              <th>Axis</th>
              <th>PD</th>
              <th>VA</th>
              <th>Prism</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Right</td>
              <td>{rightSph}</td>
              <td>{rightCyl}</td>
              <td>{rightAxis}</td>
              <td>{rightPD}</td>
              <td>{rightVA}</td>
              <td>{rightPrism}</td>
            </tr>
            <tr>
              <td>Left</td>
              <td>{leftSph}</td>
              <td>{leftCyl}</td>
              <td>{leftAxis}</td>
              <td>{leftPD}</td>
              <td>{leftVA}</td>
              <td>{leftPrism}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Near Add Right</th>
              <th>Near Add Left</th>
              <th>IPD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{nearAddLeft}</td>
              <td>{nearAddRight}</td>
              <td>{IPD}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
