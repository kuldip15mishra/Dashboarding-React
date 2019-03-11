import React, { Component, Fragment } from "react";
import * as userAvatar from'../../../assets/images/user-avatar.png';
import * as logo from'../../../assets/images/unleash-logo.png';
import * as logoText from'../../../assets/images/solution-viewer.svg';
import CONFIG  from '../../config';
import HttpClient from "../../service/apiService";
import { apiURL } from "../../constants/Constants";
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import $ from 'jquery';

const httpClient = new HttpClient();

class Header extends Component {


    state={
        logout: false,
        username:localStorage.getItem("username") 
    }
   onLogout = (e) => {
  

    var userID= localStorage.getItem("userID")
    var sessionID= localStorage.getItem("sessionID")
    var resource= localStorage.getItem("resource")
    var headers= {
        'user-id': userID,
        'session-id':sessionID,
        'app-id':resource
    }

  
        httpClient.get(apiURL.LOGOUT,headers)
        .then(response => {
            console.log(response)
         //   this.props.resetMyTrend();
           // this.props.newTrend();
        //    this.props.resetTrenderAreaStore();
            localStorage.removeItem("userID");
            localStorage.removeItem("username"); 
            this.setState({logout: true})

         
            
        })
        .catch(error => {
            console.log(error);
        });
    

        

    }

    toggleMenuSidebar=()=>{
        $(".left-sidebar").addClass("open");
        
      }
    

    render(){


        if(this.state.logout== true){
            return(
                <Redirect to="/login" />
            )
        }

        else{

        return (
            <Fragment>
            <header id="topnav" className="mobile-none">
             <div className="topbar-main">
                   <div className="container-fluid">
                 
                     <div className="logo">
                      
                         <a href="index.html" className="logo" style={{'marginLeft':'-14px'}}>
                             <img src={logo} alt="" />
                             <span className="logo-title ml-3">
                               <img src={logoText} />     
                         </span>
                             
                         </a>
                         {/*   */}
                     </div>
           
           
                     <div className="menu-extras topbar-custom float-right mb-0">
                           
                         <ul className="list-unstyled topbar-right-menu ">
                         <li>
                             <a target="_blank" href={CONFIG.workbenchURL}>
                             <i className="icon dd-workbench"></i>
                             <span>Workbench</span>
                             </a>
                             </li>
                             <li>
                             <a target="_blank" href={ CONFIG.trenderURL + "?sessionID=" + localStorage.getItem("session") + "&appID="+ localStorage.getItem("res") +"&userID="+ localStorage.getItem("user")+ "&username=Guest"}>
                             <i className="icon dd-trender"></i>
                             <span>Trender</span>
                             </a>
                             </li>
                             <li className="dropdown user-profile">
                                 <a className="nav-link dropdown-toggle waves-effect nav-user" data-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                    Welcome, <span className="mr-2 pro-user-name"> {this.state.username} </span>
                                     
                                    <img src={userAvatar} alt="" className="rounded-circle" />
                                 </a>
                                 <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                    
                                     <a href="javascript:void(0);" className="dropdown-item notify-item">
                                         <i className="ti-user"></i> <span>My Account</span>
                                     </a>
           
                                     <a href="javascript:void(0);" className="dropdown-item notify-item" onClick={this.onLogout}>
                                         <i className="ti-power-off"></i> <span>Logout</span>
                                     </a>
           
                                 </div>
                             </li>
                             
                         </ul>
                     </div>
                    
           
                     <div className="clearfix"></div>
           
                 </div>
             </div>
            
           
           </header>
           <header className="mobile-header">
           <button className="mobile-nav-btn" id="menu-toggle-btn" onClick={this.toggleMenuSidebar} ><i className="fa fa-bars"></i></button>
           <p className="heading">Signal Explorer</p>
           <ul className="list-unstyled topbar-right-menu ">
                        
                             <li className="dropdown user-profile">
                                 <a className="nav-link dropdown-toggle waves-effect nav-user" data-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                   <span className="mr-2 pro-user-name"> {this.state.username} </span>
                                     
                                    <img src={userAvatar} alt="" className="rounded-circle" />
                                 </a>
                                 <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                    
                                     <a href="javascript:void(0);" className="dropdown-item notify-item">
                                         <i className="ti-user"></i> <span>My Account</span>
                                     </a>
           
                                     <a href="javascript:void(0);" className="dropdown-item notify-item" onClick={this.onLogout}>
                                         <i className="ti-power-off"></i> <span>Logout</span>
                                     </a>
           
                                 </div>
                             </li>
                             
                         </ul>
           </header>
           </Fragment>
           

           
        );
        }
    }
    }


export default Header;