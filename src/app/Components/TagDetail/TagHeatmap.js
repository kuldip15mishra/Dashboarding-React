import React, { Component } from "react";
import Heatmap from '../Charts/Heatmap';
import * as wikiIcon from'../../../assets/images/wiki-icon.svg';

class TagHeatmap extends Component {

  
	render() {

    if (this.props.data.length == 0) {
      return (
        <div className="card signal-details">
          <div className="card-header">
          Heatmap - Last {this.props.timeOpted.type}
            <a href="javascript:;" className="flip-card">
              <i className="icons dd-info" />
            </a>
            <a href="javascript:;" className="flip-card-mobile">
            <i className="icons dd-info" />
          </a>
          </div>
          <div className="flip">
            <div className="card-body height-28">
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
              Heatmap - Last {this.props.timeOpted.type}
              <a href="javascript:;" className="flip-card">
                <i className="icons dd-info" />
              </a>
              <a href="javascript:;" className="flip-card-mobile">
            <i className="icons dd-info" />
          </a>
            </div>
            <div className="flip">
              <div className="card-body height-48 ">
              <div className="face front">
                <Heatmap  data={this.props.data}/>
                </div>
                <div className="face back">
                <div>
                Provides a quick glance of any presence of seasonality or patterns that repeat in the selected interval. 
Users could find answers to some common temporal questions (Q); reason (R) and corroborate any self-evident patterns.<br/>

Q) “When was the pump flow rate this high in last 2 days?” <br/>
R) “Why is the pump differential pressure high every morning for last 10 days?”
<br/>

Heatmap displays one of the following perspectives based on selected interval
<ul>
  <li>
  <b>Intra-Hour Seasonality</b> - repeating pattern over a part of Hour
  </li>
  <li><b>Intra-Day Seasonality</b> - repeating pattern over a part of Day</li>
</ul>


                </div>
                <img className="wiki-info-icon" src={wikiIcon} />
                </div>
              </div>
            </div>
          </div>
		)
	}
}
}

export default TagHeatmap