import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect, useState } from 'react';
import { useApp } from '../../../context/AppContext';

export default function AddFrame({ handleCancel }) {
  const { addFrames } = useApp();
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState(0);
  const [type, setType] = useState('');
  const [shape, setShape] = useState('');
  const [material, setMaterial] = useState('');
  const [temple, setTemple] = useState('');
  const [bridge_size, setBridgeSize] = useState(0);
  const [hsn_code, setHsnCode] = useState('');
  const [tax, setTax] = useState(0);
  const [base_price, setBasePrice] = useState(0);
  const [purchase_price, setPurchasePrice] = useState(0);
  const [retail_price, setRetailPrice] = useState(0);
  const [discount_price, setDiscountPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  useEffect(() => {
    enable(true);
  }, [parent]);

  const handleAddFrame = async () => {
    const res = await addFrames(
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
    );
    if(res === true){
      setCode('');
      setName('');
      setBrand('');
      setGender('');
      setColor('');
      setSize(0);
      setType('');
      setShape('');
      setMaterial('');
      setTemple('');
      setBridgeSize(0);
      setHsnCode('');
      setTax(0);
      setBasePrice(0);
      setPurchasePrice(0);
      setRetailPrice(0);
      setDiscountPrice(0);
      setInventory(0);
      handleCancel();
    }
  };

  return (
    <div className="add-product">
      <div className="input-fields">
        <input
          type="text"
          name="code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          placeholder="code"
        />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="name"
        />
        <input
          type="text"
          name="brand"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
          placeholder="brand"
        />
        <input
          type="text"
          name="gender"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
          placeholder="gender"
        />
        <input
          type="text"
          name="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
          placeholder="color"
        />
        <input
          type="number"
          name="size"
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
          }}
          placeholder="size"
        />
        <input
          type="text"
          name="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          placeholder="type"
        />
        <input
          type="text"
          name="shape"
          value={shape}
          onChange={(e) => {
            setShape(e.target.value);
          }}
          placeholder="shape"
        />
        <input
          type="text"
          name="material"
          value={material}
          onChange={(e) => {
            setMaterial(e.target.value);
          }}
          placeholder="material"
        />
        <input
          type="text"
          name="temple"
          value={temple}
          onChange={(e) => {
            setTemple(e.target.value);
          }}
          placeholder="temple"
        />
        <input
          type="number"
          name="bridge_size"
          value={bridge_size}
          onChange={(e) => {
            setBridgeSize(e.target.value);
          }}
          placeholder="bridge_size"
        />
        <input
          type="text"
          name="hsn_code"
          value={hsn_code}
          onChange={(e) => {
            setHsnCode(e.target.value);
          }}
          placeholder="hsn_code"
        />
        <input
          type="number"
          name="tax"
          value={tax}
          onChange={(e) => {
            setTax(e.target.value);
          }}
          placeholder="tax"
        />
        <input
          type="number"
          name="base_price"
          value={base_price}
          onChange={(e) => {
            setBasePrice(e.target.value);
          }}
          placeholder="base_price"
        />
        <input
          type="number"
          name="purchase_price"
          value={purchase_price}
          onChange={(e) => {
            setPurchasePrice(e.target.value);
          }}
          placeholder="purchase_prizce"
        />
        <input
          type="number"
          name="retail_price"
          value={retail_price}
          onChange={(e) => {
            setRetailPrice(e.target.value);
          }}
          placeholder="retail_price"
        />
        <input
          type="number"
          name="discount_price"
          value={discount_price}
          onChange={(e) => {
            setDiscountPrice(e.target.value);
          }}
          placeholder="discount_price"
        />
        <input
          type="number"
          name="inventory"
          value={inventory}
          onChange={(e) => {
            setInventory(e.target.value);
          }}
          placeholder="inventory"
        />
      </div>
      <div className="buttons">
        <button type="submit" onClick={handleAddFrame}>Create Frame</button>
        <button type="submit" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
