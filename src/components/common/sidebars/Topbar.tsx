import { AppBar, Toolbar, Typography } from "@mui/material";
import sizeConfigs from "../../../configs/sizeConfigs";
import colorConfigs from "../../../configs/colorConfigs";

const Topbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
        border: "1px solid #273746",
      }}
    >
      <Toolbar>
        <Typography variant="h6">StackOverflow</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
