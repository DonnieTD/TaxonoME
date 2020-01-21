import React,{useEffect,useState} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import { withRouter,BrowserRouter as Link} from "react-router-dom";
import axios from 'axios'
import store from "../../../../redux/store";
import {logOut} from '../../../../redux/actions/authActions';
import './SpecificIdea';

function SpecificIdea(props) {
    const [title,setTitle] = useState("");
    const [textArr,setTextArr] = useState([]);
    useEffect((x)=>{
       (async function(topic){
       
        //  console.log()
        if(topic.indexOf('/') == -1){
            try{
                let response = await axios.post('http://localhost:3131/ideas/view'+'/'+topic,{},{withCredentials: true})

                setTextArr(response.data.Text.split('\n'));
                setTitle(response.data.Title);   
            }catch(e){
                setTextArr(textArr);
                setTitle(title)
            }  
        }
                   
               
       }(props.match.params.topic))
       
    },[])

    // Redirect if not logged in
    if(props.loggedIn){
        if(textArr.length > 0){
            return(
                <div>
                     <h4 style={{display:"inline-block"}}>{title}</h4>
                                        
                      {textArr.map((x)=>{
                          return(
                              <p >{x}</p>
                          )
                      })}   
                        <button>
                          Add New Sub Idea
                      </button>&nbsp;
                      <button>
                          Remove this idea and sub ideas
                      </button>
                </div>
              )
        }else{
            return(
                <div>
                     Doesn't work yet
                </div>
              )
        }
      
    }else{
        return (
                <Redirect to="/"/>
         )
    }
   
}

SpecificIdea.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    userObj: state.auth.userObj
});

export default withRouter(connect(
    mapStateToProps    
)(withRouter(SpecificIdea)));
