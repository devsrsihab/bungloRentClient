import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const MenuItems = () => {
  // auth context
  const {user} = useAuth()

  return (
    <ul
      tabIndex={0}
      className=" hidden sm:flex text-primary gap-6 mt-3 z-[1] p-2 font-semibold shadow-lg bg-white  rounded-md "
    >
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/create-shop">Create Shop</NavLink>
      </li>
      <li>
        <a  target="_blank" rel="noopener noreferrer" href="https://youtu.be/ZMvZaxRkHmY"> Watch Demo</a>
      </li>
      <li>
        <NavLink to="/subscription">Subscription</NavLink>
      </li>
      {
        user ? ''
        : 
        <>
        <li>
        <NavLink to="login">Login</NavLink>
      </li>
      <li>
        <NavLink to="signup">Register</NavLink>
      </li>
        </>
      }
      
    </ul>
  );
};

export default MenuItems;
