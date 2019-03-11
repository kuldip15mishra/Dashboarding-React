import React, { Component } from "react";
const $ = window.$;
class LineChart extends Component {

  constructor( props ){
    super( props )
    this.state = {
        data: this.props.data
    }
  }

  _renderChart = (data) => {
    const Highcharts = window.Highcharts


  
      Highcharts.setOptions({
     
      global: {
      useUTC: false
      }
      }) 
 


    Highcharts.stockChart('line-chart-container', {
        chart: {
        },
        xAxis: {
          gridLineWidth: 1,
          labels: {
            style: {
              fontSize: '12px',
              fontFamily: 'Roboto',
              color: '#9faebc'
            }
        }
        },
        yAxis: {
          gridLineWidth: 0,
          opposite: false,
          labels: {
            style: {
              fontSize: '12px',
              fontFamily: 'Roboto',
              color: '#9faebc'
            }
        }
        },
        navigator: {
            enabled: false
        },
        rangeSelector: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        global: {
          useUTC: false
          },
        title: {
            // text: 'AAPL Stock Price'
        },
        credits : {
          enabled: false
        },
        
        series: [{
            name: 'Value',
            data: data,
            tooltip: {
                valueDecimals: 2
            },
           
            
            
            color:'#4fc1e9'
        }]
    });
  }

  componentDidMount() {
   
    if(this.props.data.length>0){
         this._renderChart( this.props.data )
    }
    
  

 

}

  componentWillReceiveProps( nextProps ) {
    if( nextProps.data && nextProps.data.length > 0 ){
      // if( this.state.data.length !== nextProps.data.length ){
        this.setState({
            data: nextProps.data
        },() => {
            this._renderChart( nextProps.data )
        })
      // }
    }
  }

  componentDidUpdate(nextProps, prevProps) {
   
    // if(nextProps.data.length>0 && nextProps!= prevProps){
    //  this._renderChart( nextProps.data )
    // }
    
 }


  render() {
    // this.aa()
    return(
      <div className="position-relative"> 
        <div id="line-chart-container"></div>
      </div>
    )
  }
}

export default LineChart