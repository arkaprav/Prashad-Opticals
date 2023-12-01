import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect, useState } from 'react';
import LensSearchResults from './LensSearchResults';

export default function LensSearchField({ handleAddLens }) {
  const [searchName, setSearchName] = useState('');
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  const [tempProdId, setTempProdId] = useState(0);
  const [tempProdPrice, setTempProdPrice] = useState(0);
  useEffect(() => {
    enable(true);
  }, [parent]);

  const handleAdd = () => {
    handleAddLens(tempProdId, tempProdPrice);
    setSearchName('');
    setTempProdId(0);
  };

  const handleSelect = (ID, searchRes, itemPrice) => {
    setTempProdId(ID);
    setTempProdPrice(itemPrice);
    setSearchName(searchRes);
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
    setTempProdId(0);
    setTempProdPrice(0);
  };

  const handleReset = () => {
    setSearchName('');
    setTempProdId(0);
    setTempProdPrice(0);
  };

  return (
    <div className="search product" ref={parent} style={{ marginLeft: '68px' }}>
      <div className="searchBar" ref={parent}>
        <input
          type="text"
          name="search"
          value={searchName}
          onChange={handleSearch}
          placeholder="Search Lens..."
        />
        {tempProdId !== 0 && (
          <button type="submit" onClick={handleAdd}>
            Add
          </button>
        )}
        {searchName !== '' && (
          <button type="submit" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
      {}
      {searchName !== '' && tempProdId === 0 && (
        <LensSearchResults
          searchName={searchName}
          handleSelect={handleSelect}
        />
      )}
    </div>
  );
}
