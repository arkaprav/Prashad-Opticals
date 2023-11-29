import { useEffect, useState } from 'react';
import { useApp } from '../../../../../context/AppContext';

export default function OrderProductTableLine({
  OrderSingleProduct,
  updateProductQuantity,
  updateProductDiscount,
  handleRemoveProduct,
}) {
  const { frames } = useApp();
  const { ID, quantity, type, itemPrice, itemDiscount, itemDiscountedPrice } =
    OrderSingleProduct;
  const [lineProduct, setLineProduct] = useState({});
  const [newquantity, setNewQuantity] = useState(quantity);
  const [newDiscount, setNewDiscount] = useState(itemDiscount);
  useEffect(() => {
    if (type === 'Frames') {
      setLineProduct(
        frames.filter((product) => {
          return product.ID === ID;
        })[0],
      );
    }
  }, [OrderSingleProduct]);

  lineProduct.quantity = quantity;
  lineProduct.type = type;
  lineProduct.itemPrice = itemPrice;
  lineProduct.itemDiscount = itemDiscount;
  lineProduct.itemDiscountedPrice = itemDiscountedPrice;
  return (
    <tr>
      <td>{lineProduct.code}</td>
      <td>
        {lineProduct.name}-{lineProduct.brand}-{lineProduct.type}
      </td>
      <td>
        <input
          type="number"
          min="1"
          max={lineProduct.inventory}
          value={newquantity}
          onChange={(e) => {
            setNewQuantity(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            updateProductQuantity(ID, newquantity);
          }}
        >
          Update
        </button>
      </td>
      <td>{lineProduct.itemPrice}</td>
      <td>
        <input
          type="number"
          min="0"
          max={100}
          value={newDiscount}
          onChange={(e) => {
            setNewDiscount(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            updateProductDiscount(ID, newDiscount);
          }}
        >
          Update
        </button>
      </td>
      <td>{lineProduct.itemDiscountedPrice}</td>
      <td>
        <button
          type="submit"
          onClick={() => {
            handleRemoveProduct(ID);
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
