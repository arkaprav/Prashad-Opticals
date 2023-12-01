import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useApp } from '../../../context/AppContext';
import { useEffect, useState } from 'react';

export default function LensTableLine({ len }) {
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  const {
    ID,
    code,
    name,
    brand,
    color,
    coating,
    design,
    index,
    quality,
    hsn_code,
    tax,
    base_price,
    purchase_price,
    retail_price,
    discount_price,
    inventory,
  } = len;

  useEffect(() => {
    enable(true);
  }, [parent]);

  const { deleteLen, updateInventoryLens } = useApp();
  const [newInventory, setNewInventory] = useState(inventory);
  const [click, setClicked] = useState(false);
  const [finalInventory, setFinalInventory] = useState(inventory);

  const handleDelete = async () => {
    deleteLen(ID);
  };

  const handleInventoryChange = async () => {
    const res = await updateInventoryLens(ID, newInventory);
    if (res === true) {
      setFinalInventory(newInventory);
      setClicked(false);
    }
  };

  let inventoryStatus = 'In Stock';
  if (inventory === 0) {
    inventoryStatus = 'Out of Stock';
  }

  return (
    <tr key={ID} ref={parent}>
      <td>{code}</td>
      <td>
        {name}-{brand}-{color}-{coating}-{design}-{index}-{quality}
      </td>
      <td>
        Base Price: {base_price}
        <br />
        Purchse Price: {purchase_price} <br />
        Tax: {tax} <br />
        Retail Price: {retail_price} <br />
        Discounted Price: {discount_price} <br />
      </td>
      <td>{hsn_code}</td>
      {click === true ? (
        <td>
          <input
            type="number"
            min="0"
            value={newInventory}
            onChange={(e) => {
              if (e.target.value === '') {
                setNewInventory(0);
              } else {
                setNewInventory(e.target.value);
              }
            }}
          />
          <button type="submit" onClick={handleInventoryChange}>
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
          {finalInventory}
        </td>
      )}
      <td>{inventoryStatus}</td>
      <td>
        <button type="submit" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}
