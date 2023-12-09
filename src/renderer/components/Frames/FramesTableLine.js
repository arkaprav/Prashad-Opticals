import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useApp } from '../../context/AppContext';
import { useEffect, useRef, useState } from 'react';
import PrintBarcode from '../Barcode/PrintBarcode';
import ReactToPrint from 'react-to-print';

export default function FramesTableLine({ frame }) {
  const [parent, enable] = useAutoAnimate();
  const {
    ID,
    code,
    name,
    brand,
    gender,
    color,
    size,
    type,
    shape,
    material,
    temple,
    bridge_size,
    hsn_code,
    tax,
    base_price,
    purchase_price,
    retail_price,
    discount_price,
    inventory,
  } = frame;

  useEffect(() => {
    enable(true);
  }, [parent]);

  const pageSize = `
  @page{
    size: 30mm 20mm;
  }
  @media all{
    .pageBreak{
      display: none;
    }
  }
  @media print{
    .pageBreak{
      page-break-before: always;
    }
  }
  `;

  const { deleteFrame, updateInventoryFrames } = useApp();
  const [newInventory, setNewInventory] = useState(inventory);
  const [click, setClicked] = useState(false);
  const [finalInventory, setFinalInventory] = useState(inventory);
  const ref = useRef();

  const handleDelete = async () => {
    deleteFrame(ID);
  };

  const handleInventoryChange = async () => {
    const res = await updateInventoryFrames(ID, newInventory);
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
        {name}-{brand}-{gender}-{color}-<br />
        {size}-{type}-{shape}-{material}-{temple}-{bridge_size}
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
        <div style={{ display: 'none' }}>
          <div ref={ref}>
            <PrintBarcode
              brand={brand}
              name={name}
              code={code}
              type="Frames"
              retail_price={retail_price}
            />
          </div>
        </div>
        <button type="submit" onClick={handleDelete}>
          Delete
        </button>
        <br />
        <ReactToPrint
          trigger={() => <button type="submit">Barcode</button>}
          content={() => ref.current}
          pageStyle={pageSize}
        />
      </td>
    </tr>
  );
}
