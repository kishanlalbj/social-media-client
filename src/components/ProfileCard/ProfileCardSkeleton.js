import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import React from 'react';

const ProfileCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <center>
          <Skeleton animation="wave" variant="circular" height={120} width={120}></Skeleton>

          <Typography component="span" sx={{ mt: '50px' }}>
            <Skeleton animation="wave" width={50}></Skeleton>
            <Skeleton animation="wave" width={50}></Skeleton>
          </Typography>
        </center>

        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            mt: '20px',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}>
          <div>
            <Typography variant="subtitle2">
              <Skeleton animation="wave" width={40}></Skeleton>
            </Typography>
            <Typography variant="h6">
              <Skeleton animation="wave" width={20}></Skeleton>
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle2">
              <Skeleton animation="wave" width={40}></Skeleton>
            </Typography>
            <Typography variant="h6">
              <Skeleton animation="wave" width={20}></Skeleton>
            </Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCardSkeleton;
