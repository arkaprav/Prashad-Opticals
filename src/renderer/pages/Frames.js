import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Layout from '../components/Layout';
import FramesTable from '../components/Frames/FramesTable';
import AddFrame from '../components/Frames/AddFrame/AddFrame';
import ImportFrames from '../components/Frames/AddFrame/ImportFrames';

export default function Frames(params) {
  const [searchName, setSearchName] = useState('');
  const [addFrame, setAddFrame] = useState(false);
  const [parent, enable] = useAutoAnimate({ duration: 350 });
  useEffect(() => {
    enable(true);
  }, [parent]);

  const handleAddFrameCancel = () => {
    setAddFrame(false);
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };
  const handleReset = () => {
    setSearchName('');
  };
  const handleAddFrameChange = () => {
    setAddFrame(true);
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
              placeholder="Searche Frames..."
            />
            {searchName !== '' && (
              <button type="submit" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
          <div className="add">
            <button type="submit" onClick={handleAddFrameChange}>
              + Add Frame
            </button>
          </div>
        </div>
        {addFrame && <AddFrame handleCancel={handleAddFrameCancel} />}
        <ImportFrames />
        <FramesTable searchName={searchName} />
      </div>
    </Layout>
  );
}
