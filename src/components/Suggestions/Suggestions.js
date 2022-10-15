import { PersonAdd } from '@mui/icons-material';
import {
  Avatar,
  Button,
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
  const { users } = props;

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
                  <IconButton>
                    <PersonAdd />
                  </IconButton>
                }>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${u.firstName} ${u.lastName}`}></ListItemText>
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
