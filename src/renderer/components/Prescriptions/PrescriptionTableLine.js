import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import PrescriptionLensTable from './PrescriptionLensTable';

export default function PrescriptionTableLine({ prescriptions }) {
  const { ID, createdAt, customerID, lensID, lenstype, prescription } =
    prescriptions;
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
    </tr>
  );
}
