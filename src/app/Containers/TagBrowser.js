import React, { Component } from "react";
import { connect ,} from 'react-redux'
import { withRouter } from 'react-router-dom'

import Header from "../base/header/Header";
import MainBody from "../base/mainBody/MainBody";
import PageTitle from '../base/pageTitle/PageTitle';

import TagsList from '../Components/TagBrowser/TagsList'

import workerfile from "../../worker.js";
import WebWorker from "../../workerSetup";
import * as tagBrowserActions from '../redux/TagBrowser/actions'
import * as SERVICE from './../service';

import loki from 'lokijs';



class TagBrowser extends Component {

  constructor(props){
    super(props);
    this.state = {
        page: 0,
        perPage: 8,
        skip :0,
        skipCurrent :0,
        limit:8,
        currentPageFetching :0,
        ispage1hrfetched :false,
        ispagecurrentfetched :false,
        ispage1hravgfetched :false,
        ispage24hravgfetched :false,
        lastpage:0,
        pageahead:7,
        lastpageahead:4,
        islastpagesfetched :false,
        userID: localStorage.getItem("userID"),
        sessionID:localStorage.getItem("sessionID"),
        resource: localStorage.getItem("resource"),
    }
  }
 
  fetchWebWorker1 = (api,pagenum) => {
    this.worker.postMessage(api);
    //this.props.fetchTagsListItemOneHourAverage(10, 10 );
    this.worker.addEventListener("message", event => {
      
      console.log(event);
      if(event && event.data && event.data.payload && event.data.payload.data)
      {
        this.setState({ispage1hravgfetched :true})
      this.props.addOneHourAvg(event.data.payload.data, pagenum);}
    });
  };
  fetchWebWorkerSparkline= (api,pagenum) => {
    this.worker.postMessage(api);
    //this.props.fetchTagsListItemOneHourAverage(10, 10 );
    this.worker.addEventListener("message", event => {
      
      console.log(event);
      if(event && event.data && event.data.payload && event.data.payload.data)
      this.setState({ispage1hrfetched :true})
      {
        this.props.addOneHour(event.data.payload.data, pagenum)
        // setTimeout(() => {
        //   this.props.addOneHour(event.data.payload.data, pagenum);
        // }, 1000);
       
      
      }
    });
  };
  fetchWebWorkercurrent= (api,pagenum) => {
    this.worker.postMessage(api);
    //this.props.fetchTagsListItemOneHourAverage(10, 10 );
    this.worker.addEventListener("message", event => {
      
      if(event && event.data && event.data.payload && event.data.payload.data)
      {
        this.setState({ispagecurrentfetched :true})
      this.props.addCurrentValue(event.data.payload.data, pagenum);}
    });
  };
  fetchWebWorker24 = (api,pagenum) => {
    this.worker.postMessage(api);
    //this.props.fetchTagsListItemOneHourAverage(10, 10 );
    this.worker.addEventListener("message", event => {
      
      if(event && event.data && event.data.payload && event.data.payload.data)
      {
        this.setState({ispage24hravgfetched :true})
      this.props.add24HourAvg(event.data.payload.data, pagenum);}
    });
  };

  fetchWebWorkerFetchSignals = (api,pagenum) => {

    this.worker.postMessage(api);

    //this.props.fetchTagsListItemOneHourAverage(10, 10 );

    this.worker.addEventListener("message", event => {

      

      console.log(event);

      if(event && event.data && event.data.payload && event.data.payload.data)

      {

      this.props.addSignals(event.data.payload,event.data.payload.totalCount, this.state.skip,this.state.limit, pagenum);}

    });

  };
  _updatePageNum =(page) =>{
    this.setState({
      page: (page ?page :1 ),
      skipCurrent :page *this.state.perPage 
    });
  }

  isPageExist(pageNum){
    if(pageNum === 0){
      pageNum=1;
    }
    if(this.props.tagBrowser && this.props.tagBrowser.tagsList && this.props.tagBrowser.length === 0) return false;
    var result =this.props.tagBrowser.tagsList.filter(page=>{
      return page.pageNum === parseInt(pageNum)
    })

    if(result && result.length >0){
      return true;
    }else{
      return false;
    }
  }
  _fetchNextPages = ( pageNum) => {
    let skip = (pageNum ?pageNum :1 )* this.state.perPage;
    let limit = this.state.perPage;
   
    this.setState({
        page: ((pageNum) ? parseInt(pageNum) :1 ),
        skip:skip,
        skipCurrent :skip -this.state.perPage
        
    },() => {
      if(!this.isPageExist(pageNum))
              {
                this.setState({currentPageFetching :((pageNum) ? parseInt(pageNum) :1 )},()=>{
                this.props.fetchTagsList( skip, limit,this.state.page)});
               // setTimeout (this.fetchOtherColumns(this.state.page,skip,limit),5000);
            //   this.worker = new WebWorker(workerfile);
            //    this.fetchWebWorker1({api:'1hravg',skip:skip,limit:limit},this.state.page);
            //   this.fetchWebWorkerSparkline({api:'1hr',skip:skip,limit:limit},this.state.page);
            // this.fetchWebWorker24({api:'24hravg',skip:skip,limit:limit},this.state.page);
            // this.fetchWebWorkercurrent({api:'current',skip:skip,limit:limit},this.state.page);
         }
        // this.CheckPageAheadIsFetched(pageNum);
        // setTimeout (this.CheckPageAheadIsFetched(pageNum),9000); 
    })    
  }

  CheckPageAheadIsFetched(currentPageClicked,self){

    let counter=0;
    if(self.state.page ){

      if(currentPageClicked >0)
      counter +=10 ;
      var bucket = self.getPagesToBeFetched(currentPageClicked);
      var lastPageBucket=self.getLastPagesToBeFetched();
      bucket.forEach(element => {
        let skip = (element )* self.state.perPage;
        let limit = self.state.perPage;
       self.getFuturePage(element,skip,limit,null)
    //  setTimeout (self.getFuturePage,1000,element,skip,limit,self);
      });

      if(!self.state.islastpagesfetched)
      {
        self.setState({islastpagesfetched:true});
        lastPageBucket.forEach(element => {
        let skip = (element )* self.state.perPage;
        let limit = self.state.perPage;
      self.getFuturePage(element,skip,limit)});}
   // self.getFuturePage,1000,element,skip,limit,self);
     
     
    }
  }

  getPagesToBeFetched(index){

    var bucket =[];

  
      var max =(parseInt(index) === 0 ? 1 :parseInt(index))  + this.state.pageahead;
      var min =  (parseInt(index)) <0 ? 0 : (parseInt(index));
  
      if(max > this.state.lastpage){
        max ===this.state.lastpage;
      }
      for(let i=min;i<=max;i++){
        if(i !==parseInt(index)){
          if(i >0 && i !==1)bucket.push(i)
        }
      }
    
    
    return bucket;
  }

  getLastPagesToBeFetched(){

    var bucket =[];

    if( this.state.lastpage>0){
      var max =parseInt(this.state.lastpage) ;
      var min =   (parseInt(this.state.lastpage))-this.state.lastpageahead;
      if(max > this.state.lastpage){
        max ===this.state.lastpage;
      }
      for(let i=min;i<=max;i++){
        if(i !==parseInt(this.state.lastpage)){
          if(i >0 && i !==1)bucket.push(i)
        }
      }
    }
    
    return bucket;
  }

  getFuturePage(pagenum,skip,limit,self){
    let instance= self ? self :this;
    if(!instance.isPageExist(pagenum) )
        {
        
          setTimeout (instance.props.fetchTagsList,0, skip, limit,pagenum)
         // setTimeout (self.fetchOtherColumns.bind(self),5000 ,pagenum,skip,limit);
          // self.setState({currentPageFetching :((pagenum) ? parseInt(pagenum) :1 )},()=>{
          //   self.props.fetchTagsList( skip, limit,pagenum)}); 
          instance.fetchOtherColumns(pagenum,skip,limit)
            //
            
         }
  }
  fetchOtherColumnsself (pagenum,skip,limit,self){
    //self.worker = new WebWorker(workerfile);
         // this.fetchWebWorkerFetchSignals({isfetchSignals :true,skip:skip,limit:limit ,pageNum:pagenum},pagenum);
         self.fetchWebWorker1({isfetchSignals :false,api:'1hravg',params :'1HOURAVG',skip:skip,limit:limit },pagenum);

         self.fetchWebWorkerSparkline({isfetchSignals :false,api:'1hr',params :'1HOUR',skip:skip,limit:limit},pagenum);
       
         self.fetchWebWorker24({isfetchSignals :false,api:'24hravg',params :'24HOURAVG',skip:skip,limit:limit},pagenum);
       
         self.fetchWebWorkercurrent({isfetchSignals :false,api:'current',params :'CURRENT',skip:skip,limit:limit},pagenum);
       
         }
  fetchOtherColumns (pagenum,skip,limit){
     // this.worker = new WebWorker(workerfile);
           // this.fetchWebWorkerFetchSignals({isfetchSignals :true,skip:skip,limit:limit ,pageNum:pagenum},pagenum);
           let userid= this.state.userID;
           let sessionID= this.state.sessionID;
           let resource= this.state.resource;
            this.fetchWebWorker1({isfetchSignals :false,api:'1hravg',params :'1HOURAVG',skip:skip,limit:limit ,userID:userid,sessionID:sessionID,resource:resource },pagenum);

            this.fetchWebWorkerSparkline({isfetchSignals :false,api:'1hr',params :'1HOUR',skip:skip,limit:limit,userID:userid,sessionID:sessionID,resource:resource},pagenum);
         
            this.fetchWebWorker24({isfetchSignals :false,api:'24hravg',params :'24HOURAVG',skip:skip,limit:limit,userID:userid,sessionID:sessionID,resource:resource},pagenum);
         
            this.fetchWebWorkercurrent({isfetchSignals :false,api:'current',params :'CURRENT',skip:skip,limit:limit,userID:userid,sessionID:sessionID,resource:resource},pagenum);
         
           }

           fetchWebWorker = () => {

            this.worker.postMessage('Fetch Users');
        
            this.worker.addEventListener('message', event => {
              this.setState({
                count: event.data.length
              })
            });
          }
  componentDidMount() {
    this.worker = new WebWorker(workerfile);
    //this.fetchWebWorker();
    this.setPageSize();
    this._fetchNextPages( this.state.page );
  
  }

  setPageSize(){
    if(window.innerWidth <1281 && window.innerWidth >1080 ){

      this.setState({perPage :5 ,limit :5})

    }else if(window.innerWidth <1921 && window.innerWidth >1280){

      this.setState({perPage :8 ,limit :8})

    }
  
  
  }

  _openTagDetailPage = ( tagName,tagPath ) => {
    if( tagName ){
      this.props.history.push( '/tag-detail/' + tagName + '&tag-Path=' + tagPath)  
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


  componentDidUpdate(nextProps,nextState){

    // if(this.props.isunauthorised){
    //   //localStorage.clear();
    //   window.location.href = "https://solutionviewer.ddriven.xyz";
    //   // window.location.href = "http://101.53.139.108:5000/";
    //  // window.location.href = "http://localhost:3000/login";
    // }
    // else 
    // {
      if( this.state.currentPageFetching >0){
      if(this.isPageExist(this.state.currentPageFetching)){
        let pageNum =this.state.currentPageFetching ;
        this.setState({currentPageFetching:0 },()=>{
        console.log("Page is fetched No"+ this.state.currentPageFetching)
     this.fetchOtherColumns(pageNum,this.state.skip,this.state.limit)
     // setTimeout(this.CheckPageAheadIsFetched,6000,this.state.page,this);
      });
    }
   

      if(this.state.lastpage === 0 && this.props.totalCount >0){
        let lastpageNum =Math.floor(this.props.totalCount/8);
        this.setState({lastpage: lastpageNum})
      }
    }
 // }
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
              totalCount ={this.props.tagBrowser.totalCount}
              skip= {this.state.skip}
              fetchNextPages={this._fetchNextPages}
              skipCurrent ={this.state.skipCurrent}
              pageNum= {this.state.page}
              updatePageNum={this._updatePageNum}
              isloading ={this.props.tagBrowser.isload}
              perPage = {this.state.perPage}
              lastpage={this.state.lastpage}
              
            />
          </div>
				</MainBody>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    tagBrowser: state.tagBrowser,
    totalCount :state.tagBrowser.totalCount,
    isunauthorised :state.tagBrowser.isunauthorised
  };
};

const mapDispatchToProps = (dispatch) => {

  let currentPerioFromTo = SERVICE.getCurrentPeriodFromTo();
  return {
    fetchTagsList: ( skip, limit,pageNum ) => {
        return dispatch(tagBrowserActions.fetchTagsList( skip, limit,pageNum))
    },
    
    fetchTagsListItemCurrentValue :(skip, limit) =>{
      return dispatch(tagBrowserActions.fetchTagsListItemCurrentValue(skip, limit))
    },
   
    fetchTagsListItemOneHourSparkLine :(skip, limit )=>{
    return dispatch(tagBrowserActions.fetchTagsListItemOneHourSparkLine(skip, limit  ))

    },
    fetchTagsListItemOneHourAverage :(skip, limit )=>{
      return  dispatch( tagBrowserActions.fetchTagsListItemOneHourAverage(skip, limit  )  )

     },
     fetchTagsListItemOneDayAverage :(skip, limit )=>{
      return  dispatch( tagBrowserActions.fetchTagsListItemOneDayAverage(skip, limit ) )

     },
     addSignals :(data,totalcount,skip,limit,pagenum) =>{

      return  dispatch( tagBrowserActions.fetchTagsListSuccess(data,totalcount,skip,limit,pagenum ) )

      

     },
     addOneHourAvg :(data,pagenum) =>{
      return  dispatch( tagBrowserActions.fetchTagsListItemOneHourAverageSuccess(data,pagenum ) )
      
     },
     add24HourAvg :(data,pagenum) =>{
      return  dispatch( tagBrowserActions.fetchTagsListItemOneDayAverageSuccess(data ,pagenum) )
      
     },
     addOneHour :(data,pagenum) =>{
      return  dispatch( tagBrowserActions.fetchTagsListItemOneHourSparkLineSuccess(data ,pagenum) )
      
     },
     addCurrentValue :(data,pagenum)=>{
       return dispatch(tagBrowserActions.fetchTagsListItemCurrentValueSuccess(data,pagenum))
     }
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagBrowser));