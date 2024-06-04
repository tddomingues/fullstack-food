//router
import { NavLink, useNavigate } from "react-router-dom";

//components
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import Cart from "./Cart";
import { Button } from "./ui/button";

//styles
import { LuLogOut } from "react-icons/lu";

//image
import Perfil from "../assets/perfil.jpg";

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store";
import { logout } from "../slice/userSlice";

//interfaces
import { UserProps } from "../interfaces/UserProps";

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector<IRootState, UserProps | undefined>(
    (state) => state.user.user,
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className="flex justify-between items-center py-8">
        <NavLink to="/">Logo</NavLink>
        <div className="flex items-center gap-4 ">
          <ul className="flex items-center  gap-4">
            {!user && (
              <li>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Entrar
                </Button>
              </li>
            )}
            {user?.role !== "admin" && (
              <li className="relative cursor-pointer mt-2">
                <Cart />
              </li>
            )}
          </ul>
          {user && (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">
                  <img
                    src={Perfil}
                    alt="Imagem de perfil"
                    className="w-10 h-10 rounded-full"
                  />
                </MenubarTrigger>
                <MenubarContent>
                  {user?.role === "client" && (
                    <MenubarItem>
                      <NavLink
                        to={`/orders/${user._id}`}
                        className="transition ease-in-out delay-100 hover:text-destructive cursor-pointer"
                      >
                        Pedidos
                      </NavLink>
                    </MenubarItem>
                  )}

                  <MenubarItem onClick={handleLogout}>
                    <div className="transition ease-in-out delay-100 hover:text-destructive cursor-pointer flex gap-2 items-center">
                      <span>Sair</span>
                      <LuLogOut />
                    </div>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
