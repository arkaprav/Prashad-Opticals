
import { useAutoAnimate } from '@formkit/auto-animate/react';
import OrderProductTableLine from './OrderProductTableLine';
import { useEffect } from 'react';


export default function OrderProductTable({
  orderProducts,
  updateProductQuantity,
  updateProductDiscount,
  handleRemoveProduct,
}) {
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  const orderProductTB = orderProducts.map((OrderSingleProduct) => {
    return (
      <OrderProductTableLine
        OrderSingleProduct={OrderSingleProduct}
        updateProductQuantity={updateProductQuantity}
        updateProductDiscount={updateProductDiscount}
        handleRemoveProduct={handleRemoveProduct}
      />
    );
  });

  useEffect(() => {
    enable(true);
  }, [parent]);
  return (
    <div className="products" ref={parent}>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Product Details</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Discounted Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{orderProductTB}</tbody>
      </table>
    </div>
  );
}
