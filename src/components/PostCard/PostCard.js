import { Comment, Delete, Favorite, FavoriteBorder, MoreVert, Send } from '@mui/icons-material';

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import moment from 'moment/moment';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context';

const PostCard = (props) => {
  const {
    id,
    firstName,
    lastName,
    text,
    likes,
    createdAt,
    liked,
    onLike,
    comments = [],
    owner,
    onDelete,
    onPostClick,
    onComment,
    fullView = false
  } = props;
  const { userId } = useContext(AuthContext);
  const [commentText, setCommentText] = useState('');
  const [com, setCom] = useState([...comments]);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onLike(id, liked);
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handlePostClick = () => {
    // console.log('--', id, e.target);
    if (!onPostClick) return;
    onPostClick(id);
  };

  const handleCommentText = () => {
    if (!commentText) return '';

    onComment(id, commentText);
    setCommentText('');
  };

  useEffect(() => {
    if (!fullView) setCom([...comments.slice(-2)]);
  }, [comments]);

  return (
    <Box sx={{ margin: '15px 0' }}>
      <Card onClick={handlePostClick}>
        <CardHeader
          sx={{ fontWeight: 700 }}
          avatar={
            <Avatar src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"></Avatar>
          }
          action={
            userId === owner ? (
              <IconButton onClick={handleMoreClick}>
                <MoreVert color="primary" />
              </IconButton>
            ) : null
          }
          title={`${firstName} ${lastName}`}
          subheader={moment(createdAt).fromNow()}></CardHeader>

        <CardContent>
          <Typography paragraph>{text}</Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton onClick={handleLike}>
            {likes.length > 0 && <Typography component={'span'}>{likes.length}</Typography>}

            {!liked ? <FavoriteBorder color="primary" /> : <Favorite color="primary" />}
          </IconButton>

          <IconButton>
            <Comment color="primary" />
          </IconButton>
        </CardActions>

        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              flex
              alignItems={'center'}
              justifyContent="space-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%' }}>
                <Avatar
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                  sx={{ width: 24, height: 24 }}></Avatar>
                <TextField
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  name="comment"
                  variant="standard"
                  fullWidth
                  placeholder="Your comment"
                  size="small"></TextField>
              </div>
              <IconButton onClick={handleCommentText} color="inherit">
                <Send color="primary" />
              </IconButton>
            </Stack>
            <>
              {!fullView && comments.length > 2 && (
                <Typography variant="subtitle2" sx={{ fontSize: '10px' }}>
                  View previous comments
                </Typography>
              )}
            </>
            {com.map((item) => (
              <Box
                key={item._id}
                sx={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%' }}>
                <Avatar
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                  sx={{ width: 24, height: 24 }}></Avatar>
                <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>
                  {item?.user?.firstName} {item?.user?.lastName}
                </Typography>

                <Typography sx={{ fontSize: '12px' }}>{item.text}</Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PostCard;
