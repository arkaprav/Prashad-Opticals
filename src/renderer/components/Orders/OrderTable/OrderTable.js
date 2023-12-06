import { useApp } from '../../../context/AppContext';
import OrderTableLine from './OrderTableLine';

export default function OrderTable() {
  const { orders } = useApp();
  const orderTB = orders.map((order) => {
    return <OrderTableLine key={order.ID} order={order} />;
  });
  const noOrd = <div className="no-prod">No orders Placed Yet...</div>
  return (
    <div className="products">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>createdAt</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Price</th>
            <th>amountPaid</th>
            <th>OrderStatus</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{orderTB}</tbody>
      </table>
      {orders.length === 0 && noOrd}
    </div>
  );
}
