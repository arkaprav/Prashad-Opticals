import { useState, useEffect } from 'react';
import LensTableLine from './LensTableLine';
import { useApp } from '../../../context/AppContext';

export default function LensTable({ searchName }) {
  const { lens } = useApp();
  const [searchedLens, setSearchedLens] = useState(lens);
  useEffect(() => {
    if (searchName !== '') {
      setSearchedLens(
        lens.filter((len) => {
          return (
            len.code.toLowerCase().includes(searchName.toLowerCase()) ||
            len.name.toLowerCase().includes(searchName.toLowerCase()) ||
            len.brand.toLowerCase().includes(searchName.toLowerCase())
          );
        }),
      );
    } else {
      setSearchedLens(lens);
    }
  }, [searchName, lens]);
  const noProd = <div className="no-prod">No Products Found...</div>;
  let LensOut;
  if (searchedLens.length !== 0) {
    LensOut = searchedLens.map((len) => {
      return <LensTableLine len={len} />;
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
