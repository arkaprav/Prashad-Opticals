export default function PrescriptionContactLensTable({ prescription }) {
  const {
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
  } = JSON.parse(prescription);
  return (
    <div className="prescription">
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
            <td>{rightDistSph}</td>
            <td>{rightDistCyl}</td>
            <td>{rightDistAxis}</td>
            <td>{rightNearSph}</td>
            <td>{rightNearCyl}</td>
            <td>{rightNearAxis}</td>
          </tr>
          <tr>
            <td>Left</td>
            <td>{leftDistSph}</td>
            <td>{leftDistCyl}</td>
            <td>{leftDistAxis}</td>
            <td>{leftNearSph}</td>
            <td>{leftNearCyl}</td>
            <td>{leftNearAxis}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Near Add Right</th>
            <th>Near Add Left</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{AddLeft}</td>
            <td>{AddRight}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
