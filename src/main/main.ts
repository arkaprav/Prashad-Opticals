/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const mysql = require('mysql');

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1700,
    height: 1200,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!!');
});

const queries = [
  'CREATE DATABASE IF NOT EXISTS optical_store',
  'USE optical_store',
  'CREATE TABLE IF NOT EXISTS frames(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, code VARCHAR(255), name VARCHAR(255), brand VARCHAR(255), gender VARCHAR(255), color VARCHAR(255), size INT, type VARCHAR(255), shape VARCHAR(255), material VARCHAR(255), temple VARCHAR(255), bridge_size VARCHAR(255), hsn_code VARCHAR(255), tax INT, base_price INT, purchase_price INT, retail_price INT, discount_price INT, inventory INT)',
  'CREATE TABLE IF NOT EXISTS lens(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, code VARCHAR(255), name VARCHAR(255), brand VARCHAR(255), color VARCHAR(255), coating VARCHAR(255), design VARCHAR(255), ind INT, quality INT, material VARCHAR(255), hsn_code VARCHAR(255), tax INT, base_price INT, purchase_price INT, retail_price INT, discount_price INT, inventory INT)',
  'CREATE TABLE IF NOT EXISTS customers(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), mail VARCHAR(255), mobile VARCHAR(255), orders INT)',
  'CREATE TABLE IF NOT EXISTS prescription(ID INT NOT NULL AUTO_INCREMENT PRIMARY  KEY, customerID INT, lensID INT, lenstype VARCHAR(255), prescription VARCHAR(5000));',
  'CREATE TABLE IF NOT EXISTS orders(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, createdAt VARCHAR(255), products VARCHAR(5000), orderTotal INT, orderDiscount INT, discountedPrize INT, amountPaid INT, customerID INT)',
];

queries.forEach(async (query) => {
  await con.query(query, (err, res, fields) => {
    if (err) throw err;
    console.log(res);
  });
});

//frames

ipcMain.handle('fetchFrames', async (event, args) => {
  const query = `SELECT * FROM frames;`;
  return new Promise((res, rej) => {
    con.query(query, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

ipcMain.handle('addFrames', async (event, args) => {
  const {
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
  } = args;
  const addFrames = `INSERT INTO frames(code, name, brand, gender, color, size, type, shape, material, temple, bridge_size, hsn_code, tax, base_price, purchase_price, retail_price, discount_price, inventory) VALUES('${code}','${name}','${brand}','${gender}','${color}','${size}','${type}','${shape}','${material}','${temple}','${bridge_size}','${hsn_code}','${tax}','${base_price}','${purchase_price}','${retail_price}','${discount_price}','${inventory}')`;
  return new Promise((res, rej) => {
    con.query(addFrames, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

ipcMain.handle('updateInventoryFrames', async (event, args) => {
  const { ID, inventory } = args;
  const query = `UPDATE frames SET inventory='${inventory}' WHERE ID=${ID};`;
  return new Promise((res, rej) => {
    con.query(query, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

ipcMain.handle('deleteFrame', (event, args) => {
  const deleteFrame = `DELETE FROM frames WHERE ID=${args};`;
  return new Promise((res, rej) => {
    con.query(deleteFrame, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

//lens

ipcMain.handle('fetchLens', async (event, args) => {
  const query = `SELECT * FROM lens;`;
  return new Promise((res, rej) => {
    con.query(query, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

ipcMain.handle('addLens', async (event, args) => {
  const {
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
  } = args;
  const addLens = `INSERT INTO lens(code, name, brand, color, coating, design, ind, quality, material, hsn_code, tax, base_price, purchase_price, retail_price, discount_price, inventory) VALUES('${code}','${name}','${brand}','${color}','${coating}','${design}','${index}','${quality}','${material}','${hsn_code}','${tax}','${base_price}','${purchase_price}','${retail_price}','${discount_price}','${inventory}')`;
  return new Promise((res, rej) => {
    con.query(addLens, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

ipcMain.handle('updateInventoryLens', async (event, args) => {
  const { ID, inventory } = args;
  const query = `UPDATE lens SET inventory='${inventory}' WHERE ID=${ID};`;
  return new Promise((res, rej) => {
    con.query(query, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

ipcMain.handle('deleteLens', (event, args) => {
  const deleteLens = `DELETE FROM lens WHERE ID=${args};`;
  return new Promise((res, rej) => {
    con.query(deleteLens, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

//customer

ipcMain.handle('fetchCustomers', async (event, args) => {
  const query = `SELECT * FROM customers;`;
  return new Promise((res, rej) => {
    con.query(query, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

ipcMain.handle('addCustomers', async (event, args) => {
  const { name, address, mail, mobile } = args;
  const addCustomers = `INSERT INTO customers(name, address, mail, mobile, orders) values('${name}','${address}','${mail}','${mobile}', '0')`;
  return new Promise((res, rej) => {
    con.query(addCustomers, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

ipcMain.handle('updateCustomerOrders', (event, args) => {
  const { ID, no_of_orders } = args;
  const updateCustomerOrders = `UPDATE customers SET orders='${no_of_orders}' WHERE ID=${ID};`;
  return new Promise((res, rej) => {
    con.query(updateCustomerOrders, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

//orders

ipcMain.handle('fetchOrders', async (event, args) => {
  const query = `SELECT * FROM orders;`;
  return new Promise((res, rej) => {
    con.query(query, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

ipcMain.handle('addOrder', (event, args) => {
  const {
    createdAt,
    products,
    orderTotal,
    orderDiscount,
    discountedPrize,
    amountPaid,
    customerID,
  } = args;
  const addOrder = `INSERT INTO orders(createdAt, products, orderTotal, orderDiscount, discountedPrize, amountPaid, customerID) VALUES('${createdAt}', '${products}', '${orderTotal}', '${orderDiscount}', '${discountedPrize}', '${amountPaid}', '${customerID}');`;
  return new Promise((res, rej) => {
    con.query(addOrder, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});

ipcMain.handle('updateOrderAmountPaid', (event, args) => {
  const { ID, amountPaid } = args;
  const updateOrderAmountPaid = `UPDATE orders SET amountPaid='${amountPaid}' WHERE ID=${ID}`;
  return new Promise((res, rej) => {
    con.query(updateOrderAmountPaid, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});


//prescrition

ipcMain.handle('addPrescription', (event, args) => {
  const {
    customerID,
    lensID,
    lenstype,
    presciption
  } = args;
  const addPrescription = `INSERT INTO PRESCRIPTION(customerID, lensID, lenstype, prescription) VALUES('${customerID}','${lensID}','${lenstype}','${presciption}' );`;
  return new Promise((res, rej) => {
    con.query(addPrescription, (err, rows) => {
      if (err) rej(err);
      res(rows);
    });
  });
});


app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
