import "./index.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">
      <h2>Qwipo</h2>
    </div>
    <ul className="nav-links">
      <li>
        <a href="/">Add User</a>
      </li>
      <li>
        <a href="/users/">Users</a>
      </li>
    </ul>
  </nav>
);

export default Navbar;
