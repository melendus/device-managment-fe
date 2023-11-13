import React from "react";
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Toolbar,
  useTheme,
} from "@mui/material";
import sizeConfigs from "../../../configs/sizeConfigs";
import colorConfigs from "../../../configs/colorConfigs";
import assets from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
interface SidebarNavProps {
  setToken: (value: string) => void;
}
const SidebarNav = ({ setToken }: SidebarNavProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { appState } = useSelector((state: RootState) => state.appState);
  const dispatch = useAppDispatch();

  const currentUserState = useAppSelector((state) => state.currentUser);
  const currentUser = currentUserState.currentUser;

  const handleClick = (route: any) => {
    navigate(route);
  };

  const handleSignOut = () => {
    localStorage.clear();
    setToken("");
    navigate("/");
    // dispatch(deleteUser());
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sizeConfigs.sidebar.width,
            boxSizing: "border-box",
            borderRight: "0px",
            backgroundColor: colorConfigs.sidebar.bg,
            color: colorConfigs.sidebar.color,
          },
        }}
      >
        <List disablePadding>
          <Toolbar
            sx={{
              marginBottom: "20px",
            }}
          >
            <Stack
              sx={{
                width: "100%",
              }}
              direction="row"
              justifyContent="center"
            >
              <Avatar src={assets.iamges.logo} />
            </Stack>
          </Toolbar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  "&: hover": {
                    backgroundColor: colorConfigs.sidebar.hoverBg,
                  },
                  backgroundColor: colorConfigs.sidebar.bg,
                  paddingY: "12px",
                  paddingX: "24px",
                }}
                onClick={() => handleClick("/dashboard")}
              >
                <ListItemIcon
                  sx={{
                    color: colorConfigs.sidebar.color,
                  }}
                >
                  <DashboardOutlinedIcon />
                </ListItemIcon>
                Dashboard
              </ListItemButton>
            </ListItem>
            {currentUser.role === "admin" && (
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    "&: hover": {
                      backgroundColor: colorConfigs.sidebar.hoverBg,
                    },
                    backgroundColor: colorConfigs.sidebar.bg,
                    paddingY: "12px",
                    paddingX: "24px",
                  }}
                  onClick={() => handleClick("/devices")}
                >
                  <ListItemIcon
                    sx={{
                      color: colorConfigs.sidebar.color,
                    }}
                  >
                    <PhoneIphoneIcon />
                  </ListItemIcon>
                  Devices
                </ListItemButton>
              </ListItem>
            )}
            {currentUser.role === "user" && (
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    "&: hover": {
                      backgroundColor: colorConfigs.sidebar.hoverBg,
                    },
                    backgroundColor: colorConfigs.sidebar.bg,
                    paddingY: "12px",
                    paddingX: "24px",
                  }}
                  onClick={() => handleClick("/devices")}
                >
                  <ListItemIcon
                    sx={{
                      color: colorConfigs.sidebar.color,
                    }}
                  >
                    <PhoneIphoneIcon />
                  </ListItemIcon>
                  My Devices
                </ListItemButton>
              </ListItem>
            )}
            {currentUser.role === "admin" && (
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    "&: hover": {
                      backgroundColor: colorConfigs.sidebar.hoverBg,
                    },
                    backgroundColor: colorConfigs.sidebar.bg,
                    paddingY: "12px",
                    paddingX: "24px",
                  }}
                  onClick={() => handleClick("/users")}
                >
                  <ListItemIcon
                    sx={{
                      color: colorConfigs.sidebar.color,
                    }}
                  >
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  Users
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  "&: hover": {
                    backgroundColor: colorConfigs.sidebar.hoverBg,
                  },
                  backgroundColor: colorConfigs.sidebar.bg,
                  paddingY: "12px",
                  paddingX: "24px",
                }}
                onClick={() => handleSignOut()}
              >
                <ListItemIcon
                  sx={{
                    color: colorConfigs.sidebar.color,
                  }}
                >
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                Sign Out
              </ListItemButton>
            </ListItem>
          </div>
        </List>
      </Drawer>
    </div>
  );
};

export default SidebarNav;
