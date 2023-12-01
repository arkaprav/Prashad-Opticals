import { useEffect, useState } from 'react';
import { useApp } from '../../../../../../context/AppContext';

export default function FramesSearchResults({ handleSelect, searchName }) {
  const { frames } = useApp();
  const [searchedFrames, setSearchedFrames] = useState(frames);
  useEffect(() => {
    if (searchName !== '') {
      setSearchedFrames(
        frames.filter((frame) => {
          return (
            frame.code.toLowerCase().includes(searchName.toLowerCase()) ||
            frame.name.toLowerCase().includes(searchName.toLowerCase()) ||
            frame.brand.toLowerCase().includes(searchName.toLowerCase())
          );
        }),
      );
    } else {
      setSearchedFrames(frames);
    }
  }, [searchName]);
  const noFrame = <div className="no-search">No Frames Found...</div>;
  let frameLine = null;
  if (searchedFrames.lenght !== 0) {
    frameLine = searchedFrames.map((frame) => {
      return frame.inventory === 0 ? (
        <div className="searchLine" style={{ cursor: 'default' }}>
          {frame.code}-{frame.name}-{frame.brand}({frame.inventory})
        </div>
      ) : (
        <div
          className="searchLine"
          onClick={() => {
            handleSelect(
              frame.ID,
              `${frame.code}-${frame.name}-${frame.brand}`,
              frame.discount_price,
            );
          }}
        >
          {frame.code}-{frame.name}-{frame.brand}({frame.inventory})
        </div>
      );
    });
  }
  return (
    <div className="searchResults">
      {searchedFrames.length !== 0 ? frameLine : noFrame}
    </div>
  );
}
