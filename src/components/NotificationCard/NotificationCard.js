import { Avatar, Card, CardContent, Container, Typography, useTheme } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { clearNotifyRequested, notifyReadRequested } from '../../redux/notifySlice';

const NotificationCard = (props) => {
  const { notifications } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNotifyClick = (id, url) => {
    dispatch(notifyReadRequested(id));
    navigate(url);
  };

  const handleClearAll = () => {
    dispatch(clearNotifyRequested());
  };

  return (
    <Card>
      <CardContent>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h6">Notifications</Typography>
          <Typography
            variant="span"
            onClick={handleClearAll}
            sx={{
              textDecoration: 'underline',
              color: theme.palette.primary.main,
              cursor: 'pointer'
            }}>
            Clear all
          </Typography>
        </Stack>
      </CardContent>

      <Box style={{ minHeight: '100px', maxHeight: '300px', overflowY: 'scroll' }}>
        {notifications.length === 0 && (
          <Container>
            <Typography variant="span" sx={{ fontSize: '12px' }}>
              No Notifications
            </Typography>
          </Container>
        )}
        {notifications.map((notify) => (
          <Stack
            onClick={() => handleNotifyClick(notify._id, notify.url)}
            key={notify._id}
            direction="row"
            alignItems={'center'}
            gap="5px"
            sx={{
              borderBottom: '1px solid #d8d8d8',
              padding: '10px',
              width: '100%',
              cursor: 'pointer',
              background: notify.isRead ? 'none' : '#e4effc'
            }}>
            <Avatar
              sx={{ width: 36, height: 36 }}
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></Avatar>
            <Typography style={{ firstWeight: 600 }}>
              {notify.senderId.firstName} {notify.senderId.lastName}
            </Typography>
            <p style={{ fontSize: '14px' }}> {notify.text} </p>
            {/* <Typography> post </Typography> */}
          </Stack>
        ))}
      </Box>
    </Card>
  );
};

export default NotificationCard;
