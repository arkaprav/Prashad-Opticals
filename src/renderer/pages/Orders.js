import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";

export default function Orders(params) {
  const { orders } = useApp();
  console.log(orders);
  return <Layout>Orders...</Layout>;
}
