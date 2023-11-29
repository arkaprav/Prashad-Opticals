import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

export default function Customers(params) {
  const { customers } = useApp();
  console.log(customers);
  return <Layout>Customers...</Layout>;
}
