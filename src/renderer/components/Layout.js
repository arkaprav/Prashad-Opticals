import SideBar from './SideBar';

export default function Layout({ children }) {
  return (
    <>
      <SideBar />
      <div className="main">{children}</div>
    </>
  );
}
