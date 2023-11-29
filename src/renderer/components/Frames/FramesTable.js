import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import FramesTableLine from './FramesTableLine';

export default function FramesTable({ searchName }) {
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
  }, [searchName, frames]);
  const noProd = <div className="no-prod">No Products Found...</div>;
  let FramesOut;
  if (searchedFrames.length !== 0) {
    FramesOut = searchedFrames.map((frame) => {
      return <FramesTableLine frame={frame} />;
    });
  }
  return (
    <div className="products">
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Details</th>
            <th>Price</th>
            <th>HSN Code</th>
            <th>inventory</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{FramesOut}</tbody>
      </table>
      {searchedFrames.length === 0 && noProd}
    </div>
  );
}
