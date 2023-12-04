import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from './context/AppContext';
import './App.css';
import Frames from './pages/Frames';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Lens from './pages/Lens';
import Prescriptions from './pages/Prescriptions';

export default function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Frames />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/lens" element={<Lens />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
        </Routes>
      </Router>
    </Provider>
  );
}
