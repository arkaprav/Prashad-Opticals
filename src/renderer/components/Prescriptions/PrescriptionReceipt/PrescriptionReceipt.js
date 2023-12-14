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
  const { customers, lens, contactLens } = useApp();
  const [patient, setPatient] = useState([]);
  const [products, setProducts] = useState([]);
  let { name, address, mail, mobile } = {
    name: null,
    address: null,
    mail: null,
    mobile: null,
  };
  useEffect(() => {
    let cust;
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].ID === customerID) {
        cust = customers[i];
      }
    }
    setPatient(cust);
    if (lenstype === 'Lens'){
      setProducts(
        lens.filter((len) => {
          return len.ID === lensID;
        }),
      );
    }
    if (lenstype === 'ContactLens'){
      setProducts(
        contactLens.filter((len) => {
          return len.ID === lensID;
        }),
      );
    }
  }, [customerID, lensID, lenstype]);
  let prescriptionTable = null;
  if (lenstype === 'Lens') {
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
    prescriptionTable = (
      <>
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
      </>
    );
  }
  if (lenstype === 'ContactLens') {
    console.log(lenstype === 'ContactLens');
    const {
      rightDistSph,
      rightDistCyl,
      rightDistAxis,
      leftDistSph,
      leftDistCyl,
      leftDistAxis,
      rightNearSph,
      rightNearCyl,
      rightNearAxis,
      leftNearSph,
      leftNearCyl,
      leftNearAxis,
      AddRight,
      AddLeft,
    } = JSON.parse(prescription);
    prescriptionTable = (
      <>
        <table>
          <thead>
            <tr>
              <th>Eyes</th>
              <th>Dist Sph</th>
              <th>Dist Cyl</th>
              <th>Dist Axis</th>
              <th>Near Sph</th>
              <th>Near Cyl</th>
              <th>Near Axis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Right</td>
              <td>{rightDistSph}</td>
              <td>{rightDistCyl}</td>
              <td>{rightDistAxis}</td>
              <td>{rightNearSph}</td>
              <td>{rightNearCyl}</td>
              <td>{rightNearAxis}</td>
            </tr>
            <tr>
              <td>Left</td>
              <td>{leftDistSph}</td>
              <td>{leftDistCyl}</td>
              <td>{leftDistAxis}</td>
              <td>{leftNearSph}</td>
              <td>{leftNearCyl}</td>
              <td>{leftNearAxis}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Add Right</th>
              <th>Add Left</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{AddLeft}</td>
              <td>{AddRight}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
  if (patient !== []) {
    name = patient.name;
    address = patient.address;
    mail = patient.mail;
    mobile = patient.mobile;
  }
  const [prodOut] = products.map((prod) => {
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
      <div className="pid">
        <h1>Prasad Opticals</h1>
      </div>
      <div className="pid">
        Kaman Singh Ramu damu Path, district hospital road,{' '}
      </div>
      <div className="pid">beside Eden Dham Temple Darjeeling 734101</div>
      <div className="pid">mobile - 753988074</div>
      <br />
      <br />
      <br />
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
        {prescriptionTable}
      </div>
      <div className="signatures">
        <div>Doctor&apos;s Signature</div>
        <div>Optometrist&apos;s Signature</div>
      </div>
    </div>
  );
}
