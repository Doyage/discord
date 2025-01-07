import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AuthBox from '../../shared/components/AuthBox.jsx';
import { validateLoginForm } from '../../shared/utils/validator.js';
import { login } from '../../store/actions/authAction.js';

import LoginPageHeaer from './LoginPageHeaer.jsx';
import LoginPageInputs from './LoginPageInputs.jsx';
import LoginPageFooter from './LoginPageFooter.jsx';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = async () => {
    const userDetails = {
      mail,
      password,
    };

    const res = await dispatch(login(userDetails));
    if (res === 'error') {
      return;
    }
    navigate('/dashboard');
  };

  return (
    <AuthBox>
      <LoginPageHeaer />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

export default LoginPage;
