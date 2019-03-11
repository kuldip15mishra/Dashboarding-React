import React, { Component } from "react";
import * as wikiIcon from'../../../assets/images/wiki-icon.svg';
// var ReactHighcharts = require('react-highcharts');
// var data = [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4];
// var config= {
//   title: {
//     text: 'Highcharts Histogram'
//   },
//   xAxis: [{
//     title: { text: 'Data' },
//     alignTicks: false
//   }, {
//     title: { text: 'Histogram' },
//     alignTicks: false,
//     opposite: true
//   }],

//   yAxis: [{
//     title: { text: 'Data' }
//   }, {
//     title: { text: 'Histogram' },
//     opposite: true
//   }],

//   series: [{
//     name: 'Histogram',
//     type: 'histogram',
//     xAxis: 1,
//     yAxis: 1,
//     baseSeries: 's1',
//     zIndex: -1,
//     data: [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4],
//   } ]
// }
import Histogram from '../Charts/Histogram'
class TagHistogram extends Component {
  render() {

    if (this.props.data.length == 0) {
      return (
        <div className="card signal-details " >
          <div className="card-header">
            Histogram - Last {this.props.timeOpted.type}
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
            Histogram - Last {this.props.timeOpted.type}
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
                <Histogram data={this.props.data} unit={this.props.unit} />

              </div>
              <div className="face back">
                <div>
                  Shows the frequency distribution of samples in the signal.<br />
                  <ul>
                    <li>The histogram constructs 10 equal sized bins (or buckets) based on the range of sample values in the selected interval.</li>
                    <li>The height of each bin is proportional to the count of samples that fall in its range</li>
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

export default TagHistogram