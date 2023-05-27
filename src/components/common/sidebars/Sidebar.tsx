import {
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Stack,
  Toolbar,
} from "@mui/material";
import sizeConfigs from "../../../configs/sizeConfigs";
import assets from "../../../assets";
import colorConfigs from "../../../configs/colorConfigs";
import appRoutes from "../../../routes/appRoutes";
import SidebarItem from "./SidebarItem";

type Props = {};

const Sidebar = (props: Props) => {
  return (
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
          {appRoutes.map((route, index) => (
            <SidebarItem item={route} key={index} />
          ))}
        </div>
      </List>
    </Drawer>
  );
};

export default Sidebar;
