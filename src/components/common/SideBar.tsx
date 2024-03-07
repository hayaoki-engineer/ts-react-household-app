import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React, { CSSProperties } from 'react'
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from '@mui/icons-material/BarChart';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void,
}

interface menuItem {
  text: string,
  path: string,
  icon: React.ComponentType,
}

const SideBar = ({ drawerWidth, mobileOpen, handleDrawerTransitionEnd, handleDrawerClose }: SidebarProps) => {
  
  const MenuItems: menuItem[] = [
    {text: "Home", path: "/", icon: HomeIcon},
    {text: "Report", path: "/report", icon: BarChartIcon}
  ]


  const baseLinkStyle: CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "block"
  }

  const activeLinkStyle: CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.08)"
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {MenuItems.map((item, index) => (
          <NavLink key={item.text} to={item.path} style={({ isActive }) => {
            // console.log("選択されたメニュー", item.text, isActive)
            return {
              ...baseLinkStyle,
              ...(isActive ? activeLinkStyle: {})
            }
          }}>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/*index % 2 === 0 ? <InboxIcon /> : <MailIcon />*/}
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );
  
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* モバイル */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* PC */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideBar