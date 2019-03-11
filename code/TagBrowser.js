import React, { Component } from "react";
import { connect ,} from 'react-redux'
import { withRouter } from 'react-router-dom'

import Header from "../base/header/Header";
import MainBody from "../base/mainBody/MainBody";
import PageTitle from '../base/pageTitle/PageTitle';

import TagsList from '../Components/TagBrowser/TagsList'

import * as tagBrowserActions from '../redux/TagBrowser/actions'
import * as SERVICE from './../service'
const $ = window.$;

class TagBrowser extends Component {

  constructor(props){
    super(props);
    this.state = {
        page: 0,
        perPage: 10
    }
  }

  _fetchNextPages = ( ) => {
    let skip = this.state.page * this.state.perPage;
    let limit = this.state.perPage;
    console.log(skip)
    console.log(limit)
    this.setState({
        page: this.state.page + 1
    },() => {
              this.props.fetchTagsList( skip, limit); 
            
    })    
  }

  componentDidUpdate(nextProps,nextState){
    

      if((nextProps.tagBrowser 
        && nextProps.tagBrowser.tagsList 
        && nextProps.tagBrowser.tagsList.length >0
        && this.props.tagBrowser
        && this.props.tagBrowser.tagsList && this.props.tagBrowser.tagsList.length >0
        && nextProps.tagBrowser.tagsList[nextProps.tagBrowser.tagsList.length-1].tagName !== this.props.tagBrowser.tagsList[this.props.tagBrowser.tagsList.length-1].tagName) 
        || (!nextProps.tagBrowser  && this.props.tagBrowser.tagsList && this.props.tagBrowser.tagsList.length >0 ) ){
            this._fetchAllCurrentValue(this.props.tagBrowser.tagsList);
        }else if(nextProps.tagBrowser 
          && nextProps.tagBrowser.tagsList 
          && nextProps.tagBrowser.tagsList.length === 0
          && this.props.tagBrowser
          && this.props.tagBrowser.tagsList && this.props.tagBrowser.tagsList.length >0){
            this._fetchAllCurrentValue(this.props.tagBrowser.tagsList);
        }

       
    
  }

  _fetchAllCurrentValue(taglist){
  if(taglist){
    //taglist.forEach(tag => {
      setTimeout(() => {this.props.fetchTagsListItemCurrentValue( taglist);
        this.props.fetchTagsListItemOneHourAverage( taglist,'1H');
        this.props.fetchTagsListItemOneDayAverage(taglist,'1H');
      }
      
      ,2000);
     // setTimeout(() => {this.props.fetchTagsListItemOneHourAverage( taglist,'1H') },600);
     // setTimeout(() => {this.props.fetchTagsListItemOneDayAverage(taglist,'1H')},800);
    setTimeout(() => {
    this.props.fetchTagsListItemOneHourSparkLine(taglist,'1H')
    },3000);
  
    }
  }
  componentDidMount() {
    let T = this;
    
    this._fetchNextPages( this.state.page );
    
    // $(window).scroll(function() {      
    //    if($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
    //        T._fetchNextPages();
    //    }
    // });
  }

  _openTagDetailPage = ( tagName ) => {
    if( tagName ){
      this.props.history.push( '/tag-detail/' + tagName )  
    }
  }

  _getBreadcrumbs = () => {
    return [{
      text: 'Solution Viewer',
      link: '/'
    }, {
      text: 'Tag Explorer',
      link: '',
    }]
  }

	render() {
		return (
			<div>
        <Header/>
        <MainBody>
          <PageTitle 
            title="Tag Browser"
            breadcrumbs={this._getBreadcrumbs()}
          />
          <div className="tag-grid" id="tag-browser-list-kendo">
            <TagsList 
              openTagDetailPage={this._openTagDetailPage} 
              tagsList={this.props.tagBrowser.tagsList}
              fetchNextPages={this._fetchNextPages}
            />
          </div>
				</MainBody>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    tagBrowser: state.tagBrowser
  };
};

const mapDispatchToProps = (dispatch) => {

  let currentPerioFromTo = SERVICE.getCurrentPeriodFromTo();
  return {
    fetchTagsList: ( skip, limit ) => {
        return dispatch(tagBrowserActions.fetchTagsList( skip, limit))
    },
    fetchTagsListItemCurrentValue :(tagName) =>{
      return dispatch(tagBrowserActions.fetchTagsListItemCurrentValue( tagName))
    },
   
    fetchTagsListItemOneHourSparkLine :(tagName,timeperiod)=>{
    return dispatch(tagBrowserActions.fetchTagsListItemOneHourSparkLine( tagName, currentPerioFromTo[timeperiod].periodFrom,  currentPerioFromTo[timeperiod].periodTo ))

    },
    fetchTagsListItemOneHourAverage :(tagName,timeperiod)=>{
      return  dispatch( tagBrowserActions.fetchTagsListItemOneHourAverage( tagName, currentPerioFromTo['1H'].periodFrom,  currentPerioFromTo['1H'].periodTo ) )

     },
     fetchTagsListItemOneDayAverage :(tagName,timeperiod)=>{
      return  dispatch( tagBrowserActions.fetchTagsListItemOneDayAverage( tagName, currentPerioFromTo['1D'].periodFrom,  currentPerioFromTo['1D'].periodTo ) )

     }
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagBrowser));