import {
    LOGIN,
    LOGOUT
  } from "../actions/types";
  
  const initialState = {
    loggedIn: false,
    userObj:{}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,          
          loggedIn: true,
          userObj: action.userObj
        };
      case LOGOUT:
        return {
          ...state,          
          loggedIn: false,
          userObj: {}
        };
      default:
        return state;
    }
  }

  // MY OWN SHIT BASED ON SHIT ABOVE