import React from "react";
import { RouteType } from "../../../routes/config";
import { Link, ListItemButton, ListItemIcon } from "@mui/material";
import colorConfigs from "../../../configs/colorConfigs";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useAppDispatch } from "../../../hooks/hooks";
import { deleteUser } from "../../../redux/slices/UserSlice";

type Props = {
  item: RouteType;
};
const SidebarItem = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const { appState } = useSelector((state: RootState) => state.appState);
  const onClick = () => {
    console.log("cacaca");
    localStorage.removeItem("token");
    localStorage.setItem("loggedIn", "false");
    dispatch(deleteUser());
  };

  return item.sidebarProps && item.path && item.state === "sign-out" ? (
    //@ts-ignore
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        "&: hover": {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        },
        backgroundColor:
          appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
        paddingY: "12px",
        paddingX: "24px",
      }}
      onClick={onClick}
    >
      <ListItemIcon
        sx={{
          color: colorConfigs.sidebar.color,
        }}
      >
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      {item.sidebarProps.displayText}
    </ListItemButton>
  ) : item.sidebarProps && item.path ? (
    //@ts-ignore
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        "&: hover": {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        },
        backgroundColor:
          appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
        paddingY: "12px",
        paddingX: "24px",
      }}
    >
      <ListItemIcon
        sx={{
          color: colorConfigs.sidebar.color,
        }}
      >
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      {item.sidebarProps.displayText}
    </ListItemButton>
  ) : null;
};

export default SidebarItem;
