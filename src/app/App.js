
/*/#region Copyright(c) 2018 D-Driven All rights are reserved
* =============================================================================================================================================
* <copyright company="D-Driven">
* COPYRIGHT (c) 2018 D-Driven (P) Ltd. 
* ALL RIGHTS ARE RESERVED. REPRODUCTION OR TRANSMISSION IN WHOLE OR IN PART, 
* ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL OR OTHERWISE, 
* WITHOUT THE PRIOR PERMISSION OF THE COPYRIGHT OWNER.
* </copyright>
* =============================================================================================================================================
* Created By : 
* Module :  App (Starter component)
* Description : it is a entry component which loads first at the time application load
* Date:31-JULY-2018.
* =============================================================================================================================================
 * 
 * #endregion
*/

/**library import section Begin*/
import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
/**library import section Ends*/
import store from './redux/store';
import TagBrowser from './Containers/TagBrowser';
import TagDetail from './Containers/TagDetail';
import Login from './base/login/Login';
import {test} from "../worker.js";
import WebWorker from "../workerSetup";
import HttpClient from "./service/apiService";


import Modal from 'react-responsive-modal';
import { apiURL ,RouteParams, LicenceTime, AppId} from "./constants/Constants";


class App extends Component{
  constructor(props) {
    super(props);
    this.httpClient = new HttpClient();
}
  

  state = {
    count: 0,
    open: false,
    modalError:"",
    isCall:0
}


onOpenModal = (description) => {
    this.setState({ open: true });
    this.setState({ modalError: description })
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
    
  };
componentDidMount(){
  //localStorage.clear();
  if(localStorage.getItem("userID")!= null){
            
    let self= this
    setInterval(function () {
    
        self.checkLicence(AppId.id)
    }, LicenceTime.time);
}

 // this.worker = new WebWorker(workerfile);
 // this.fetchWebWorker();
}

componentDidUpdate(){
  if(this.state.isCall==0){
    if(localStorage.getItem("userID")!= null){
        this.setState({isCall:1})
        let self= this
        setInterval(function () {
        
            self.checkLicence(AppId.id)
        }, LicenceTime.time);
    }
 }
}

checkLicence(appID){
  this.httpClient.get(apiURL.LICENCE)
  .then(response => {
      console.log(response)
      if(response.data.status!=200){
         
          this.onOpenModal(response.data.message);
        

      }
      
  })
  .catch(error => {

      this.onOpenModal("Error");
     
   
  });
}

fetchWebWorker = () => {
  this.worker.postMessage("Fetch Users");

  this.worker.addEventListener("message", event => {
    console.log(event)
    this.setState({
      count: event.data.length
    });
  });
};
  render(){
    if(localStorage.getItem("userID")== null){
      return (
          <Fragment>
              {/* <Loader isloading ={this.props.loading}/>
              <Header></Header> 
             
              <MainBody></MainBody>
             <FloatingMenuButton></FloatingMenuButton> */}
             <Login></Login>
          </Fragment>
      );
          }
  else{
    return(
      <Fragment>
      <Modal open={this.state.open} onClose={this.onCloseModal}
                     classNames={{
                        modal: "login-modal"
                      }} center>
                     <div className="circle-error">
                      <i className="fa fa-exclamation"></i>
                      </div>
          <h4>{this.state.modalError}</h4>
          
        </Modal>
        
      <Provider store={store} key="provider">
     
        <Router>
          <Switch>
            <Route exact path="/" component={TagBrowser}/>
  			    <Route exact path="/tag-browser" component={TagBrowser} />
  			    <Route exact path="/tag-detail/:id" component={TagDetail} />
            <Route path="/login" component={App} />
          </Switch>
        </Router>
      </Provider>
      </Fragment>

    );
  }
}
}

export default App;