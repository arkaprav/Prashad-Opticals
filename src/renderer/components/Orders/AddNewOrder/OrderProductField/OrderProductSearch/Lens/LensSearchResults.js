import { useEffect, useState } from 'react';
import { useApp } from '../../../../../../context/AppContext';

export default function LensSearchResults({ handleSelect, searchName }) {
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
  }, [searchName]);
  const noLens = <div className="no-search">No Lens Found...</div>;
  let lensLine = null;
  if (searchedLens.lenght !== 0) {
    lensLine = searchedLens.map((len) => {
      return len.inventory === 0 ? (
        <div className="searchLine" style={{ cursor: 'default' }}>
          {len.code}-{len.name}-{len.brand}({len.inventory})
        </div>
      ) : (
        <div
          className="searchLine"
          onClick={() => {
            handleSelect(
              len.ID,
              `${len.code}-${len.name}-${len.brand}`,
              len.discount_price,
            );
          }}
        >
          {len.code}-{len.name}-{len.brand}({len.inventory})
        </div>
      );
    });
  }
  return (
    <div className="searchResults">
      {searchedLens.length !== 0 ? lensLine : noLens}
    </div>
  );
}
