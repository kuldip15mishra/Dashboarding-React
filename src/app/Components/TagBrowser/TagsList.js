import React, { Component } from "react";
import { Link } from 'react-router-dom'
import CONFIG  from '../../config';
import _ from 'lodash'
const $ = window.$;
const kendo = window.kendo;
const Highcharts = window.Highcharts;

class TagsList extends Component{

  state={
    pageNum :1,
    ismobile:false,
    istablet:false
  }
	componentDidMount() {
    this.setPageSize()
  	 

  }

  

  _renderGrid = ( tagsList ) => {
    let T = this;
    let session =localStorage.getItem("session");
    let appID=localStorage.getItem("res");
    let userID=localStorage.getItem("user");
  	$("#client").kendoGrid({
      // page: T.onPaging,
            dataSource: {

                data: tagsList || [],

                serverPaging: true,
                  batch: true,
                
                schema: {
                  
                    model: {
                        id: "ProductID",
                        fields: {
                            tagName: { editable: false, nullable: true },
                            source: { editable: false, nullable: true },
                            current: { editable: false, nullable: true },
                            oneHourAverage: { editable: false, nullable: true },
                            oneDayAverage: { editable: false, nullable: true },
                                   }
                    }
                },
               
              
            },
         
            filterable: true,
            pageSize: 4,
            pageable: {
              pageSize: 2,
             refresh: true,
            //  refresh: true,
            //  pageSizes: true,
             buttonCount: 4,
              change:function(e){
               // $(".k-loading-image").show();
               if(parseInt(e.index) > T.props.lastpage){
                T.setState({pageNum :T.props.lastpage});
                T.props.fetchNextPages(T.props.lastpage);
               }else if(T.props.skip < T.props.totalCount)
                 {
                  T.setState({pageNum :e.index === 0 ? 1:e.index});
                  T.props.fetchNextPages(e.index === 0 ? 1:e.index);
                }else{
                 T.props.updatePageNum(e.index === 0 ? 1:e.index);
                 T.props.fetchNextPages(e.index === 0 ? 1:e.index);
               }
               
                
                
           }
            },
            scrollable: true,
          filterMenuInit: function(e){
            e.container.data("kendoPopup").setOptions({
              position: "top center" //"top right"
            })
          },
          noRecords: true,  
  
          messages: {  
    
              noRecords: "Data Loading ............."  
    
          },  
          // noRecords: {
          //   template: "Data Loading ............."
          // },
            // pageable: true,
            height: '81vh',
            // toolbar: ["create", "save", "cancel"],
            columns: [
                { 
                  title: "NAME", 
                  field: "tagName", 
                  filterable: { multi: true, search: true},
                  width: '25%',
                  // media: "xs",
                  headerAttributes: {
                    style: "text-align: left;"
                  },
                  template: (dataItem) => {
                    return `
                      <span class=" tag-name">${dataItem && dataItem.tagName || ''}</span>
                      <span class=" tag-desc">${dataItem && dataItem.description || ''}</span>
                    `
                  }
                },
                { 
                  title: "SOURCE", 
                  field: "source",
                  filterable: { multi: true, search: true},
                  width: '10%',
                  // media: "xl",
                  template: (dataItem) =>  {
                    return `<span class="tag-source">${dataItem && dataItem.source || ''}</span>`
                  }
                },
                { 
                	title: "CURRENT", 
                	field: "current",
                  filterable: false,
                  width: '10%',
                  // media: "(min-width: 900px)",
                	template: (dataItem) =>  {
							      return `<span class="tag-current">${((dataItem && dataItem.current)  || '') }</span>`;
							    }
                },
                { 
                  title: "UOM", 
                  field: "unit",
                  filterable: { multi: true, search: true},
                  width: '10%',
                  // media: "(max-width: 450px)",
                  template: (dataItem) =>  {
                    return `<span class="tag-uom">${dataItem && dataItem.unit || ''}</span>`
                  }
                },
                { 
                  title: "1 HOURS", 
                  field: "",
                  width: '15%',
                  // media: "(min-width: 850px)",
                  template: (dataItem) =>  {
                    return `<span class="sparkline-chart-${dataItem && dataItem.oneHourSparkline && dataItem.oneHourSparkline.length >0 &&  dataItem.Index} sparkline"></span>`
                  }
                },
                { 
                  title: "1HR AVG.", 
                  field: "oneHourAverage",
                  filterable: false,
                  width: '9%',
                  // media: "(min-width: 850px)",
                  template: (dataItem) =>  {
                    return `<div class="tag-avg">${(dataItem && ((dataItem.oneHourAverage ? dataItem.oneHourAverage + '%' :0 )  || ''))}</div>`;
                  }
                },
                { 
                  title: "24HR AVG.", 
                  field: "oneDayAverage",
                  filterable: false,
                  width: '9%',
                  // media: "(min-width: 850px)",
                  template: (dataItem) =>  {
                    return `<div class="tag-avg">${dataItem && (( dataItem.oneDayAverage ? dataItem.oneDayAverage   + '%' :0) || '')}</div>`;
                  }
                },
                { 
                  title: "", 
                  field: "",
                  width: '12%',
                  // media: "(min-width: 850px)",
                  template: (dataItem) =>  {
                    return `<div style="text-align:center;">
                    ${dataItem && dataItem.tagName ? `<a href=${CONFIG.trenderURL}?tagName=${dataItem.tagName}&tagPath=${dataItem.tagPath}&sessionID=${session}&appID=${appID}&userID=${userID}&username=Guest  target="_blank" class="tag-icon-trender"><i class="icon dd-trender "></i></a><a href="javascript:;" tag-name=${dataItem.tagName} tag-Path=${dataItem.tagPath} class="link-tag-detail tag-icon-details"><i class="icon dd-details "></i></a>` : "" }' 
                    </div>
                    `
                  }
                },
                { 
                  title: "", 
                  field: "",
                  width: '5%',
                  // media: "(min-width: 850px)",
                  template: (dataItem) =>  {
                    return `<div style="text-align:center;">
                    ${dataItem && dataItem.tagName ? `<a href="javascript:;" tag-name=${dataItem.tagName} tag-Path=${dataItem.tagPath} class="link-tag-detail tag-icon-details mobile-arrow"><i class="fa fa-angle-right"></i></a>` : "" } 
                    </div>
                    `
                  }
                },
                           
            ],
           
        });

        var grid = $("#client").data("kendoGrid");
        
        if(this.state.istablet){
          grid.hideColumn("oneHourAverage");
          grid.hideColumn("oneDayAverage");
          grid.hideColumn(7);
        }else if(this.state.ismobile){
          grid.hideColumn("source");
          grid.hideColumn("unit");
          grid.hideColumn("current");
          grid.hideColumn("oneHourAverage");
          grid.hideColumn("oneDayAverage");
          grid.hideColumn(7);
        }
        else if(!this.state.ismobile && !this.state.istablet)
        {
          grid.hideColumn(8);
        }
  }

