import { useAutoAnimate } from '@formkit/auto-animate/react';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import CustomersTable from '../components/Customers/CustomersTable';

export default function Customers(params) {
  const [searchName, setSearchName] = useState('');
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  useEffect(() =>{
    enable(true);
  }, [parent]);
  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };
  const handleReset = () => {
    setSearchName('');
  };
  return (
    <Layout>
      <div ref={parent}>
        <div className="top" ref={parent}>
          <div className="searchBar">
            <input
              type="text"
              name="search"
              value={searchName}
              onChange={handleSearch}
              placeholder="Searche Customers..."
            />
            {searchName !== '' && (
              <button type="submit" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
        </div>
        <CustomersTable searchName={searchName} />
      </div>
    </Layout>
  );
}
