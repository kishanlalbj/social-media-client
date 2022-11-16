import { Card, CardActions, CardContent, CardHeader, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const PostCardSkeleton = () => {
  return (
    <Box sx={{ margin: '15px 0' }}>
      <Card>
        <CardHeader
          avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
          title={<Skeleton variant="rectangular" height="24" width="25%"></Skeleton>}
          subheader={<Skeleton width="10%"></Skeleton>}></CardHeader>

        <CardContent>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>

        <CardActions>
          <Skeleton animation="wave" variant="rounded" height={20} width={20} />
          <Skeleton animation="wave" variant="rounded" height={20} width={20} />
          <Skeleton animation="wave" variant="rounded" height={20} width={20} />
        </CardActions>
      </Card>
    </Box>
  );
};

export default PostCardSkeleton;
