import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Layout from '../components/Layout';
import AddLens from '../components/Lens/AddLens/AddLens';
import ImportLens from '../components/Lens/AddLens/ImportLens';
import LensTable from '../components/Lens/LensTable/LensTable';

export default function Lens() {
  const [searchName, setSearchName] = useState('');
  const [addLens, setAddLens] = useState(false);
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  useEffect(() => {
    enable(true);
  }, [parent]);

  const handleAddLensCancel = () => {
    setAddLens(false);
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };
  const handleReset = () => {
    setSearchName('');
  };
  const handleAddLensChange = () => {
    setAddLens(true);
  };
  return (
    <Layout>
      <div ref={parent}>
        <div className="top" ref={parent}>
          <div className="searchBar">
            <input
              type="text"
              name="search"
              value={searchName}
              onChange={handleSearch}
              placeholder="Searche Lens..."
            />
            {searchName !== '' && (
              <button type="submit" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
          <div className="add">
            <button type="submit" onClick={handleAddLensChange}>
              + Add Lens
            </button>
          </div>
        </div>
        {addLens && <AddLens handleCancel={handleAddLensCancel} />}
        <ImportLens />
        <LensTable searchName={searchName} />
      </div>
    </Layout>
  );
}
