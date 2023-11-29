import { useState } from 'react';
import { useApp } from '../../../../../context/AppContext';

export default function NewUser({ handleAddCustomer }) {
  const { customers, addCustomers } = useApp();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mail, setMail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleCreateCustomer = async () => {
    const res = await addCustomers(name, address, mail, mobile);
    if (res === true) {
      await setTimeout(() => {
        setName('');
        setAddress('');
        setMail('');
        setMobile('');
        if (customers.length !== 0) {
          handleAddCustomer(customers[customers.length - 1].ID + 1);
        } else {
          handleAddCustomer(1);
        }
      }, 2000);
    }
  };

  return (
    <div className="new-customer">
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="name"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        placeholder="address"
      />
      <input
        type="text"
        value={mail}
        onChange={(e) => {
          setMail(e.target.value);
        }}
        placeholder="mail"
      />
      <input
        type="number"
        value={mobile}
        onChange={(e) => {
          setMobile(e.target.value);
        }}
        placeholder="mobile"
      />
      <button type="submit" onClick={handleCreateCustomer}>
        Create Customer
      </button>
    </div>
  );
}
