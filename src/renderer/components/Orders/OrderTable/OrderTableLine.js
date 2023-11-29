import { useApp } from '../../../context/AppContext';

export default function OrderTableLine({ order }) {
  const {
    ID,
    createdAt,
    customerID,
    discountedPrize,
    extraField,
    orderDiscount,
    orderTotal,
    amountPaid,
    products,
  } = order;
  const { frames, customers } = useApp();
  const parsedProducts = JSON.parse(products);
  const prodout = [];
  for (let i = 0; i < parsedProducts.length; i++) {
    if (parsedProducts[i].type === 'Frames') {
      const [prod] = frames.filter((frame) => {
        return frame.ID === parsedProducts[i].ID;
      });
      prod.quantity = parseInt(parsedProducts[i].quantity);
      prod.itemDiscount = parsedProducts[i].itemDiscount;
      prod.itemDiscountedPrice = parsedProducts[i].itemDiscountedPrice;
      prod.itemDiscount = parsedProducts[i].itemDiscount;
      prod.itemPrice = parsedProducts[i].itemPrice;
      prod.type = parsedProducts[i].type;
      prodout.push(prod);
    }
  }
  const cust = customers.filter((customer) => {
    return customer.ID === parseInt(customerID);
  });
  console.log(cust);
  const custOut = cust.map((c) => {
    return (
      <div>
        {c.name}
        <br />
        {c.mail}
        <br />
        {c.mobile}
      </div>
    );
  });
  const prodHtml = prodout.map((prod) => {
    return (
      <>
        <div key={prod.ID}>
          {prod.name}-{prod.brand}-{prod.code}-{prod.type}x {prod.quantity}
          <br />
          Total: {prod.itemPrice}
          Discount: {prod.itemDiscount} <br />
          Discounted Price: {prod.itemDiscountedPrice}
        </div>
        <br />
        <br />
      </>
    );
  });
  const orderOut = (
    <div>
      Order Total: {orderTotal} <br />
      Order Discount: {orderDiscount} <br />
      Order Discounted Prize: {discountedPrize} <br />
    </div>
  );
  return (
    <tr>
      <td>{ID}</td>
      <td>{createdAt}</td>
      <td>{custOut}</td>
      <td>{prodHtml}</td>
      <td>{orderOut}</td>
      <td>{amountPaid}</td>
      <td>{discountedPrize === amountPaid ? "paid" : "pending"}</td>
    </tr>
  );
}
