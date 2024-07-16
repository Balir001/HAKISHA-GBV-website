import { Link, useLocation } from "react-router-dom";
import "../App.css"

export const Nav = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <Link to="/" className={location.pathname === "/" ? 'active' : ''}>Home</Link>
      
      <Link to="/Login" className={location.pathname === "/Login" ? 'active' : ''}>Login</Link>
     

    </div>
  );
};
