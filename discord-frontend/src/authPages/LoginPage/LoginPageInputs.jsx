import React from 'react';
import InputWithLabel from '../../shared/components/InputWithLabel';

const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  return (
    <>
      <InputWithLabel
        type="text"
        value={mail}
        setValue={setMail}
        label="E-mail"
        placeholder="Enter E-mail"
      />
      <InputWithLabel
        type="password"
        value={password}
        setValue={setPassword}
        label="Password"
        placeholder="Enter Password"
      />
    </>
  );
};

export default LoginPageInputs;
