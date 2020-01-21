import React,{useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { connect} from "react-redux";
import axios from 'axios';
import {Redirect } from 'react-router-dom';
import M from 'materialize-css'
import './LoginForm.css';
import {logIn} from '../../redux/actions/authActions';
import store from '../../redux/store';

function LoginForm(props){

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    try{
      const response = await axios.post('http://localhost:3131/users/login', {
      UserName:UserName,
      Password:Password,
      },{
        withCredentials: true
      });   
  
      store.dispatch(logIn(response.data[0]))
      
    }catch(e){
      console.log(e)
    }
  
  };

  useEffect(()=>{
  
    var verify = async function verify(){
      const response = await axios.post('http://localhost:3131/users/verify', {},{withCredentials: true});  
      console.log(response)
      if(typeof response.data == 'object' && response.data){
          store.dispatch(logIn(response.data)); 
      }
   };
  verify();
  
  },[]);

  if (props.loggedIn) {
    return (<Redirect push to="/" />);
  }else{
    return (
      <div id="loginFormWrapper">
        <form onSubmit={handleSubmit} id="loginForm">
         <div className="row noMargin headingRow" >
                <h5 style={{marginBottom: '3vh'}}>Login:</h5>
          </div>
          <div className="input-field col s12 noMargin">
            <input
              type="text"
              className="validate"
              placeholder="User name"
              type="text"
              onChange={event => setUserName(event.target.value)}
              required
            />
          </div>
          <div className="input-field col s12 noMargin">
            <input
              type="text"
              className="validate"
              placeholder="Password"
              type="password"
              onChange={event => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="input-field" style={{background:'transparent',border:'none'}}>
          <svg id="loginSvg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="50" height="50"
              viewBox="0 0 172 172"
              style={{ fill: 'white' }}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,6.88c-33.51271,0 -62.18313,20.87795 -73.69797,50.35031c-0.51407,1.15767 -0.35041,2.50418 0.426,3.50501c0.77641,1.00082 2.03998,1.49405 3.2891,1.28389c1.24912,-0.21017 2.28171,-1.08973 2.68787,-2.28952c10.50804,-26.89547 36.63795,-45.96969 67.295,-45.96969c39.9368,0 72.24,32.3032 72.24,72.24c0,39.9368 -32.3032,72.24 -72.24,72.24c-30.65705,0 -56.78696,-19.07421 -67.295,-45.96969c-0.40616,-1.19979 -1.43875,-2.07935 -2.68787,-2.28952c-1.24912,-0.21017 -2.51269,0.28306 -3.2891,1.28389c-0.77641,1.00082 -0.94007,2.34733 -0.426,3.50501c11.51483,29.47237 40.18526,50.35031 73.69797,50.35031c43.6552,0 79.12,-35.4648 79.12,-79.12c0,-43.6552 -35.4648,-79.12 -79.12,-79.12zM89.4064,55.0064c-1.39982,0.00037 -2.65984,0.84884 -3.18658,2.14577c-0.52674,1.29693 -0.21516,2.7837 0.78799,3.76001l21.64781,21.64781h-98.33563c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h98.33563l-21.64781,21.64781c-0.89867,0.86281 -1.26068,2.14404 -0.94641,3.34956c0.31427,1.20552 1.2557,2.14696 2.46122,2.46122c1.20552,0.31427 2.48675,-0.04774 3.34956,-0.94641l27.52,-27.52c1.34287,-1.34342 1.34287,-3.52095 0,-4.86437l-27.52,-27.52c-0.64765,-0.66575 -1.53698,-1.04135 -2.46578,-1.04141z"></path></g></g></svg>        
          </button>
          <div className="noMargin" style={{textAlign:'center',padding:'2vh'}}>
            <p>Still need an account ?</p>
          </div>
        </form>
      </div>
    );
  }
  
}

LoginForm.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
   logIn : (userObj) => dispatch(logIn(userObj))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);