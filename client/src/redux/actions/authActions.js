import axios from "axios";

import {
  LOGIN,
  LOGOUT
} from "./types";

// Login - get user token
// export const loginUser = userData => dispatch => {
//   axios
//     .post("/api/users/login", userData)
//     .then(res => {
//       // Save to localStorage
//       // Set token to localStorage
//       const { token } = res.data;
//       localStorage.setItem("jwtToken", token);
//       // Set token to Auth header
//       setAuthToken(token);
//       // Decode token to get user data
//       const decoded = jwt_decode(token);
//       // Set current user
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// Action Creators
//  const logIn = value => {
//   console.log(value)
//   return {
//     type: LOGIN,  
//     userObj: value
//   };
// };

export const logIn =  function(value) {
  return {
    type: LOGIN,  
    userObj: value
  };
}

export const logOut = value => {
  return {
    type: LOGOUT, 
    userObj:{}
  };
};



