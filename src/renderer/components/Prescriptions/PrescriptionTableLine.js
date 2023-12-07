import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import PrescriptionLensTable from './PrescriptionLensTable';
import PrescriptionReceipt from './PrescriptionReceipt/PrescriptionReceipt';
import ReactToPrint from 'react-to-print';

export default function PrescriptionTableLine({ prescriptions }) {
  const { ID, createdAt, customerID, lensID, lenstype, prescription } =
    prescriptions;
  const ref = useRef();
  const { customers, lens } = useApp();
  const [patient, setPatient] = useState('');
  const [lensD, setLensD] = useState('');
  useEffect(() => {
    setPatient(
      customers.map((customer) => {
        if (customer.ID === customerID) {
          return (
            <>
              {customer.name} <br /> {customer.mail} <br /> {customer.mobile}
            </>
          );
        }
      }),
    );
    if (lenstype === 'Lens') {
      setLensD(
        lens.map((len) => {
          if (len.ID === lensID) {
            return (
              <>
                {len.name} <br /> {len.brand} <br /> {len.code}
              </>
            );
          }
        }),
      );
    }
  }, [customerID, lensID, lenstype]);
  return (
    <tr>
      <td>{ID}</td>
      <td>{createdAt}</td>
      <td>{patient}</td>
      <td>{lensD}</td>
      <td>
        {lenstype === 'Lens' && (
          <PrescriptionLensTable prescription={prescription} />
        )}
      </td>
      <td>
        <div style={{ display: 'none' }}>
          <div ref={ref}>
            <PrescriptionReceipt
              ID={ID}
              createdAt={createdAt}
              customerID={customerID}
              lensID={lensID}
              lenstype={lenstype}
              prescription={prescription}
            />
          </div>
        </div>
        <ReactToPrint
          trigger={() => <button>Prescription</button>}
          content={() => ref.current}
        />
      </td>
    </tr>
  );
}
