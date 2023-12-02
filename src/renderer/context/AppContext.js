const { createContext, useContext, useState, useEffect } = require('react');

const appContext = createContext();

function useApp() {
  return useContext(appContext);
}

function Provider({ children }) {
  const [frames, setFrames] = useState([]);
  const [lens, setLens] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      window.electron.ipcRenderer.invoke('fetchFrames', 'fetch', (args) => {
        setFrames(args);
      });
    }, 1);
    setTimeout(() => {
      window.electron.ipcRenderer.invoke('fetchLens', 'fetch', (args) => {
        setLens(args);
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

  //lens
  const addLens = (
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
  ) => {
    const data = {
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
      inventory
    };
    setTimeout(() => {
      window.electron.ipcRenderer.invoke('addLens', data, async (args) => {
        let lastIndex = 0;
        if (lens.length !== 0) {
          const lastIndex = lens[lens.length - 1].ID;
        }
        const { affectedRows, insertId } = args;
        if (affectedRows === 1) {
          if (insertId !== lastIndex) {
            data.ID = insertId;
            await setLens([...lens, data]);
          }
        }
      });
    }, 1);
    return true;
  };

  const updateInventoryLens = (ID, outinventory) => {
    const data = {
      ID,
      inventory: outinventory,
    };
    setTimeout(() => {
      window.electron.ipcRenderer.invoke(
        'updateInventoryLens',
        data,
        (args) => {
          const { affectedRows } = args;
          if (affectedRows === 1) {
            setLens(
              lens.map((len) => {
                if (len.ID === ID) {
                  len.inventory = outinventory;
                }
                return len;
              }),
            );
          }
        },
      );
    });
    return true;
  };

  const deleteLen = (ID) => {
    setTimeout(() => {
      window.electron.ipcRenderer.invoke('deleteLens', ID, (args) => {
        const { affectedRows } = args;
        if (affectedRows === 1) {
          setLens(
            lens.filter((len) => {
              return len.ID !== ID;
            }),
          );
        }
      });
    });
    return true;
  };

  //customers

  const addCustomers = async (name, address, mail, mobile) => {
    const data = {
      name,
      address,
      mail,
      mobile,
    };
    await setTimeout(() => {
      window.electron.ipcRenderer.invoke('addCustomers', data, (args) => {
        let lastIndex = 0;
        if (customers.length > 0) {
          lastIndex = customers[customers.length - 1].ID;
        }
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

  //orders

  const addOrder = async (
    createdAt,
    products,
    orderTotal,
    orderDiscount,
    discountedPrize,
    amountPaid,
    customerID,
  ) => {
    const data = {
      createdAt,
      products,
      orderTotal,
      orderDiscount,
      discountedPrize,
      amountPaid,
      customerID,
    };
    const prodData = products;
    const passData = {
      createdAt,
      products: JSON.stringify(products),
      orderTotal,
      orderDiscount,
      discountedPrize,
      amountPaid,
      customerID,
    };
    let updateInventory = [];
    for (let i = 0; i < prodData.length; i++) {
      if (prodData[i].type === 'Frames') {
        const [prod] = frames.filter((frame) => {
          return frame.ID === prodData[i].ID;
        });
        const newInventory = prod.inventory - 1;
        const inventoryData = { ID: prodData[i].ID, newInventory };
        updateInventory.push(inventoryData);
      }
    }
    const [cust] = customers.filter((customer) => {
      return customer.ID === customerID;
    });
    const updateOrders = { ID: customerID, no_of_orders: cust.orders + 1 };
    await setTimeout(async () => {
      window.electron.ipcRenderer.invoke('addOrder', passData, async (args) => {
        const { affectedRows, insertId } = args;
        if (affectedRows === 1) {
          passData.ID = insertId;
          console.log(passData);
          setOrders([...orders, passData]);
          for (let i = 0; i < updateInventory.length; i++) {
            updateInventoryFrames(
              updateInventory[i].ID,
              updateInventory[i].newInventory,
            );
          }
          updateCustomerOrders(updateOrders.ID, updateOrders.no_of_orders);
        }
      });
    }, 1);
    return true;
  };

  const updateOrderAmountPaid = (ID, amountPaid) => {
    const data = {
      ID,
      amountPaid,
    };
    setTimeout(() => {
      window.electron.ipcRenderer.invoke(
        'updateOrderAmountPaid',
        data,
        (args) => {
          const { affectedRows } = args;
          if (affectedRows === 1) {
            setOrders(
              orders.map((order) => {
                if (order.ID === ID) {
                  order.amountPaid = amountPaid;
                }
                return order;
              }),
            );
          }
        },
      );
    }, 1);
    return true;
  };

  return (
    <appContext.Provider
      value={{
        frames,
        addFrames,
        deleteFrame,
        updateInventoryFrames,
        lens,
        addLens,
        updateInventoryLens,
        deleteLen,
        orders,
        addOrder,
        customers,
        addCustomers,
        updateCustomerOrders,
        updateOrderAmountPaid,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export { Provider, useApp };
export default appContext;
