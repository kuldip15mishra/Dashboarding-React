import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom'
import _ from 'lodash';
import $ from 'jquery';

class PageTitle extends Component {
  
  _renderBreadcrumbs = () => {
    return _.map( this.props.breadcrumbs, (bread, i ) => {
      let c = "breadcrumb-item";
      let t = <Link to={bread.link}>{bread.text}</Link>
      if( i == this.props.breadcrumbs.length - 1  ){
        c += ' active'
        t = bread.text
      }
      return <li className={c}>
        {t}
      </li>
    })
  }

  toggleMenuSidebar=()=>{
    $(".left-sidebar").addClass("open");
    $(".dark-overlay").toggle();
  }




  render() {
    let breadcrumbs = this._renderBreadcrumbs();
    return (
      <Fragment>
        <div className="row tablet-title">
          <div className="col">
            <nav aria-label="breadcrumb" className="tablet-none">
              <ol className="breadcrumb ">
                {breadcrumbs}
              </ol>
            </nav>
            <div className="page-title"><button className="nav-btn" id="menu-toggle-btn" onClick={this.toggleMenuSidebar} ><i className="fa fa-bars"></i></button> {this.props.title || null}</div>
            <div className="vertical-separator tablet-none"></div>
            {this.props.rightDiv}
          </div>
          <div className="col">
           
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PageTitle;
