import React,{useEffect} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import { withRouter,BrowserRouter as Link} from "react-router-dom";
import axios from 'axios'
import store from "../../../../redux/store";
import {logOut} from '../../../../redux/actions/authActions';
import './NewIdea.css';

function NewIdea(props) {

    async function handleSubmit(e){
        e.preventDefault();
        try{
            let response = await axios.post('http://localhost:3131/ideas/new',{title:e.target[0].value,text:e.target[1].value},{withCredentials: true})       
            console.log(response)  
        }catch(e){
            if(e.response.status == 401){
                window.location.reload();
            }else if(e.response.status == 404){
                alert('Topic already exists!')
            }
        }
      
    };

    console.log('ran')
    // Redirect if not logged in
    if(props.loggedIn){
        return (
                <div>
                     <form style={{width:'50vw',padding:'2vw'}}  id="ideaForm" onSubmit={handleSubmit}>
                        <div className="input-field col s12 noMargin">
                            <h4>New Idea</h4>
                        </div>
                        <div className="input-field col s12 noMargin">
                            <input
                            style={{background:'white',color:'black'}}
                            type="text"
                            placeholder="Title"
                            type="text"
                            // onChange={event => setUserName(event.target.value)}
                            required
                            />
                        </div>
                        <div className="input-field col s12 noMargin">
                            <textarea
                            
                            style={{background:'white',color:'black',height:'40vh'}}
                            type="text"
                            className="materialize-textarea"
                            placeholder="Text"
                            type="text"
                            // onChange={event => setUserName(event.target.value)}
                            required
                            ></textarea>
                        </div>
                        <div className="input-field col s12 noMargin">
                            <button className="btn waves-effect waves-light" type="submit" name="action">
                                <i className="material-icons">Submit</i>
                            </button>
                        </div>
                     </form>
                </div>
         )
    }else{
        return (
                <Redirect to="/"/>
         )
    }
   
}

NewIdea.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    userObj: state.auth.userObj
});

export default withRouter(connect(
    mapStateToProps    
)(withRouter(NewIdea)));
