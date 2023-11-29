import OrderProductTableLine from './OrderProductTableLine';

export default function OrderProductTable({
  orderProducts,
  updateProductQuantity,
  updateProductDiscount,
  handleRemoveProduct,
}) {
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
  return (
    <div className="products">
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
