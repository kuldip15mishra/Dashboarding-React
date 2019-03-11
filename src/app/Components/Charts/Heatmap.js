import React, { Component } from "react";

const $ = window.$;
const Highcharts = window.Highcharts
const document = window.document;

class Heatmap extends Component {
  _renderChart = ( data ) =>  {
    var chart = {
      type: 'heatmap',
      marginTop: 100,
      marginBottom: 50,
    };
    var title = {
      text: ''   
    };
    var xAxis = {
      type: 'datetime',
      categories: data.xAxis || [],
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Roboto',
          color: '#9faebc'
        }
    }
    };
    var yAxis = {
      categories: data.yAxis || [],
      title: null,
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Roboto',
          color: '#9faebc'
        }
    }
    };
    var colorAxis ={
      stops: [
        [0, '#3060cf'],
        [0.5, '#fffbbc'],
        [0.9, '#c4463a'],
        [1, '#c4463a']
      ],
      min: data.legend_min_value || 0,
      max: data.legend_max_value || 0,
      startOnTick: false,
      endOnTick: false,
    }
    var legend = {
      align: 'right',
      layout: 'horizontal',
      verticalAlign: 'top',
      symbolWidth:450,
      symbolHeight:27,
     
      
      
    
    };
    

  var series = [{
    name: '',
    borderWidth: 1,
    data: data.data,
  //   tooltip: {
      
  //     pointFormat: '{point.y:%A, %b %e,} {point.x}:00:'
  // },
    dataLabels: {
      enabled: false,
      color: '#000000'
    }
  }];
  var tooltip ={
    formatter: function () {
        return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> No <br><b>' +
            this.point.value + '</b> values on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
    }
}

  var credits = {
      enabled: false
    }

  var json = {};   
    json.chart = chart; 
    json.credits = credits;
    json.title = title;       
    json.xAxis = xAxis; 
    json.yAxis = yAxis; 
    json.colorAxis = colorAxis; 
    json.legend = legend; 
    json.tooltip = tooltip; 
    json.series = series; 

    console.log(JSON.stringify(json));
    
    $('#heatmap-chart-container').highcharts(json);
  }

  componentWillReceiveProps( nextProps ) {
    if( nextProps.data ){
      this._renderChart( nextProps.data )
    }
  }

  componentDidUpdate(nextProps, prevProps) {
    
    // if(nextProps.data.length>0){
    //  this._renderChart( nextProps.data )
    // }
    
 }

 componentDidMount() {
    
  if(this.props.data.length>0){
       this._renderChart( this.props.data )
  }
  




}


  render() {
    return(
      <div className="position-relative"> 
        <div id="heatmap-chart-container"></div> 
      </div>
    )
  }
}

export default Heatmap