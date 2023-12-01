import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect, useState } from 'react';
import { useApp } from '../../../context/AppContext';

export default function AddLens({ handleCancel }) {
  const { addLens } = useApp();
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [coating, setCoating] = useState('');
  const [design, setDesign] = useState('');
  const [index, setIndex] = useState(0);
  const [quality, setQuality] = useState(0);
  const [material, setMaterial] = useState('');
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

  const handleAddLens = async () => {
    const res = await addLens(
      code,
      name,
      brand,
      color,
      coating,
      design,
      index,
      quality,
      material,
      hsn_code,
      tax,
      base_price,
      purchase_price,
      retail_price,
      discount_price,
      inventory,
    );
    if (res === true) {
      setCode('');
      setName('');
      setBrand('');
      setColor('');
      setCoating(0);
      setDesign('');
      setIndex('');
      setQuality('');
      setMaterial('');
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
        <div>
          <span>Code :</span>
          <input
            type="text"
            name="code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            placeholder="code"
          />
        </div>
        <div>
          <span>Name :</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="name"
          />
        </div>
        <div>
          <span>Brand :</span>
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            placeholder="brand"
          />
        </div>
        <div>
          <span>Color :</span>
          <input
            type="text"
            name="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            placeholder="color"
          />
        </div>
        <div>
          <span>Coating :</span>
          <input
            type="text"
            name="coating"
            value={coating}
            onChange={(e) => {
              setCoating(e.target.value);
            }}
            placeholder="coating"
          />
        </div>
        <div>
          <span>Design :</span>
          <input
            type="text"
            name="design"
            value={design}
            onChange={(e) => {
              setDesign(e.target.value);
            }}
            placeholder="design"
          />
        </div>
        <div>
          <span>Index :</span>
          <input
            type="number"
            name="index"
            value={index}
            onChange={(e) => {
              setIndex(e.target.value);
            }}
            placeholder="index"
          />
        </div>
        <div>
          <span>Quality :</span>
          <input
            type="number"
            name="quality"
            value={quality}
            onChange={(e) => {
              setQuality(e.target.value);
            }}
            placeholder="quality"
          />
        </div>
        <div>
          <span>Material :</span>
          <input
            type="text"
            name="material"
            value={material}
            onChange={(e) => {
              setMaterial(e.target.value);
            }}
            placeholder="material"
          />
        </div>
        <div>
          <span>HSN Code :</span>
          <input
            type="text"
            name="hsn_code"
            value={hsn_code}
            onChange={(e) => {
              setHsnCode(e.target.value);
            }}
            placeholder="hsn_code"
          />
        </div>
        <div>
          <span>Tax :</span>
          <input
            type="number"
            name="tax"
            value={tax}
            onChange={(e) => {
              setTax(e.target.value);
            }}
            placeholder="tax"
          />
        </div>
        <div>
          <span>Base Price :</span>
          <input
            type="number"
            name="base_price"
            value={base_price}
            onChange={(e) => {
              setBasePrice(e.target.value);
            }}
            placeholder="base_price"
          />
        </div>
        <div>
          <span>Purchase Price :</span>
          <input
            type="number"
            name="purchase_price"
            value={purchase_price}
            onChange={(e) => {
              setPurchasePrice(e.target.value);
            }}
            placeholder="purchase_prizce"
          />
        </div>
        <div>
          <span>Retail Price :</span>
          <input
            type="number"
            name="retail_price"
            value={retail_price}
            onChange={(e) => {
              setRetailPrice(e.target.value);
            }}
            placeholder="retail_price"
          />
        </div>
        <div>
          <span>Discount Price :</span>
          <input
            type="number"
            name="discount_price"
            value={discount_price}
            onChange={(e) => {
              setDiscountPrice(e.target.value);
            }}
            placeholder="discount_price"
          />
        </div>
        <div>
          <span>Inventory :</span>
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
      </div>
      <div className="buttons">
        <button type="submit" onClick={handleAddLens}>
          Create Lens
        </button>
        <button type="submit" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
