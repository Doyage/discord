import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeAlertMessage } from '../../store/actions/alertActions';

const AlertNotification = () => {
  const showAlertMessage = useSelector((state) => state.alert.showAlertMessage);
  const alertMessageContent = useSelector(
    (state) => state.alert.alertMessageContent,
  );
  const dispatch = useDispatch();

  const closeAlert = () => {
    dispatch(closeAlertMessage());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={showAlertMessage}
      onClose={closeAlert}
      autoHideDuration={1000}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  );
};

export default AlertNotification;
