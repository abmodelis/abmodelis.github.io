import { LoginNavBar, NavSidebar } from "components";
import { menuItems } from "./menuItems";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <LoginNavBar />
      <NavSidebar menuItems={menuItems}>{children}</NavSidebar>
    </>
  );
};
