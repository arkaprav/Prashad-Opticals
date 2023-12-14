import { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import ContactLensTableLine from './ContactLensTableLine';

export default function ContactLensTable({ searchName }) {
  const { contactLens } = useApp();
  const [searchedLens, setSearchedLens] = useState(contactLens);
  useEffect(() => {
    if (searchName !== '') {
      setSearchedLens(
        contactLens.filter((len) => {
          return (
            len.code.toLowerCase().includes(searchName.toLowerCase()) ||
            len.name.toLowerCase().includes(searchName.toLowerCase()) ||
            len.brand.toLowerCase().includes(searchName.toLowerCase())
          );
        }),
      );
    } else {
      setSearchedLens(contactLens);
    }
  }, [searchName, contactLens]);
  const noProd = <div className="no-prod">No Products Found...</div>;
  let LensOut;
  if (searchedLens.length !== 0) {
    LensOut = searchedLens.map((len) => {
      return <ContactLensTableLine len={len} />;
    });
  }
  return (
    <div className="products">
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Details</th>
            <th>Price</th>
            <th>HSN Code</th>
            <th>inventory</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{LensOut}</tbody>
      </table>
      {searchedLens.length === 0 && noProd}
    </div>
  );
}
