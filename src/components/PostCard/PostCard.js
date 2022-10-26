import { Comment, Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography
} from '@mui/material';
import moment from 'moment/moment';
import React from 'react';

const PostCard = (props) => {
  const { id, firstName, lastName, text, likes, createdAt, liked, onLike } = props;

  const handleLike = (id) => {
    onLike(id, liked);
  };

  return (
    <Box sx={{ margin: '15px 0' }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"></Avatar>
          }
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={`${firstName} ${lastName}`}
          subheader={moment(createdAt).fromNow()}></CardHeader>

        <CardContent>
          <Typography paragraph>{text}</Typography>
        </CardContent>

        <CardActions disableSpacing>
          <div>
            <IconButton>
              {likes.length > 0 && <Typography component={'span'}>{likes.length}</Typography>}
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite></Favorite>}
                checked={liked}
                onChange={() => handleLike(id)}></Checkbox>
            </IconButton>
          </div>

          <IconButton>
            <Comment />
          </IconButton>
        </CardActions>

        <CardContent>
          <Box md={12}>
            <Avatar
              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
              sx={{ width: 18, height: 18 }}></Avatar>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostCard;
