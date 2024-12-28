import { Outlet, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const CustomNavLink = ({ to, children, ...props }) => {
  const isActive = location.pathname === to;
  return (
    <NavLink
      to={to}
      className={`nav-button ${isActive ? "active" : ""}`}
      {...props}
      onClick={(e) => {
        if (isActive) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </NavLink>
  );
};

CustomNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function NavBar() {
  return (
    <>
      <p>This the navbar</p>
      <CustomNavLink to={"/login"}>Login</CustomNavLink>
      <Outlet />
    </>
  );
}
