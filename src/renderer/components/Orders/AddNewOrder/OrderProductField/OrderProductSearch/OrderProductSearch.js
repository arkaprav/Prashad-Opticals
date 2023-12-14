import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect, useState } from 'react';
import FramesSearchField from './Frames/FramesSearchField';
import LensSearchField from './Lens/LensSearchField';
import ContactLensSearchField from './ContactLens/ContactLensSearchField';

export default function OrderProductSearch({ handleAddProduct }) {
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  const [orderProductType, setOrderProductType] = useState('Frames');

  useEffect(() => {
    enable(true);
  }, [parent]);

  const handleAddNewProduct = (ID, itemPrice) => {
    handleAddProduct(ID, orderProductType, itemPrice);
  };

  return (
    <div ref={parent}>
      <div className="customerField" ref={parent}>
        <select
          name="customer-type"
          value={orderProductType}
          onChange={(e) => {
            setOrderProductType(e.target.value);
          }}
        >
          <option value="Frames">Frames</option>
          <option value="Lens">Lens</option>
          <option value="ContactLens">Contact Lens</option>
        </select>
        {orderProductType === 'Frames' && (
          <FramesSearchField handleAddFrames={handleAddNewProduct} />
        )}
        {orderProductType === 'Lens' && (
          <LensSearchField handleAddLens={handleAddNewProduct} />
        )}
        {orderProductType === 'ContactLens' && (
          <ContactLensSearchField handleAddLens={handleAddNewProduct} />
        )}
      </div>
    </div>
  );
}
