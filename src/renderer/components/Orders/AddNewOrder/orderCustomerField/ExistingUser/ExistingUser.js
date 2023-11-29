import { useEffect, useState } from 'react';
import SearchResults from './SearchResults';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function ExistingUser({ handleAddCustomer }) {
  const [searchName, setSearchName] = useState('');
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  const [tempcustId, setTempCustId] = useState(0);
  useEffect(() => {
    enable(true);
  }, [parent]);

  const handleAdd = () => {
    handleAddCustomer(tempcustId);
    setTempCustId(0);
    setSearchName('');
  };

  const handleSelect = (ID, searchRes) => {
    setTempCustId(ID);
    setSearchName(searchRes);
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
    setTempCustId(0);
  };
  const handleReset = () => {
    setTempCustId(0);
    setSearchName('');
  };
  return (
    <div className="search" ref={parent}>
      <div className="searchBar" ref={parent}>
        <input
          type="text"
          name="search"
          value={searchName}
          onChange={handleSearch}
          placeholder="Search Customers..."
        />
        {tempcustId !== 0 && (
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
      {searchName !== '' && tempcustId === 0 && (
        <SearchResults searchName={searchName} handleSelect={handleSelect} />
      )}
    </div>
  );
}
