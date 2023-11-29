const { createContext, useContext, useState, useEffect } = require('react');

const appContext = createContext();

function useApp() {
  return useContext(appContext);
}

function Provider({ children }) {
  const [frames, setFrames] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      window.electron.ipcRenderer.invoke('fetchFrames', 'fetch', (args) => {
        setFrames(args);
      });
    }, 1);
    setTimeout(() => {
      window.electron.ipcRenderer.invoke('fetchOrders', 'fetch', (args) => {
        setOrders(args);
      });
    }, 1);
    setTimeout(() => {
      window.electron.ipcRenderer.invoke('fetchCustomers', 'fetch', (args) => {
        setCustomers(args);
      });
    }, 1);
  }, []);

  //frames

  const addFrames = (
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
  ) => {
    const data = {
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
    };
    setTimeout(() => {
      window.electron.ipcRenderer.invoke('addFrames', data, async (args) => {
        let lastIndex = 0;
        if (frames.length !== 0) {
          const lastIndex = frames[frames.length - 1].ID;
        }
        const { affectedRows, insertId } = args;
        if (affectedRows === 1) {
          if (insertId !== lastIndex) {
            data.ID = insertId;
            await setFrames([...frames, data]);
          }
        }
      });
    }, 1);
    return true;
  };

  const updateInventoryFrames = (ID, outinventory) => {
    const data = {
      ID,
      inventory: outinventory,
    };
    setTimeout(() => {
      window.electron.ipcRenderer.invoke(
        'updateInventoryFrames',
        data,
        (args) => {
          const { affectedRows } = args;
          if (affectedRows === 1) {
            setFrames(
              frames.map((frame) => {
                if (frame.ID === ID) {
                  frame.inventory = outinventory;
                }
                return frame;
              }),
            );
          }
        },
      );
    });
    return true;
  };

  const deleteFrame = (ID) => {
    setTimeout(() => {
      window.electron.ipcRenderer.invoke('deleteFrame', ID, (args) => {
        const { affectedRows } = args;
        if (affectedRows === 1) {
          setFrames(
            frames.filter((frame) => {
              return frame.ID !== ID;
            }),
          );
        }
      });
    });
    return true;
  };

  //customers

  const addCustomers = (name, address, mail, mobile) => {
    const data = {
      name,
      address,
      mail,
      mobile,
    };
    setTimeout(() => {
      window.electron.ipcRenderer.invoke('addCustomers', data, (args) => {
        const lastIndex = customers[customers.length - 1].ID;
        const { affectedRows, insertId } = args;
        if (affectedRows === 1) {
          if (insertId !== lastIndex) {
            data.ID = insertId;
            data.orders = 0;
            setCustomers([...customers, data]);
          }
        }
      });
    }, 1);
    return true;
  };

  const updateCustomerOrders = (ID, no_of_orders) => {
    const data = {
      ID,
      no_of_orders,
    };
    setTimeout(() => {
      window.electron.ipcRenderer.invoke(
        'updateCustomerOrders',
        data,
        (args) => {
          const { affectedRows } = args;
          if (affectedRows === 1) {
            setCustomers(
              customers.map((customer) => {
                if (customer.ID === ID) {
                  customer.inventory = no_of_orders;
                }
                return customer;
              }),
            );
          }
        },
      );
    }, 1);
  };

  return (
    <appContext.Provider
      value={{
        frames,
        addFrames,
        deleteFrame,
        updateInventoryFrames,
        orders,
        customers,
        addCustomers,
        updateCustomerOrders,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export { Provider, useApp };
export default appContext;
