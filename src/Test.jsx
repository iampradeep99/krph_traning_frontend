// Import necessary modules
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { Menu, ExpandLess, ExpandMore, Inbox, Mail } from "@mui/icons-material";

const Test = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState({});

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuClick = (menuKey) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <>
      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Collapsible Sidebar Example
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={() => handleMenuClick("menu1")}> {/* First Menu */}
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Menu 1" />
            {openMenu.menu1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMenu.menu1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Submenu 1.1" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Submenu 1.2" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => handleMenuClick("menu2")}> {/* Second Menu */}
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText primary="Menu 2" />
            {openMenu.menu2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMenu.menu2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Submenu 2.1" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Submenu 2.2" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>

      {/* Content placeholder */}
      <main style={{ marginTop: 64, padding: 16 }}>
        <Typography variant="body1">
          This is where your main application content goes.
        </Typography>
      </main>
    </>
  );
};

export default Test;