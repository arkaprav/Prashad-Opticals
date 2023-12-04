import Layout from '../components/Layout';
import PrescriptionTableLine from '../components/Prescriptions/PrescriptionTableLine';
import { useApp } from '../context/AppContext';

export default function Prescriptions() {
  const { prescriptions } = useApp();
  const prescriptTB = prescriptions.map((prescription) => {
    return <PrescriptionTableLine prescriptions={prescription} />;
  });
  return (
    <Layout>
      <div className="products">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>CreatedAt</th>
              <th>Patient Details</th>
              <th>Lens Details</th>
              <th>Prescription</th>
            </tr>
          </thead>
          <tbody>{prescriptTB}</tbody>
        </table>
      </div>
    </Layout>
  );
}
