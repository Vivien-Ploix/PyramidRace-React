import { AUTHENTICATION_SUCCESS, LOGOUT_SUCCESS } from "./authTypes";

export const authSuccess = (response) => {
  return {
    type: AUTHENTICATION_SUCCESS,
    id: parseInt(response.data.id),
    attributes: response.data.attributes,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
