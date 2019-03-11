import React, { Component, Fragment } from 'react';
import * as loginLogo from'../../../assets/images/solution-viewer-logo.svg';
import * as tabletLoginLogo from'../../../assets/images/tablet-logo.svg';
import * as loginCover from'../../../assets/images/solution-viewer-login-img.jpg';
import { withRouter } from 'react-router-dom';
import * as Helper from './loginHelper';


import { Route, Link, Switch, Redirect } from 'react-router-dom';
// import AesUtil from './AesUtil'
import {
    Permissions
  } from "../../constants/Constants";
// import Popup from "reactjs-popup";
// import { Modal, Button } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
let bgImg = {backgroundImage: `url(${loginCover})`};
class Login extends Component {
    constructor(props) {
        super(props)
        // this.state = { open: false }
   
    
      }
    state = {
        userName: "",
        password: "",
        login: false,
        open: false,
        modalError:"",
        logout: false
    }

    
  onOpenModal = (description) => {
    this.setState({ open: true });
    this.setState({ modalError: description })
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
    
  };

  handleKeyPress = (e) =>{
        
    var self= this
  if (e.key === 'Enter') {
      
    this.onLoginCredentials(e);
  }
}
    
  

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {

        });
    }


    


    

    onLoginCredentials = (e) => {
       // var encryptedTextWithSaltAndIv = 'YTYzNmNiN2E0ODVkZTIxNjY3MjNjODM2ZDJiZTJiYjE6OjU3MWEyOWQyOTgzMTUzNjhjN2JiNzA3YTMxZjZlYTcyOjpVOHNnaTU1MVZOVC9Cc21FVitMYnZ3PT0=';
    //    var encryptedTextWithSaltAndIv = "OTJjNDg4OWQ5ZWFjNDhhZDQwNzQzMjg2MzRmNWZjMTM6OmMxZDM0OWNmNjcxMzNlZTc1ZWZhODJjMjUwYzg0NmJlOjp2YmZhd2lyWWNRalJIdmxZQmJEZ2FnPT0="
    //    var textToBeEncrypted = '101.53.156.130';
    //    var aesUtil = new AesUtil(128, 1000);
    //    var ciphertext = aesUtil.encrypt('blabla', textToBeEncrypted);
    //    let decrtptstring = aesUtil.decrypt('blabla', encryptedTextWithSaltAndIv);
   
// console.log('\nEncrypted : '+ciphertext)

//         console.log('\nDecrypted text : ' + aesUtil.decrypt('blabla', encryptedTextWithSaltAndIv));
        //Helper.getLogin("kanishka@gmail.com","kanishka")
        Helper.getLogin(this.state.userName, this.state.password)
            .then(response => {
                console.log(response)
                if (response.data) {
                     if (response.data.data.permission== Permissions.ALLOWED){
                         
                        var userID = localStorage.getItem("user")
                   
                        var sessionID = localStorage.getItem("session")
                        console.log(sessionID)
                        
                        var resource = localStorage.getItem("res")
                       
                        localStorage.setItem("userID", userID);
                        localStorage.setItem("sessionID", sessionID);
                        localStorage.setItem("resource", resource);
    
                         this.setState({ login: true })
                    }
                    else{
                        this.onOpenModal("User not authorized");
                    }
                   


                }
                else{
               
                   this.onOpenModal(response.description);
                  
                }

            })
            .catch(error => {
                console.log(error);
            });

        // let path = `/`;
        // this.props.history.push(path);
    }

    render() {

        if (this.state.login == true) {
            // return (
            //     <Redirect to="/" />
            // )
        window.location.href = "https://solutionviewer.ddriven.xyz/";
          // window.location.href = "http://101.53.139.108:5000/";
         //  window.location.href = "http://localhost:3000/";
            return (
                null
                // <Redirect to="/" />
            )
        }
        else {

         

            return (
                
               
                  
                <Fragment>
                

        <Modal open={this.state.open}
                     onClose={this.onCloseModal}
                     classNames={{
                        modal: "login-modal"
                      }} center>
                      <div className="circle-error">
                      <i className="fa fa-exclamation"></i>
                      </div>
          <h4>{this.state.modalError}</h4>
          
        </Modal>

            <div className="sign-in">
                <div className="row no-mrg-horizon">
                    <div className="col-md-7 no-pdd-horizon d-none d-md-block d-sm-none">
                        <div className="full-height bg" style={bgImg}>
                            <div className="img-caption">
                                <h1 className="caption-title">Monitor your business growth</h1>
                                <p className="caption-text">Let’s unleash the true power of your business. </p>
                                <a href="javascript:;" className="btn btn-rounded btn-outline-info">Learn More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-12 full-width-tablet no-pdd-horizon">
                        <div className="full-height bg-white height-100 tablet-login">
                            <div className="vertical-align full-height pdd-horizon-70">
                                <div className="table-cell">
                                <span className="tablet-logo"><img className="logo" src={tabletLoginLogo}/></span>
                                    <div className="pdd-horizon-15">
                                        <p className="text-center mrg-btm-150">
                                        <img className="logo" src={loginLogo}/>
                                        </p>
                                         <form>
                                            <div className="form-group mrg-btm-80">
                                            <input type="email" className="form-control" placeholder="User name"
                                                            name="userName" value={this.state.userName} onChange={this.onInputChange} onKeyPress={this.handleKeyPress.bind(this)} />
                                            </div>
                                            <input type="password" className="form-control" placeholder="Password"
                                                            name="password" value={this.state.password}
                                                            onChange={this.onInputChange} onKeyPress={this.handleKeyPress}
                                                        />
                                            <div className="checkbox font-size-12 mb-4">
                                                <input id="agreement" name="agreement" type="checkbox" />
                                                <label for="agreement">Remember Me</label>
                                            </div>
                                            {/* <button onClick={this.onLoginCredentials} className="btn btn-rounded float-right login-btn">Login</button> */}
                                            <input type="button" className="btn btn-rounded float-right login-btn"
                                                        onClick={this.onLoginCredentials}
                                                        value="Login"
                                                    />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </Fragment>
          );
        }
    }
}


//export default withRouter(Login);
 export default Login;
