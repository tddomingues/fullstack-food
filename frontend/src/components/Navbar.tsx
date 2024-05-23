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

//hooks
import { useUserInfo } from "../hooks/useUserInfo";

//styles
import { BsPerson } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";

//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logout } from "../slice/userSlice";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, user } = useUserInfo();

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex justify-between items-center py-5 px-32 bg-neutral-50">
      <NavLink to="/">Logo</NavLink>

      <div className="flex items-center gap-4">
        <ul className="flex items-center gap-4">
          {!token && (
            <>
              <li>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Entrar
                </Button>
              </li>
              <li>
                <Button variant="destructive">Cadastrar</Button>
              </li>
            </>
          )}
          {user?.role !== "admin" && (
            <li className="relative cursor-pointer ">
              <Cart />
            </li>
          )}
        </ul>
        {token && (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer ">
                <BsPerson className="text-destructive text-3xl hover:text-destructive/90" />
              </MenubarTrigger>
              <MenubarContent>
                {user?.role === "client" && (
                  <MenubarItem>
                    <NavLink
                      to="/perfil"
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
    </header>
  );
};

export default Navbar;
