import { useState } from 'react';
import { useApp } from '../../../../context/AppContext';

export default function OrderContactLenPrescription({
  customerID,
  lensID,
  handleAddPrescription,
}) {
  const { addPrescription } = useApp();
  const [added, setAdded] = useState(false);
  const [rightDistSph, setRightDistSph] = useState(0);
  const [rightDistCyl, setRightDistCyl] = useState(0);
  const [rightDistAxis, setRightDistAxis] = useState(0);
  const [leftDistSph, setLeftDistSph] = useState(0);
  const [leftDistCyl, setLeftDistCyl] = useState(0);
  const [leftDistAxis, setLeftDistAxis] = useState(0);
  const [rightNearSph, setRightNearSph] = useState(0);
  const [rightNearCyl, setRightNearCyl] = useState(0);
  const [rightNearAxis, setRightNearAxis] = useState(0);
  const [leftNearSph, setLeftNearSph] = useState(0);
  const [leftNearCyl, setLeftNearCyl] = useState(0);
  const [leftNearAxis, setLeftNearAxis] = useState(0);
  const [AddRight, setAddRight] = useState(0);
  const [AddLeft, setAddLeft] = useState(0);
  const sentTB = {
    rightDistSph,
    rightDistCyl,
    rightDistAxis,
    leftDistSph,
    leftDistCyl,
    leftDistAxis,
    rightNearSph,
    rightNearCyl,
    rightNearAxis,
    leftNearSph,
    leftNearCyl,
    leftNearAxis,
    AddRight,
    AddLeft,
  };

  const handleAdd = async () => {
    const res = await addPrescription(
      customerID,
      lensID,
      'ContactLens',
      sentTB,
    );
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
            <th>Dist Sph</th>
            <th>Dist Cyl</th>
            <th>Dist Axis</th>
            <th>Near Sph</th>
            <th>Near Cyl</th>
            <th>Near Axis</th>
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
                value={rightDistSph}
                onChange={(e) => setRightDistSph(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={rightDistCyl}
                onChange={(e) => setRightDistCyl(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                value={rightDistAxis}
                onChange={(e) => setRightDistAxis(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={rightNearSph}
                onChange={(e) => setRightNearSph(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={rightNearCyl}
                onChange={(e) => setRightNearCyl(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                value={rightNearAxis}
                onChange={(e) => setRightNearAxis(e.target.value)}
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
                value={leftDistSph}
                onChange={(e) => setLeftDistSph(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={leftDistCyl}
                onChange={(e) => setLeftDistCyl(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                value={leftDistAxis}
                onChange={(e) => setLeftDistAxis(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={leftNearSph}
                onChange={(e) => setLeftNearSph(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={leftNearCyl}
                onChange={(e) => setLeftNearCyl(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                value={leftNearAxis}
                onChange={(e) => setLeftNearAxis(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Add Right</th>
            <th>Add Left</th>
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
                value={AddLeft}
                onChange={(e) => setAddLeft(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={10}
                step={0.25}
                value={AddRight}
                onChange={(e) => setAddRight(e.target.value)}
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
