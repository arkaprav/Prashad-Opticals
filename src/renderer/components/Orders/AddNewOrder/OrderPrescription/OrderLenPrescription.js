import { useState } from 'react';
import { useApp } from '../../../../context/AppContext';

export default function OrderLenPrescription({
  customerID,
  lensID,
  handleAddPrescription,
}) {
  const { addPrescription } = useApp();
  const [added, setAdded] = useState(false);
  const [rightSph, setRightSph] = useState(0);
  const [rightCyl, setRightCyl] = useState(0);
  const [rightAxis, setRightAxis] = useState(0);
  const [rightPD, setRightPD] = useState(0);
  const [rightVA, setRightVA] = useState('6/6');
  const [rightPrism, setRightPrism] = useState(0);
  const [leftSph, setLeftSph] = useState(0);
  const [leftCyl, setLeftCyl] = useState(0);
  const [leftAxis, setLeftAxis] = useState(0);
  const [leftPD, setLeftPD] = useState(0);
  const [leftVA, setLeftVA] = useState('6/6');
  const [leftPrism, setLeftPrism] = useState(0);
  const [nearAddRight, setNearAddRight] = useState(0);
  const [nearAddLeft, setNearAddLeft] = useState(0);
  const [IPD, setIPD] = useState(0);

  const sentTB = {
    rightSph,
    rightCyl,
    rightAxis,
    rightPD,
    rightVA,
    rightPrism,
    leftSph,
    leftCyl,
    leftAxis,
    leftPD,
    leftVA,
    leftPrism,
    nearAddRight,
    nearAddLeft,
    IPD,
  };

  const handleAdd = async () => {
    const res = await addPrescription(customerID, lensID, 'Lens', sentTB);
    if (res === true) {
      setAdded(true);
      handleAddPrescription();
    }
  };

  const tb = (
    <div className="products">
      <table>
        <thead>
          <tr>
            <th>Eyes</th>
            <th>Sph</th>
            <th>Cyl</th>
            <th>Axis</th>
            <th>PD</th>
            <th>VA</th>
            <th>Prism</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Right</td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={rightSph}
                onChange={(e) => setRightSph(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={rightCyl}
                onChange={(e) => setRightCyl(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                value={rightAxis}
                onChange={(e) => setRightAxis(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={rightPD}
                onChange={(e) => setRightPD(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={rightVA}
                onChange={(e) => setRightVA(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={rightPrism}
                onChange={(e) => setRightPrism(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Left</td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={leftSph}
                onChange={(e) => setLeftSph(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={leftCyl}
                onChange={(e) => setLeftCyl(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                value={leftAxis}
                onChange={(e) => setLeftAxis(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={leftPD}
                onChange={(e) => setLeftPD(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={leftVA}
                onChange={(e) => setLeftVA(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={leftPrism}
                onChange={(e) => setLeftPrism(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Near Add Right</th>
            <th>Near Add Left</th>
            <th>IPD</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={nearAddLeft}
                onChange={(e) => setNearAddLeft(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={nearAddRight}
                onChange={(e) => setNearAddRight(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={IPD}
                onChange={(e) => setIPD(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" onClick={handleAdd}>
        Add Prescription
      </button>
    </div>
  );

  return added ? null : tb;
}
