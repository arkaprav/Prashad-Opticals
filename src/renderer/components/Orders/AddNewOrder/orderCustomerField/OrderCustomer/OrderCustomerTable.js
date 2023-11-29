import { useEffect, useState } from 'react';
import { useApp } from '../../../../../context/AppContext';

export default function OrderCustomerTable({ customerID }) {
  const { customers } = useApp();
  const [orderCustomer, setOrderCustomer] = useState(
    customers.filter((customer) => {
      return customer.ID === customerID;
    }),
  );
  useEffect(() => {
    setOrderCustomer(
      customers.filter((customer) => {
        return customer.ID === customerID;
      })[0],
    );
  }, [customerID]);
  return (
    <div className="products">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderCustomer.name}</td>
            <td>{orderCustomer.address}</td>
            <td>{orderCustomer.mail}</td>
            <td>{orderCustomer.mobile}</td>
            <td>{orderCustomer.orders}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
