import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Layout from '../components/Layout';
import AddNewOrder from '../components/Orders/AddNewOrder/AddNewOrder';
import OrderTable from '../components/Orders/OrderTable/OrderTable';

export default function Orders() {
  const [addOrder, setAddOrder] = useState(false);
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  useEffect(() => {
    enable(true);
  }, [parent]);

  const handleAddOrderCancel = () => {
    setAddOrder(false);
  };
  const handleAddOrderChange = () => {
    setAddOrder(true);
  };
  return (
    <Layout>
      <div ref={parent}>
        <div className="top-order" ref={parent}>
          <div className="add">
            <button type="submit" onClick={handleAddOrderChange}>
              + Add Order
            </button>
          </div>
        </div>
        {addOrder === true && (
          <AddNewOrder handleCancel={handleAddOrderCancel} />
        )}
        <OrderTable />
      </div>
    </Layout>
  );
}
