import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Layout from '../components/Layout';
import AddNewOrder from '../components/Orders/AddNewOrder/AddNewOrder';

export default function Orders() {
  const [searchName, setSearchName] = useState('');
  const [addOrder, setAddOrder] = useState(false);
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  useEffect(() => {
    enable(true);
  }, [parent]);

  const handleAddOrderCancel = () => {
    setAddOrder(false);
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };
  const handleReset = () => {
    setSearchName('');
  };
  const handleAddOrderChange = () => {
    setAddOrder(true);
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
              placeholder="Search Orders..."
            />
            {searchName !== '' && (
              <button type="submit" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
          <div className="add">
            <button type="submit" onClick={handleAddOrderChange}>
              + Add Order
            </button>
          </div>
        </div>
        {addOrder && <AddNewOrder handleCancel={handleAddOrderCancel} />}
        {searchName}
      </div>
    </Layout>
  );
}
