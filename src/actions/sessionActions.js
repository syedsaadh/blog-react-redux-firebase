import sessionApi from '../api/sessionApi';
import auth from '../auth/authenticator';

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION';
export const FAILED_AUTHENTICATION = 'FAILED_AUTHENTICATION';

export const authenticationRequest = () => ({
    type: REQUEST_AUTHENTICATION
})
export const loginSuccess = () => ({
    type: LOG_IN_SUCCESS
})
export const loginFailed = () => ({
    type: FAILED_AUTHENTICATION
})
export const logOutUser = () => ({
    type: LOG_OUT
})
export const authenticate =  () => dispatch => {
  dispatch(authenticationRequest())
  return sessionApi.login()
  .then( response =>  {
    sessionStorage.setItem('jwt', response.credential.accessToken);
    console.log(response.user);
    dispatch(loginSuccess())
  }, error => {
    console.log(error);
    dispatch(loginFailed())
  })
}
export const deauthenticate = () => dispatch => {
    return sessionApi.logout()
    .then ( response => {
        dispatch(logOutUser());
    })
}