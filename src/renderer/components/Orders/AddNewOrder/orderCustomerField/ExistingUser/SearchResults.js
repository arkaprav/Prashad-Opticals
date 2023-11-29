import { useEffect, useState } from 'react';
import { useApp } from '../../../../../context/AppContext';

export default function SearchResults({ handleSelect, searchName }) {
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
  const noCust = <div className="no-search">No Customers Found...</div>;
  let custLine = null;
  if (searchedCustomers.lenght !== 0) {
    custLine = searchedCustomers.map((customer) => {
      return (
        <div
          className="searchLine"
          onClick={() => {
            handleSelect(
              customer.ID,
              `${customer.name}-${customer.mail}-${customer.mobile}`,
            );
          }}
        >
          {customer.name}-{customer.mail}-{customer.mobile}
        </div>
      );
    });
  }
  return (
    <div className="searchResults">
      {searchedCustomers.length !== 0 ? custLine : noCust}
    </div>
  );
}
