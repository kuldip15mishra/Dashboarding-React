import React,{ Component } from 'react';
import LeftSidebar from '../leftSideBar/LeftSideBar';

class MainBody extends Component{
  render(){
    return(
      <div className="page-container">
        <LeftSidebar/>
        <div className="content-area">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MainBody;