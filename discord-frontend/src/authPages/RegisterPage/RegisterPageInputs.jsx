import React from 'react';
import InputWithLabel from '../../shared/components/InputWithLabel';

const RegisterPageInputs = (props) => {
  const { mail, setMail, password, setPassword, username, setUsername } = props;

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
        type="text"
        value={username}
        setValue={setUsername}
        label="Username"
        placeholder="Enter a username"
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

export default RegisterPageInputs;
