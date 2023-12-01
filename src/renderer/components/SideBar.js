import { NavLink } from 'react-router-dom';

export default function SideBar(params) {
  const menus = ['Frames', 'Lens', 'Orders', 'Customers'];
  const path = {
    Frames: '/',
    Lens: '/lens',
    Orders: '/orders',
    Customers: '/customers',
  };
  const menu = menus.map((menu) => {
    return (
      <NavLink to={path[menu]} key={menu}>
        {menu}
      </NavLink>
    );
  });
  return (
    <div className="sidebar">
      <h3>Apna Store</h3>
      {menu}
    </div>
  );
}
