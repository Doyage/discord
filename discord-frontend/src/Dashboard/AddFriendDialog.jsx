import React, { useEffect, useState } from 'react';
import { validateMail } from '../shared/utils/validator';
import InputWithLabel from '../shared/components/InputWithLabel';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import CustomPrimaryButton from '../shared/components/CustomPrimaryButton';
import { useDispatch } from 'react-redux';
import { sendFriendInvitation } from '../store/actions/friendsAction.js';

const AddFriendDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const [mail, setMail] = useState('');
  const [isFormValid, setIsFormValid] = useState('');

  const dispatch = useDispatch();

  const handleSendInvitation = () => {
    dispatch(
      sendFriendInvitation(
        {
          targetMailAddress: mail,
        },
        handleCloseDialog,
      ),
    );
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail('');
  };

  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography>Invite a Friend</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter e-mail of friend which you would like to invite
          </DialogContentText>
          <InputWithLabel
            label="Mail"
            type="text"
            value={mail}
            setValue={setMail}
            placeholder="Enter mail address"
          />
        </DialogContent>
        <DialogActions>
          <CustomPrimaryButton
            onClick={handleSendInvitation}
            disabled={!isFormValid}
            label="Send"
            additionalStyles={{
              marginLeft: '15px',
              marginRight: '15px',
              marginBottom: '10px',
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddFriendDialog;
