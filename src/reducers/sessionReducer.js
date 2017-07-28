import * as types from '../actions/sessionActions';
import auth from '../auth/authenticator';
let initialState =  {
  session: !!sessionStorage.jwt
}
export default function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
      alert('Logged In');
      return !!sessionStorage.jwt
    case types.LOG_OUT:
        auth.logOut();
        alert('Logged Out');
      return !!sessionStorage.jwt
    default: 
      return state;
  }
}