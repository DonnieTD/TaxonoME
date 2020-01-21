import React,{useEffect} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import { withRouter,BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import axios from 'axios'
import store from "../../redux/store";
import {logOut} from '../../redux/actions/authActions';
import NewIdea from './Ideas/NewIdeas/NewIdea';
import ViewIdeas from './Ideas/ViewIdeas/ViewIdeas';
import SpecificIdea from './Ideas/SpecificIdea/SpecificIdea'
import './Dashboard.css';

function Dashboard(props) {
    
    async function logOut(){
        await axios.post('http://localhost:3131/users/logout', {},{withCredentials: true});  
        const response = await axios.post('http://localhost:3131/users/verify', {},{withCredentials: true});    
        
        if(response.data === false){
            props.logOut();         
        }  
    }

    useEffect(()=>{
  
        var verify = async function verify(){
          const response = await axios.post('http://localhost:3131/users/verify', {},{withCredentials: true});  
          
            console.log(response)
        //   if(response.data === false){
        //       window.location.reload();
        //   }
          
       };
      verify();
      
      
      },[props]);

    // Redirect if not logged in
    if(props.loggedIn){
        return (
            <Router>  
                <div>
                    <nav  className="hide-on-small-only  hide-on-med-only">
                        <div className="nav-wrapper"> 
                            <span style={{float:'left',paddingLeft:'2vw'}}>
                                <span className="brand-logo"><Link to='/'><span id="brandLogoStart">Taxono</span>ME</Link></span>
                            </span>                              
                            <Link to='/view' onClick={logOut}>
                                    Logout
                            </Link>   
                            <Link to='/view'>
                                    My Ideas
                            </Link>
                            <Link to='/new'>
                                    New Ideas
                            </Link>                        
                        </div>
                    </nav>

                    <nav  className="hide-on-large-only">
                        <div className="nav-wrapper"> 
                            <span style={{float:'left',paddingLeft:'2vw'}}>
                                <a href="#" className="brand-logo">TaxonoME</a>
                            </span>                            
                        </div>
                        <div className="nav-wrapper">
                            <ul id="nav-mobile" className="right"  style={{width:'100vw'}}>
                                    <li style={{width:'33.33333333333333333333333333333333333333333vw'}}>My Ideas</li>
                                    <li style={{width:'33.33333333333333333333333333333333333333333vw'}}>New Ideas</li>
                                    <li style={{width:'33.33333333333333333333333333333333333333333vw'}} onClick={logOut} className="logout">Logout</li>
                            </ul>
                        </div>
                    </nav>
                         
                    <div className="dashboard">                                                     
                            <Switch>
                                <Route path="/new" component={NewIdea} />              
                                <Route exact path="/view" component={ViewIdeas} /> 
                                <Route exact path="/view/:topic*" component={SpecificIdea} />                     
                            </Switch>               
                    </div>
                </div>
            </Router>
         )
    }else{
        return (
                <Redirect to="/"/>
         )
    }
   
}

Dashboard.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    userObj: state.auth.userObj
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
)(Dashboard);
