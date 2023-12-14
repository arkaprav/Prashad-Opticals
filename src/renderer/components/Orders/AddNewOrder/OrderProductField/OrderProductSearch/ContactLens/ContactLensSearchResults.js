import { useEffect, useState } from 'react';
import { useApp } from '../../../../../../context/AppContext';

export default function ContactLensSearchResults({ handleSelect, searchName }) {
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
  }, [searchName]);
  const noLens = <div className="no-search">No Contact Lens Found...</div>;
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
              len.retail_price,
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
