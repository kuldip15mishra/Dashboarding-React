import React from "react";
import { Link } from "react-router-dom";

import * as informationTree from'../../../assets/images/icons/information-tree.svg';
import * as tagExplorer from'../../../assets/images/icons/tag-explorer.svg';
import * as twins from'../../../assets/images/icons/twins.svg';
import $ from 'jquery';


function closeMenuSidebar(){
  $(".left-sidebar").removeClass("open");
  $(".dark-overlay").hide();
}
const LeftSidebar = props => {
  return (
    <div className="left-sidebar">
      <ul className="navigation">
      <li className="menu-title"><span className="">Menu</span><button className="nav-close" onClick={closeMenuSidebar} id="nav-sidebar-close"><i className="ti-close"></i></button></li>
        <li>
        <Link to="/">
            <div className="nav-icon"><img src={informationTree} /></div>
            <div className="nav-item-text">
              <span className="item-heading" >Information Tree</span>
              <span className="item-desc">Some description about information tree</span>
            </div>
          </Link>

          <Link to="/" className="active">
            <div className="nav-icon"><img src={tagExplorer} /></div>
            <div className="nav-item-text">
              <span className="item-heading" >
                Tag Explorer               
              </span>
              <span className="item-desc">Description for Tag Explorer In two lines</span>
            </div>
            </Link> 
          

          <Link to="/" >
            <div className="nav-icon"><img src={twins} /></div>
            <div className="nav-item-text">
              <span className="item-heading" >Twins</span>
              <span className="item-desc">Build Digital replicas of your enterprise entities</span>
            </div>
          </Link>


        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
