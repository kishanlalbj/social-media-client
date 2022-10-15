import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ProfileCard = (props) => {
  const { firstName, lastName, followers, following } = props;

  return (
    <>
      <Card>
        <CardContent>
          <center>
            <Avatar
              sx={{ width: 120, height: 120 }}
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></Avatar>

            <Typography variant="h4" sx={{ mt: '20px' }}>
              {firstName} {lastName}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: '1rem',
                mt: '20px',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}>
              <div>
                <Typography variant="subtitle2">Following</Typography>
                <Typography variant="h6">{following.length}</Typography>
              </div>

              <div>
                <Typography variant="subtitle2">Followers</Typography>
                <Typography variant="h6">{followers.length}</Typography>
              </div>
            </Box>
          </center>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileCard;
