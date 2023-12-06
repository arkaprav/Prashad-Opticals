export default function OrderReceipt({ ID, customer, products, totals }) {
  const { name, address, mail, mobile } = customer[0];
  const { orderTotal, orderDiscount, discountedPrize, amountPaid } = totals;
  const prodOut = products.map((prod) => {
    return (
      <tr>
        <td>{prod.code}</td>
        <td>
          {prod.name}-{prod.brand}-{prod.type}
        </td>
        <td>{prod.quantity}</td>
        <td>{prod.itemPrice}</td>
        <td>{prod.itemDiscount}</td>
        <td>{prod.itemDiscountedPrice}</td>
      </tr>
    );
  });
  return (
    <div className="background">
      <div className="pid">Order ID: {ID}</div>
      <div className="customer">
        <p>
          <span>Name:</span> <span>{name}</span>
        </p>
        <p>
          <span>Address:</span> <span>{address}</span>
        </p>
        <p>
          <span>Email:</span> <span>{mail}</span>
        </p>
        <p>
          <span>Phone:</span> <span>{mobile}</span>
        </p>
      </div>
      <div className="order-product">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Details</th>
              <th>Quantity</th>
              <th>Item Price</th>
              <th>Item Discount</th>
              <th>Discounted Price</th>
            </tr>
          </thead>
          <tbody>{prodOut}</tbody>
        </table>
      </div>
      <div className="totals">
        <p>
          <span>Order Total:</span>
          <span>{orderTotal}</span>
        </p>
        <p>
          <span>Order Discount:</span>
          <span>{orderDiscount}</span>
        </p>
        <p>
          <span>Discounted Total:</span>
          <span>{discountedPrize}</span>
        </p>
        <p>
          <span>Amount Paid:</span>
          <span>{amountPaid}</span>
        </p>
      </div>
    </div>
  );
}
