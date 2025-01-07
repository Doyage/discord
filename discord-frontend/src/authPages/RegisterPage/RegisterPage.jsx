import React, { useState, useEffect } from 'react';

import AuthBox from '../../shared/components/AuthBox';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterFooter';

import { Typography } from '@mui/material';
import { validateRegisterForm } from '../../shared/utils/validator';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../store/actions/authAction';

const RegisterPage = () => {
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(validateRegisterForm({ mail, username, password }));
  }, [mail, username, password, setIsFormValid]);

  const handleRegister = async () => {
    const userDetails = {
      mail,
      username,
      password,
    };

    const res = await dispatch(register(userDetails));
    if (res === 'error') {
      return;
    }
    navigate('/dashboard');
  };

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: 'white' }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

export default RegisterPage;
