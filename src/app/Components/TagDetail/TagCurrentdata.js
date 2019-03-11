import React, { Component,Fragment } from "react";
import $ from "jquery";
import * as wikiIcon from'../../../assets/images/wiki-icon.svg';

class TagCurrentdata extends Component {
  
  render() {
    return (
      <div className="card signal-details">
        <div className="card-header">
          Current{" "}
          <a href="javascript:;" className="flip-card">
            <i className="icons dd-info" />
          </a>
          <a href="javascript:;" className="flip-card-mobile">
            <i className="icons dd-info" />
          </a>
        </div>
        <div className="flip">
          {this.props.data != undefined ? (
            <Fragment>
                          <div className="card-body height-28 tablet-none">
            <div className="face front">
              <div className="row justify-content-md-center tag-current">
                <span className="main-text">
                  {this.props.data.value}
                  {this.props.data.value > this.props.data.average ? (
                    <i
                      className="fa fa-arrow-circle-up icon fa-lg"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="fa fa-arrow-circle-down icon fa-lg"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </div>
              <div className="row row justify-content-md-center tag-current">
                <div className="col-md-6 text-center avg">
                  <div className="row justify-content-md-center">
                    {this.props.data.average}
                  </div>
                  <div className="row justify-content-md-center">
                    <small>Last {this.props.timeOpted.type} Avg</small>
                  </div>
                </div>
                <div className="col-md-6 text-center delta">
                  <div className="row justify-content-md-center">
                    {this.props.data.delta?(this.props.data.delta).toLocaleString()+"%":null}
                  </div>
                  <div className="row justify-content-md-center">
                    <small>delta</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="face back">
            <div>Provide a summary of the current sample value of signal.
              <ul>
                <li><b>Average</b> - arithmetic mean over the selected interval</li>
                <li><b>Delta </b>- difference (in %) of current value as compared to average </li>
                <li><b>Arrow</b> - indicates whether the current value is increasing (show upward arrow symbol) or decreasing (show upward arrow symbol) as compared to average</li>
               
              </ul>
	
</div>
  <img className="wiki-info-icon" src={wikiIcon} />
            </div>
            </div>
          
          <div className="card-body tablet-current-data">
          <div className="current-data-row">
                    <div className="current-value">
                    <span className="current-data">{this.props.data.value}</span>
                    <span className="arrow-icon">
                    {this.props.data.value > this.props.data.average ? (
                    <i
                      className="fa fa-arrow-circle-up icon fa-lg"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="fa fa-arrow-circle-down icon fa-lg"
                      aria-hidden="true"
                    />
                  )}
                    </span>
                    </div>
                    <div className="average-value">
                    <div className="average-data">
                    <span className="avg-num">{this.props.data.average}</span>
                    <span className="avg-heading">Last {this.props.timeOpted.type} Avg</span>
                    </div>
                    <div className="average-data">
                      <span className="avg-num"> {this.props.data.delta?(this.props.data.delta).toLocaleString()+"%":null}</span>
                      <span className="avg-heading">delta</span>
                    </div>
                    </div>
          </div>
          </div>
          </Fragment>) : null}
        </div>
      </div>
    );
  }
}

export default TagCurrentdata;
