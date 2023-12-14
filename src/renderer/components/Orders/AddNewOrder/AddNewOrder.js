import { useState, useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import ExistingUser from './orderCustomerField/ExistingUser/ExistingUser';
import NewUser from './orderCustomerField/NewUser/NewUser';
import OrderCustomerTable from './orderCustomerField/OrderCustomer/OrderCustomerTable';
import OrderProductSearch from './OrderProductField/OrderProductSearch/OrderProductSearch';
import OrderProductTable from './OrderProductField/OrderProductTable/OrderProductTable';
import { useApp } from '../../../context/AppContext';
import OrderLenPrescription from './OrderPrescription/OrderLenPrescription';
import OrderContactLenPrescription from './OrderPrescription/OrderContactLensPrescription';

export default function AddNewOrder({ handleCancel }) {
  const { addOrder } = useApp();
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  const [customerType, setCustomerType] = useState('existingUser');
  const [customerID, setcustomerID] = useState(0);
  const [products, setProducts] = useState([]);
  const [orderDiscount, setOrderDiscount] = useState(0);
  const [orderAmountPaid, setOrderAmountPaid] = useState(0);
  const [hasLens, setHasLens] = useState(0);
  const [mop, setMop] = useState('');
  useEffect(() => {
    enable(true);
  }, [parent]);
  const handleAddCustomer = async (id) => {
    setcustomerID(id);
  };
  const handleAddProduct = (ID, type, itemPrice) => {
    if (type === 'Lens' || type === 'ContactLens') setHasLens(hasLens - 1);
    const data = {
      ID,
      type,
      quantity: 1,
      singleItemPrice: itemPrice,
      itemPrice,
      itemDiscount: 0,
      itemDiscountedPrice: itemPrice,
    };
    if (products.length !== 0) {
      const idProd = products.filter((product) => {
        return product.ID === ID && product.type === type;
      });
      if (idProd.length === 0) {
        setProducts([...products, data]);
        setOrderAmountPaid(0);
      }
    } else {
      setProducts([...products, data]);
      setOrderAmountPaid(0);
    }
  };

  const updateProductQuantity = (ID, quantity) => {
    setProducts(
      products.map((product) => {
        if (product.ID === ID) {
          product.quantity = quantity;
          product.itemPrice = product.singleItemPrice * quantity;
          product.itemDiscountedPrice =
            product.itemPrice * (1 - product.itemDiscount / 100);
        }
        return product;
      }),
    );
    setOrderAmountPaid(0);
  };

  const updateProductDiscount = (ID, discount) => {
    setProducts(
      products.map((product) => {
        if (product.ID === ID) {
          product.itemDiscount = discount;
          product.itemDiscountedPrice =
            product.itemPrice * (1 - discount / 100);
        }
        return product;
      }),
    );
    setOrderAmountPaid(0);
  };

  const handleRemoveProduct = (ID, type) => {
    if (type === 'Lens' || type === 'ContactLens') setHasLens(hasLens + 1);
    setProducts(
      products.filter((product) => {
        return !(product.ID === ID && product.type === type);
      }),
    );
    setOrderAmountPaid(0);
  };

  let orderTotal = 0;
  for (let i = 0; i < products.length; i++) {
    orderTotal += parseFloat(products[i].itemDiscountedPrice);
  }

  const handleAddPrescription = () => {
    setHasLens(hasLens + 1);
  };

  const prescriptions = products.map((product) => {
    if (product.type === 'Lens') {
      return (
        <OrderLenPrescription
          key={product.ID}
          customerID={customerID}
          lensID={product.ID}
          handleAddPrescription={handleAddPrescription}
        />
      );
    }
    if (product.type === 'ContactLens') {
      return (
        <OrderContactLenPrescription
          key={product.ID}
          customerID={customerID}
          lensID={product.ID}
          handleAddPrescription={handleAddPrescription}
        />
      );
    }
    return null;
  });

  const orderDiscountedTotal = orderTotal * (1 - orderDiscount / 100);
  const orderStatus =
    orderDiscountedTotal === orderAmountPaid ? 'paid' : 'pending';

  useEffect(() => {
    setOrderAmountPaid(
      orderAmountPaid < orderDiscountedTotal
        ? orderAmountPaid
        : orderDiscountedTotal,
    );
  }, [orderDiscountedTotal]);

  const orderAmountTB = (
    <div className="products" ref={parent}>
      <table>
        <thead>
          <tr>
            <th>Order Total</th>
            <th>Order Discount</th>
            <th>Discounted Price</th>
            <th>Amount Paid</th>
            <th>Order Status</th>
            <th>Mode of Payment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderTotal}</td>
            <td>
              <input
                type="number"
                min="0"
                max="100"
                value={orderDiscount}
                onChange={(e) => {
                  if (e.target.value === '') {
                    setOrderDiscount(0);
                  } else {
                    setOrderDiscount(parseFloat(e.target.value));
                  }
                }}
              />
            </td>
            <td>{orderDiscountedTotal}</td>
            <td>
              <input
                type="number"
                min="0"
                max={orderDiscountedTotal}
                value={orderAmountPaid}
                onChange={(e) => {
                  if (e.target.value === '') {
                    setOrderAmountPaid(0);
                  } else {
                    setOrderAmountPaid(parseFloat(e.target.value));
                  }
                }}
              />
            </td>
            <td>{orderStatus}</td>
            <td>
              <input
                type="text"
                value={mop}
                onChange={(e) => {
                  setMop(e.target.value);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const handlePlaceOrder = async () => {
    const res = await addOrder(
      new Date().toUTCString(),
      products,
      orderTotal,
      orderDiscount,
      orderDiscountedTotal,
      orderAmountPaid,
      customerID,
      mop,
    );
    if (res === true) {
      setCustomerType('existingUser');
      setcustomerID(0);
      setProducts([]);
      setOrderDiscount(0);
      setOrderAmountPaid(0);
      setMop('');
      handleCancel();
    }
  };

  return (
    <div className="add-order" ref={parent}>
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
      {customerID !== 0 && <OrderCustomerTable customerID={customerID} />}
      {customerID !== 0 && (
        <OrderProductSearch handleAddProduct={handleAddProduct} />
      )}
      {products.length !== 0 && (
        <OrderProductTable
          orderProducts={products}
          updateProductQuantity={updateProductQuantity}
          updateProductDiscount={updateProductDiscount}
          handleRemoveProduct={handleRemoveProduct}
        />
      )}
      {prescriptions}
      {products.length !== 0 && hasLens === 0 && orderAmountTB}
      <div className="buttons">
        {products.length !== 0 && hasLens === 0 && (
          <button type="submit" onClick={handlePlaceOrder}>
            Place Order
          </button>
        )}
        <button type="submit" onClick={handleCancel}>
          Cancel Order
        </button>
      </div>
    </div>
  );
}
