import { useState } from 'react';
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
  const { frames, lens, customers, updateOrderAmountPaid } = useApp();
  const [clicked, setClicked] = useState(false);
  const [newAmountPaid, setNewAmountPaid] = useState(amountPaid);
  const [finalAmountPaid, setFinalamountPaid] = useState(amountPaid);
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
    if (parsedProducts[i].type === 'Lens') {
      const [prod] = lens.filter((len) => {
        return len.ID === parsedProducts[i].ID;
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
  const handleclick = async () => {
    const res = await updateOrderAmountPaid(ID, newAmountPaid);
    if (res === true) {
      setFinalamountPaid(newAmountPaid);
      setClicked(false);
    }
  };
  const cust = customers.filter((customer) => {
    return customer.ID === parseInt(customerID);
  });
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
          Total: {prod.itemPrice} <br />
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
      {clicked === true ? (
        <td>
          <input
            type="number"
            min={finalAmountPaid}
            max={discountedPrize}
            value={newAmountPaid}
            onChange={(e) => {
              setNewAmountPaid(e.target.value);
            }}
          />
          <button type="submit" onClick={handleclick}>
            Update
          </button>
        </td>
      ) : (
        <td
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setClicked(true);
          }}
        >
          {finalAmountPaid}
        </td>
      )}
      <td>{discountedPrize === amountPaid ? 'paid' : 'pending'}</td>
    </tr>
  );
}
