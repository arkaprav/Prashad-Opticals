import { useState, useEffect } from 'react';
import ExistingUser from './orderCustomerField/ExistingUser/ExistingUser';
import NewUser from './orderCustomerField/NewUser/NewUser';
import OrderCustomerTable from './orderCustomerField/OrderCustomer/OrderCustomerTable';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import OrderProductSearch from './OrderProductField/OrderProductSearch';

export default function AddNewOrder({ handleAddOrderCancel }) {
  const [parent, enable] = useAutoAnimate({  duration: 350 });
  const [customerType, setCustomerType] = useState('existingUser');
  const [customerId, setCustomerId] = useState(0);
  useEffect(() => {
    enable(true);
  }, [parent]);
  const handleAddCustomer = async (id) => {
    setCustomerId(id);
  };
  return (
    <div ref={parent}>
      <div className="customerField" ref={parent}>
        <select
          name="customer-type"
          value={customerType}
          onChange={(e) => {
            setCustomerType(e.target.value);
          }}
        >
          <option value="existingUser">Existing Customer</option>
          <option value="newUser">New Customer</option>
        </select>
        {customerType === 'existingUser' ? (
          <ExistingUser handleAddCustomer={handleAddCustomer} />
        ) : (
          <NewUser handleAddCustomer={handleAddCustomer} />
        )}
      </div>
      {customerId !== 0 && <OrderCustomerTable customerId={customerId} />}
      {customerId !== 0 && <OrderProductSearch />}
    </div>
  );
}
