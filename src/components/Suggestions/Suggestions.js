import { PersonAdd } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Suggestions = (props) => {
  const { users, onFollow, onProfileClick } = props;

  const handleClick = (id) => {
    onFollow(id);
  };

  const handleProfileClick = (id) => {
    onProfileClick(id);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">People You May know</Typography>
        </Box>
        <List>
          {users.map((u) => {
            return (
              <ListItem
                disablePadding
                key={u._id}
                secondaryAction={
                  <IconButton onClick={() => handleClick(u._id)}>
                    <PersonAdd color="primary" />
                  </IconButton>
                }>
                <ListItemButton onClick={() => handleProfileClick(u._id)}>
                  <ListItemAvatar>
                    <Avatar src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${u.firstName} ${u.lastName}`}
                    sx={{ fontSize: '12px' }}></ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default Suggestions;
