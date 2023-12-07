export default function PrescriptionLensTable({ prescription }) {
  const {
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
  } = JSON.parse(prescription);
  return (
    <div className="prescription">
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
            <td>{rightSph}</td>
            <td>{rightCyl}</td>
            <td>{rightAxis}</td>
            <td>{rightPD}</td>
            <td>{rightVA}</td>
            <td>{rightPrism}</td>
          </tr>
          <tr>
            <td>Left</td>
            <td>{leftSph}</td>
            <td>{leftCyl}</td>
            <td>{leftAxis}</td>
            <td>{leftPD}</td>
            <td>{leftVA}</td>
            <td>{leftPrism}</td>
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
            <td>{nearAddLeft}</td>
            <td>{nearAddRight}</td>
            <td>{IPD}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
