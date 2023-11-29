export default function CustomerTableLine({ customer }) {
  const { ID, name, address, mail, mobile, orders } = customer;
  return (
    <tr key={ID}>
      <td>{name}</td>
      <td>{address}</td>
      <td>{mail}</td>
      <td>{mobile}</td>
      <td>{orders}</td>
    </tr>
  );
}
