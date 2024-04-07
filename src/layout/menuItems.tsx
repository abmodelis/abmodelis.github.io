import AppsIcon from "@mui/icons-material/Apps";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { IMenuItem } from "types";

export const menuItems: IMenuItem[] = [
  {
    title: "Todos",
    icon: <AppsIcon />,
    onClick: () => {},
  },
  {
    title: "Archivados",
    icon: <ArchiveOutlinedIcon />,
    onClick: () => {},
  },
];