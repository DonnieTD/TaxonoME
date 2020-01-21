import React,{useEffect,useState} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import { withRouter,BrowserRouter as Link} from "react-router-dom";
import axios from 'axios'
import store from "../../../../redux/store";
import {logOut} from '../../../../redux/actions/authActions';
import './ViewIdeas.css';

function ViewIdeas(props) {
    let [ideas,setIdeas] = useState([]);
  
    console.log(ideas)
    useEffect((x)=>{
        (async function(){
            let response = await axios.post('http://localhost:3131/ideas/view',{},{withCredentials: true}) 
            
            if(response.data.length > 0){
               setIdeas(response.data)
               
            }else{
               setIdeas(ideas)
            }
        }())
    },[]);
    // Redirect if not logged in
    if(props.loggedIn){
        if(ideas.length > 0){
            return (
                <div>
                    {ideas.map((number) =>
                   
                            <div className="row cardRow">
                            <div className="col s12 m12">
                            <div className="card" style={{background:'transparent',border: 'solid 1px white',margin:'2vh auto',width:'60vw'}}>
                                <div className="card-content white-text">
                                <span className="card-title"> {number.Title}</span>
                                <p>{number.Text}</p>
                                </div>
                                <div className="card-action">
                                <a href={'http://localhost:3000/view/'+number.Title}>See Details</a>
                                <a href={'http://localhost:3000/delete/'+number.Title}>Delete Idea</a>
                                </div>
                            </div>
                            </div>
                            </div>                    
                        ) }                                         
                </div>
                 )
        }else{
                return (
                    <div>
                        <div className="row">
                            <div className="col s12 m12" style={{marginTop:'35vh'}}>
                               <h4> No Ideas have been captured</h4>
                            </div>
                        </div>


                    </div>
                )            
        }      
    }else{
        return (
                <Redirect to="/"/>
         )
    }
   
}

ViewIdeas.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    userObj: state.auth.userObj
});

export default withRouter(connect(
    mapStateToProps    
)(withRouter(ViewIdeas)));
