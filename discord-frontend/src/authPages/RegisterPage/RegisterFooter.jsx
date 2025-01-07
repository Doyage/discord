import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate();

  const getFormNotValidMessage = () => {
    return 'Enter correct usernamem, E-mail and password';
  };

  const getFormValidMessage = () => {
    return 'Press to register';
  };

  const handlePushToLoginPage = () => {
    navigate('/login');
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: '30px' }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text=" "
        redirectText="Already have an account?"
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;
