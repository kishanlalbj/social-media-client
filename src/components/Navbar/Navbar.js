import { Logout, Mail, Notifications, Person } from '@mui/icons-material';
import {
  Badge,
  AppBar,
  Avatar,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
  styled,
  ListItem,
  ListItemButton,
  ListItemAvatar
} from '@mui/material';
import React, { useState } from 'react';

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex'
  }
}));

const Navbar = (props) => {
  const { authenticated, onLogout, notifications } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifyAnchorEl, setNotifyAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const openNotify = Boolean(notifyAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifyClose = () => {
    setNotifyAnchorEl(null);
  };

  const handleNotifyClick = (event) => {
    setNotifyAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Twinstabook
        </Typography>
        {authenticated ? (
          <>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Icons>
                <Badge badgeContent={2} color="error">
                  <Mail />
                </Badge>
                <Badge
                  badgeContent={notifications.length || 0}
                  color="error"
                  onClick={handleNotifyClick}
                  sx={{ cursor: 'pointer' }}>
                  <Notifications />
                </Badge>
              </Icons>
              <IconButton size="small" onClick={handleClick}>
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}>
                <MenuItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={onLogout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText>Signout</ListItemText>
                </MenuItem>
              </Menu>

              <Menu
                anchorEl={notifyAnchorEl}
                id="account-menu"
                open={openNotify}
                onClose={handleNotifyClose}
                onClick={handleNotifyClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: '350px',
                    minHeight: '150px',
                    maxHeight: '450px',
                    overflowY: 'scroll',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0
                    }
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                {notifications.length == 0 ? (
                  <ListItem>
                    <ListItemText>No Notifications</ListItemText>
                  </ListItem>
                ) : (
                  notifications.map((notify) => {
                    return (
                      <ListItem disablePadding key={notify._id}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"></Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${notify.senderId.firstName} ${notify.senderId.lastName}`}
                            secondary={notify.text}></ListItemText>
                        </ListItemButton>
                      </ListItem>
                    );
                  })
                )}
              </Menu>
            </Box>
          </>
        ) : (
          <Button color="inherit">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
