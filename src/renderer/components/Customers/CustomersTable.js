import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import CustomerTableLine from './CustomerTableLine';

export default function CustomersTable({ searchName }) {
  const { customers } = useApp();
  const [searchedCustomers, setSearchedCustomers] = useState(customers);
  useEffect(() => {
    if (searchName !== '') {
      setSearchedCustomers(
        customers.filter((customer) => {
          return (
            customer.name.toLowerCase().includes(searchName.toLowerCase()) ||
            customer.mail.toLowerCase().includes(searchName.toLowerCase()) ||
            customer.mobile.toLowerCase().includes(searchName.toLowerCase())
          );
        }),
      );
    } else {
      setSearchedCustomers(customers);
    }
  }, [searchName]);

  const noCust = <div className="no-prod">No Customers Found...</div>;
  let customerTB;
  if (searchedCustomers.length !== 0) {
    customerTB = searchedCustomers.map((customer) => {
      return <CustomerTableLine customer={customer} />;
    });
  }

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
        <tbody>{searchedCustomers.length !== 0 && customerTB}</tbody>
      </table>
      {searchedCustomers.length === 0 && noCust}
    </div>
  );
}
