import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route , Link} from "react-router-dom";
import {logOut} from '../redux/actions/authActions';
import store from "../redux/store";
// import './Entry.css';

// Components
import LoginForm from './LoginForm/LoginForm';
import Dashboard from './Dashboard/Dashboard'

function Entry(props) {
    if(!props.loggedIn){
        return (
             <LoginForm/>
        )  
    }else{
        return (
             <Dashboard/>
        )
    }
    
}

Entry.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = dispatch => {
    return {
      // dispatching actions returned by action creators
     logOut : () => dispatch(logOut())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Entry);
