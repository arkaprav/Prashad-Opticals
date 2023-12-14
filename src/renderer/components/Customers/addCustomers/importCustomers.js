import * as XLSX from 'xlsx';
import { useApp } from '../../../context/AppContext';

export default function ImportCustomer() {
  const { addCustomers } = useApp();

  const readExcel = (e) => {
    const readFile = e.target.result;
    const workbook = XLSX.read(readFile, {
      type: 'binary',
    });
    workbook.SheetNames.forEach((sheetName) => {
      const XL_row_object = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheetName],
      );
      XL_row_object.map(async (row) => {
        const { name, address, mail, mobile } = row;
        await addCustomers(name, address, mail, mobile);
      });
      window.location.reload();
    });
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    const file = files[0];
    const fileName = file.name;
    const ext = fileName.split('.')[1];
    if (ext !== 'xlsx') {
      alert('Upload an excel file with .xlsx extension');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      readExcel(e);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
    reader.readAsBinaryString(file);
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      handleUpload(e);
    };
    input.click();
  };
  return (
    <button type="submit" className="import" onClick={handleClick}>
      + Import Customers
    </button>
  );
}
