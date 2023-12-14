import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Layout from '../components/Layout';
import AddContactLens from '../components/ContactLens/AddContactLens/AddContactLens';
import ImportContactLens from '../components/ContactLens/AddContactLens/importContactLens';
import ContactLensTable from '../components/ContactLens/ContactLensTable/ContactLensTable';

export default function ContactLens() {
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
              + Add Contact Lens
            </button>
          </div>
        </div>
        {addLens && <AddContactLens handleCancel={handleAddLensCancel} />}
        <ImportContactLens />
        <ContactLensTable searchName={searchName} />
      </div>
    </Layout>
  );
}
