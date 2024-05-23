//router
import { NavLink, useNavigate } from "react-router-dom";

//components
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import Cart from "./Cart";
import { Button } from "./ui/button";

//styles
import { BsPerson } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store";
import { logout } from "../slice/userSlice";
import { useUserInfo } from "../hooks/useUserInfo";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, user } = useUserInfo();

  console.log("user user user ", user);

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
          {user && user.role === "client" && (
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
                {token && (
                  <MenubarItem>
                    <NavLink
                      to="/perfil"
                      className="transition ease-in-out delay-100 hover:text-destructive cursor-pointer"
                    >
                      Meus Dados
                    </NavLink>
                  </MenubarItem>
                )}
                <MenubarItem>
                  <NavLink
                    to="/admin-painel"
                    className="transition ease-in-out delay-100 hover:text-destructive cursor-pointer"
                  >
                    Admin
                  </NavLink>
                </MenubarItem>
                {/* <MenubarSeparator /> */}
                <MenubarSeparator />
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
