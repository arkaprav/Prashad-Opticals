import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useApp } from "../../context/AppContext";
import { useEffect } from "react";

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

  const { deleteFrame } = useApp();

  const handleDelete = async () => {
    deleteFrame(ID);
  };

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
      <td>{inventory}</td>
      <td>{inventory === 0 ? 'Out of Stock' : 'In Stock'}</td>
      <td>
        <button type="submit" onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}
