import * as XLSX from 'xlsx';
import { useApp } from '../../../context/AppContext';

export default function ImportFrames(params) {
  const { addFrames } = useApp();

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
        } = row;
        await addFrames(
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
      + Import Frames
    </button>
  );
}
