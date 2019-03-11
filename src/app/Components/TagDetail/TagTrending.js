import React, { Component } from "react";
import LineChart from "../Charts/LineChart";
import * as wikiIcon from '../../../assets/images/wiki-icon.svg';
import CONFIG from '../../config';
class TagTrending extends Component {
  // componentDidMount(){
  //   alert(this.props.tagPath)
  // }

  geturl() {
    return CONFIG.trenderURL + "?tagName=" + this.props.tagName + "&tagPath=" + this.props.tagPath +  "&sessionID=" + localStorage.getItem("session") + "&appID="+ localStorage.getItem("res") +"&userID="+ localStorage.getItem("user")+ "&username=Guest"
  }
  render() {
    if (this.props.data.length == 0) {
      return (
        <div className="card signal-details">
          <div className="card-header">
            Trending - Last {this.props.timeOpted.type}
            <a href="javascript:;" className="flip-card">
              <i className="icons dd-info" />
            </a>
            <a href="javascript:;" className="flip-card-mobile">
            <i className="icons dd-info" />
          </a>
          </div>
          <div className="flip">
            <div className="card-body height-48">
              <div className="face front">
                <div id="container"> <img className="driven-loader" src={require('../../../assets/images/driven-loader.svg')} /> </div>
              </div>
            </div></div>
        </div>
      )
    } else {

      return (
        <div className="card signal-details">
          <div className="card-header">
            Trending - Last {this.props.timeOpted.type}
            <a href="javascript:;" className="flip-card">
              <i className="icons dd-info" />
            </a>
            <a href="javascript:;" className="flip-card-mobile">
            <i className="icons dd-info" />
          </a>
          </div>
          <div className="flip">
            <div className="card-body height-48">
              <div className="face front">
                <div className="trender-btn">
                  {/* <button className="trender-link" onClick={this.renderRedirect}> */}
                  <a target="_blank" className="trender-link" href={this.geturl()}>
                    <i className="icon dd-trender mr-2"></i>
                    <span>Open In Trender</span></a>
                  {/* </button> */}
                </div>

                <LineChart data={this.props.data} />
              </div>
              <div className="face back">
                <div>Shows a timeseries chart of the Signal for selected interval.
              <ul>
                    <li>Samples are connected by a straight line (linear interpolation)</li>
                    <li>BAD and UNCERTAIN quality samples are included </li>

                  </ul>

                </div>
                <img className="wiki-info-icon" src={wikiIcon} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default TagTrending;
