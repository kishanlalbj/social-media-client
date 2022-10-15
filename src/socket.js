import React, { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { addNotification } from './redux/notifySlice';
import socketIO from './utils/socket';

const socket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketIO.on('notify_liked', (data) => {
      dispatch(addNotification(data));
    });
  }, [socket]);

  return null;
};

export default socket;