  checkTotalCount(){
    let totalcount =  (this.props.lastpage*8);
    return totalcount;
  }
 
	componentWillReceiveProps(nextProps){
    // this._renderGrid( nextProps.tagsList )
    let currenttotal =nextProps.totalCount-8
    if( nextProps.tagsList && nextProps.tagsList.length > 0 ){
      var dataSource = new kendo.data.DataSource({
        pageSize: this.props.perPage,
        page :this.state.pageNum,
        schema: {
          total: currenttotal
      },
     
      });

      if(nextProps.tagsList[0].data.length ===0)
        return false;
      const orders =  nextProps.tagsList.length === currenttotal ? nextProps.tagsList :
          new Array(currenttotal).fill().map((e, i) => ({
            Index: i
          }));

        
     var filterpage=this.getfilterDataByPageNum(this.state.pageNum,nextProps.tagsList);

     if(filterpage && filterpage.length>0)
      {filterpage.forEach((order, i) => {

        for(let k=0;k < order.data.length ;k++){
          {
            orders[(k) + nextProps.skipCurrent] = {
              Index: (k) + nextProps.skipCurrent,
              ...order.data[k]
            }
        }}
      });
        

//if(filterpage && filterpage.length>0 && filterpage[0].data && filterpage[0].data.length >0)
     _.map(orders,( item ) => {
        dataSource.add( item)  
      })
    
      var grid = $('#client').data("kendoGrid");
      grid.setDataSource(dataSource);}
      else{
        dataSource.add( [])  
      }
    //}
  }
	}
getfilterDataByPageNum(pagenum,arrayList){
  if(arrayList &&  arrayList.length >0 )
    {
      return arrayList.filter(x=>{
          return x.pageNum === parseInt(pagenum)
    });
    }else{
      return [];
    }
}
  _renderSparkLineChart = ( id, sparkLineData ) => {
    var chart = {
      backgroundColor: null,
      borderWidth: 0,
      type: 'area',
      margin: [2, 0, 2, 0],
      height: 50,
      style: {
          overflow: 'visible'
      },
      skipClone: true,
      animation: false,
      shadow: false,
      reflow: false
    };
    var title = {
      text: ''   
    };
    var credits = {
      enabled: false
    }
    var xAxis = {
      lineWidth: 0,
      gridLineWidth: 0,
      labels: {
          enabled: false
      },
      title: {
          text: null
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: []
    };
    var yAxis = {
      lineWidth: 0,
      gridLineWidth: 0,
      endOnTick: false,
      startOnTick: false,
      labels: {
          enabled: false
      },
      title: {
          text: null
      },
      tickPositions: [0]
    };
    var legend = {
      enabled: false
    }
    var tooltip = {
      enabled: false,
      animation: false
    }

  var series = [{
    name: '',
    borderWidth: 1,
    data: sparkLineData,
    color:'#4fc1e9',
    dataLabels: {
      enabled: false,
      color: '#000000'
    }
  }];

  var plotOptions = {
  
      area: {
          animation: false
      }
  ,    series: {
        color: null,
        opacity: 0,
        animation: false,
        lineWidth: 1,
        shadow: false,
        states: {
            hover: {
                lineWidth: 1
            }
        },
        marker: {
          enabled: false,
          radius: 1,
          states: {
              hover: {
                  radius: 2
              }
          }
        },
        fillOpacity: 0.25,
    },
    area: {
      fillColor: 'transparent',
    },
    column: {
        negativeColor: '#910000',
        borderColor: 'silver'
    }
  }
  
  var json = {};   
    json.chart = chart; 
    json.title = title; 
    json.credits = credits;
    json.xAxis = xAxis; 
    json.yAxis = yAxis; 
    json.legend = legend; 
    json.tooltip = tooltip; 
    json.series = series;
    json.plotOptions = plotOptions
    $(id).highcharts(json);
  }

  _renderAllSparkLineChart = ( ) => {
    let T = this;
    let currentPageData = this.getfilterDataByPageNum(this.state.pageNum,this.props.tagsList);
    let currentIndex =this.state.pageNum*8 -8;
    if(currentPageData && currentPageData.length >0){
    _.map( currentPageData[0].data, (item, k ) => {

      let tagName = item.tagName;
      let sparkLineData = [];
      if( item.oneHourSparkline && item.oneHourSparkline.length > 0 ){
        _.map( item.oneHourSparkline, (aa) => {
          let b = aa.value;
          sparkLineData.push(b)
        })
        let id = '.sparkline-chart-' + currentIndex;
        T._renderSparkLineChart( id, sparkLineData ) 
        currentIndex ++;
      }
    })
  }
  }

  initialize(){
    this._renderGrid( this.props.tagsList )
    let T = this;
    $(document).on('click','.link-tag-detail', function() {
      let tagName = $(this).attr('tag-name')
      let tagPath = $(this).attr('tag-Path')
      T.props.openTagDetailPage( tagName,tagPath )
    })

  }
  setPageSize(){
     if(window.innerWidth >767 && window.innerWidth <1025  ){

      this.setState({istablet :true,ismobile:false},()=>{
        this.initialize()
      })

    } else if(window.innerWidth <768  ){

      this.setState({ismobile:true,istablet :false},()=>{
        this.initialize()
      })

    }else{
      this.setState({ismobile:false,istablet :false},()=>{
        this.initialize()
      })
    }
  
  
  }
	render() {
    this._renderAllSparkLineChart();
		return(
      <div id="tags-list-grid">
      {/* <div class="k-loading-image"></div> */}
        <div id="client"></div>
      </div>
		)
	}
}

export default TagsList
