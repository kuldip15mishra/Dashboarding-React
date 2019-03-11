import React, { Component, Fragment } from "react";
import * as wikiIcon from'../../../assets/images/wiki-icon.svg';

class TagMetadata extends Component {
  render() {
    return (
      <Fragment>
      <div className="card tablet-none ">
        <div className="card-header">
          Identification{" "}
          <a href="javascript:;" className="flip-card">
            <i className="icons dd-info" />
          </a>
          <a href="javascript:;" className="flip-card-mobile">
            <i className="icons dd-info" />
          </a>
        </div>
        <div className="flip">
          {this.props.data === undefined ? null : (
            <div className="card-body identification-box height-28 ">
            <div className="face front">
            <div className="container">
              <div className="row tag-meta">
                <div className="col-md-3 c-grey">Tag Name:</div>
                <div className="col-md-9 c-blue bold-500">{this.props.data.tagName}</div>
              </div>
              </div>
              <div className="container">
              <div className="row tag-meta">
                <div className="col-md-3 c-grey">Description:</div>
                <div className="col-md-9 c-blue">
                  {this.props.data.description}
                </div>
              </div>
              </div>
              <div className="container">
              <div className="row tag-meta">
                <div className="col-md-3 c-grey">Unit:</div>
                <div className="col-md-9 c-blue">{this.props.data.unit}</div>
              </div>
              </div>
              <div className="container">
              <div className="row tag-meta">
                <div className="col-md-3 c-grey">Source:</div>
                <div className="col-md-9 c-blue">{this.props.data.source}</div>
              </div>
              </div>
            </div>
            <div className="face back">
            <div>Displays properties that are essential to uniquely identify the Signal.
              <ul>
                <li><b>Tagname</b> - unique identifier</li>
                <li><b>Description</b> - detailed explanation </li>
                <li><b>Unit</b> - unit of measure</li>
                <li><b>Source</b> - originating system / connection</li>
              </ul>
	
</div>
<img className="wiki-info-icon" src={wikiIcon} />
            </div>
            </div>

          )}
        </div>
      </div>
      {this.props.data === undefined ? null : (
      <div className="tablet-identification-box">
      <div className="tag-name">{this.props.data.tagName}</div>
      <div className="tag-desc">{this.props.data.description}</div>
      <div className="tag-meta-row">
      <div className="tag-meta">
      <span className="tag-meta-heading">Source:</span>
      <span className="tag-meta-data">{this.props.data.source}</span>
      </div>
      <div className="tag-meta">
      <span className="tag-meta-heading">UOM:</span>
      <span className="tag-meta-data">{this.props.data.unit}</span>
      </div>

      </div>
      
      </div>
      )}
      </Fragment>
    );
  }
}

export default TagMetadata;
