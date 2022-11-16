import {
  Card,
  CardContent,
  Box,
  Typography,
  List,
  ListItem,
  Skeleton,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import React from 'react';

const SuggestionsSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">People You May know</Typography>
        </Box>
        <List>
          {[1, 2, 3].map((u) => {
            return (
              <ListItem
                disablePadding
                sx={{ mt: '10px' }}
                key={u}
                secondaryAction={
                  <Skeleton variant="rectangular" width={40} height={40}></Skeleton>
                }>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40}></Skeleton>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <span>
                      <Skeleton variant="rounded" width={80}></Skeleton>
                    </span>
                  }></ListItemText>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default SuggestionsSkeleton;
