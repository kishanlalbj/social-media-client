import { Avatar, Button, Card, CardContent, Modal, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4
};

const ProfileCard = (props) => {
  const { firstName, lastName, followers, following, onUnfollow } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalValues, setModalValues] = useState({
    title: '',
    value: []
  });

  const handleOpenFollowers = () => {
    setOpen(true);
    setModalValues((prev) => {
      return {
        ...prev,
        title: 'Followers',
        value: followers
      };
    });
  };

  const handleOpenFollowing = () => {
    setOpen(true);
    setModalValues((prev) => {
      return {
        ...prev,
        title: 'Following',
        value: following
      };
    });
  };

  const handleClose = () => setOpen(false);

  const handleUnFollow = (e, id) => {
    e.stopPropagation();
    onUnfollow(id);
  };

  const handleUserClick = (id) => {
    navigate(`/profile/${id}`);
  };

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
              <div role="button" onClick={handleOpenFollowing} style={{ cursor: 'pointer' }}>
                <Typography variant="subtitle2">Following</Typography>
                <Typography variant="h6">{following ? following.length : null}</Typography>
              </div>

              <div role="button" onClick={handleOpenFollowers} style={{ cursor: 'pointer' }}>
                <Typography variant="subtitle2">Followers</Typography>
                <Typography variant="h6">{followers ? followers.length : null}</Typography>
              </div>
            </Box>
          </center>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            {modalValues?.title}
          </Typography>
          <Box sx={{ minHeight: '150px', maxHeight: '350px', overflowY: 'scroll' }}>
            {modalValues?.value.map((item) => (
              <Box
                key={item._id}
                style={{ textDecoration: 'none', color: '#000' }}
                onClick={() => handleUserClick(item._id)}>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent="space-between"
                  gap="10px"
                  mt={2}>
                  <Stack direction={'row'} alignItems={'center'} gap="10px">
                    <Avatar>
                      {item?.firstName?.charAt(0)}
                      {item?.lastName?.charAt(0)}
                    </Avatar>

                    <Typography variant="p" sx={{ fontSize: '14px' }}>
                      {item?.firstName} {item?.lastName}
                    </Typography>
                  </Stack>

                  {modalValues.title.toLowerCase() === 'following' ? (
                    <>
                      <Button onClick={(e) => handleUnFollow(e, item._id)}> Unfollow</Button>
                    </>
                  ) : null}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileCard;
