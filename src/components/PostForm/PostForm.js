import { Send, Share } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  InputBase,
  Typography
} from '@mui/material';
import React from 'react';

const PostForm = () => {
  return (
    <>
      <Card sx={{ padding: '20px' }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Avatar src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></Avatar>
            <InputBase placeholder={`Whats in your mind ?`} fullWidth multiline rows={3} />
          </Box>
        </CardContent>
        <CardActions>
          <Typography sx={{ flexGrow: '1' }}></Typography>
          <Button startIcon={<Send />} variant="contained" size="small">
            Share
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PostForm;
