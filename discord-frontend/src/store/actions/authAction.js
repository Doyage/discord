import * as api from '../../api';
import { openAlertMessage } from './alertActions';

export const authActions = {
  SET_USER_DETAILS: 'SET_USER_DETAILS',
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails) => dispatch(login(userDetails)),
    register: (userDetails) => dispatch(register(userDetails)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

export const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

export const login = (user) => {
  return async (dispatch) => {
    const res = await api.login(user);
    if (res.error) {
      dispatch(openAlertMessage(res?.exception?.response?.data));
      return 'error';
    }

    const { userDetails } = res?.data;
    localStorage.setItem('user', JSON.stringify(userDetails));

    dispatch(setUserDetails(userDetails));
  };
};

export const register = (user) => {
  return async (dispatch) => {
    const res = await api.register(user);
    if (res.error) {
      dispatch(openAlertMessage(res?.exception?.response?.data));
      return 'error';
    }

    const { userDetails } = res?.data;
    localStorage.setItem('user', JSON.stringify(userDetails));

    dispatch(setUserDetails(userDetails));
  };
};
