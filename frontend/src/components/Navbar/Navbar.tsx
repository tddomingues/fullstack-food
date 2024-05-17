import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center py-5 px-32 bg-neutral-50">
      <NavLink to="/">Logo</NavLink>
      <ul className="flex items-center gap-4 px-16 w-full">
        <li className="transition ease-in-out delay-100 hover:text-destructive ">
          <NavLink to="/">Início</NavLink>
        </li>
        <li className="transition ease-in-out delay-100 hover:text-destructive ">
          <NavLink to="/menu">Menu</NavLink>
        </li>
      </ul>

      <ul className="flex items-center gap-4">
        <li>
          <Button variant="ghost">Entrar</Button>
        </li>
        <li>
          <Button variant="destructive">Cadastrar</Button>
        </li>
        <li>
          <NavLink to="/admin-painel">Admin</NavLink>
        </li>
        <li className="mr-5 transition ease-in-out delay-100 hover:text-destructive ">
          <NavLink to="/perfil">Perfil</NavLink>
        </li>
        <li>
          <FaCartShopping
            className="text-destructive hover:text-destructive/90 cursor-pointer"
            size={20}
          />
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
