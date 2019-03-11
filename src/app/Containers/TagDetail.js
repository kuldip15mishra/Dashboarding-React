import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import $ from "jquery";

import Header from "../base/header/Header";
import MainBody from "../base/mainBody/MainBody";
import PageTitle from "../base/pageTitle/PageTitle";

import TimeSelection from "../Components/TagDetail/TimeSelection";
import TagMetadata from "../Components/TagDetail/TagMetadata";
import TagCurrentdata from "../Components/TagDetail/TagCurrentdata";
import TagHistogram from "../Components/TagDetail/TagHistogram";
import TagHeatmap from "../Components/TagDetail/TagHeatmap";
import TagTrending from "../Components/TagDetail/TagTrending";

import * as tagDetailActions from "../redux/TagDetail/actions";
import * as SERVICE from "../service";



class TagDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePeriodOpted: this.props.tagDetail.timePeriodOpted,
      currentTimeOpted: "",
      metaData: {},
      currentData: {},
      trendingData: [],
      histogramData: {},
      heatMapData:[],
      tagName:"",
       unit:"",
       loading:true
    };
  }

  _refreshTagContent = timePeriodOptedType => {
    let periods = SERVICE.getCurrentPeriodFromTo();
    let periodFrom = periods[timePeriodOptedType].periodFrom;
    let periodTo = periods[timePeriodOptedType].periodTo;

    // tag current value
    this.props.fetchTagCurrentValue(this._gettagPath());
    // tag current average
    this.props.fetchTagCurrentAverage(
      this._gettagPath(),
      periodFrom,
      periodTo
    );
    // tag histogram data
    this.props.fetchTagHistogramData(
      this._gettagPath(),
      periodFrom,
      periodTo
    );
    // tag heatmap data
    this.props.fetchTagHeatmapData(
      this._gettagPath(),
      timePeriodOptedType,
      periodFrom,
      periodTo
    );

    
  };

  _onTimePeriodChange = val => {
    this.setState(
      {
        currentTimeOpted: val
      },
      () => {
        this.props.setTimePeriodOpted(val);
        this._refreshTagContent(val);
      }
    );
  };

  componentDidMount() {

    this.props.fetchTagMetaData(this._gettagPath());
  
    this._refreshTagContent(this.props.tagDetail.timePeriodOpted.type);

  

this.setState({tagName :this._getID()});
    $(".flip-card").click(function() {
      $(this)
        .parent()
        .parent()
        .toggleClass("flipped");
    });


    
  }

  componentWillReceiveProps(nextProps) {
  
    this.setState({
      timePeriodOpted: nextProps.tagDetail.timePeriodOpted,
      metaData: nextProps.tagDetail.metaData,
      currentData: nextProps.tagDetail.currentData,
      trendingData: nextProps.tagDetail.trendingData,
      histogramData: nextProps.tagDetail.histogramData,
      heatMapData: nextProps.tagDetail.heatMapData,
      unit:nextProps.tagDetail.metaData.unit
    });
   
  console.log(this.state.histogramData)
  }

  _getBreadcrumbs = () => {
    
    return [{
      text: 'Solution Viewer',
      link: '/'
    }, {
      text: 'Tag Explorer',
      link: '/',
    }, {
      text: this._getID() + ' Tag Details',
      link: '',
    }]
  }

  _getID()
  {
    return this.props.match.params.id.split('&')[0]
  }
  _gettagPath(){
   
    return this.props.match.params.id.split('&')[1].split('=')[1];
  }
  render() {
 
    let timeSelection = (
      <TimeSelection
      tagName={this.state.tagName}
        timePeriodOpted={this.state.timePeriodOpted}
        setTimePeriodOpted={this._onTimePeriodChange}
      />
    );

    const options = {
      items: 1,
      nav: true,
      rewind: true,
      autoplay: true
  };
  
  
    return (
      <div>
        <Header />
        <MainBody>
          <PageTitle 
            title="Signal Details"
            breadcrumbs={this._getBreadcrumbs()}
            rightDiv={timeSelection} 
          />
          <div className="row signal-detail-row glide" style={{marginBottom:'20px'}}>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
              <TagMetadata data={this.state.metaData} />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
              <TagCurrentdata
                data={this.state.currentData}
                timeOpted={this.props.tagDetail.timePeriodOpted}
              
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 " >
              <TagHistogram
                data={this.state.histogramData}
                unit={this.state.unit}
                timeOpted={this.props.tagDetail.timePeriodOpted}
                loading={this.state.loading}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 " >
              <TagHeatmap 
                data={this.state.heatMapData }
                timeOpted={this.props.tagDetail.timePeriodOpted}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-8 " >
              <TagTrending
                data={this.state.trendingData}
                tagName = {this._getID()}
                tagPath = {this._gettagPath()}
                timeOpted={this.props.tagDetail.timePeriodOpted}
              />
            </div>
           
          </div>
        </MainBody>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tagDetail: state.tagDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTimePeriodOpted: optedPeriod => {
      return dispatch(tagDetailActions.setTimePeriodOpted(optedPeriod));
    },
    fetchTagMetaData: tagName => {
      return dispatch(tagDetailActions.fetchTagMetaData(tagName));
    },
    fetchTagCurrentValue: tagName => {
      return dispatch(tagDetailActions.fetchTagCurrentValue(tagName));
    },
    fetchTagCurrentAverage: (tagName, periodFrom, periodTo) => {
      return dispatch(
        tagDetailActions.fetchTagCurrentAverage(tagName, periodFrom, periodTo)
      );
    },
    fetchTagHistogramData: (tagName, periodFrom, periodTo) => {
      return dispatch(
        tagDetailActions.fetchTagHistogramData(tagName, periodFrom, periodTo)
      );
    },
    fetchTagHeatmapData: (
      tagName,
      timePeriodOptedType,
      periodFrom,
      periodTo
    ) => {
      return dispatch(
        tagDetailActions.fetchTagHeatmapData(
          tagName,
          timePeriodOptedType,
          periodFrom,
          periodTo
        )
      );
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TagDetail)
);
