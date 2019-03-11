import React, { Component } from "react";

const $ = window.$;
const Highcharts = window.Highcharts

class Histogram extends Component {

    constructor( props ){
        super( props )
    
        this.state = {
            data: this.props.data
        }
        
    }


	_renderChart = ( data ) =>  {

        console.log("dscdsvdffe")
       
        let graphData = [];
        data.map((item) => {
            
            graphData.push( item.value )
        })

       

		
        Highcharts.chart('histogram-chart-container', {
            chart: {
            },
            title: {
                text: null
            },
            xAxis: [
                {
                title: { text: '' },
                alignTicks: false,
                opposite: false,
                visible: false
            },
            // {labels: {
            //     style: {
            //       fontSize: '12px',
            //       fontFamily: 'Roboto',
            //       color: '#9faebc'
            //     }
            // }}
            {
                title: { text: this.props.unit },
                alignTicks: false,                
            }],

            yAxis: [{
                title: { text: '' },
                opposite: true,
                visible: false
             }
           // ,{labels: {
            //     style: {
            //       fontSize: '12px',
            //       fontFamily: 'Roboto',
            //       color: '#9faebc'
            //     }
            // }}
            , {
                title: { text: 'Frequency' },

            }],

            credits : {
                enabled: false
            },

            legend : {
                enabled: false
            },
           
            series: [{
                name: 'Histogram',
                type: 'histogram',
                xAxis: 1,
                yAxis: 1,
                baseSeries: 's1',
                zIndex: -1,
                binsNumber: 10,
                color:'#4fc1e9',
               
            }, {
                name: 'Data',
                type: 'scatter',
                data: graphData,
                id: 's1',
                marker: {
                    enabled: false,
                    radius: 1
                },
                enableMouseTracking: false
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
            console.log(this.state.data.length)
            console.log(nextProps.data.length)
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
       
    
    //    if(nextProps.data.length>0 && nextProps.data!= this.state.data){
         
    //     this._renderChart( nextProps.data )
    //    }
       
    }
    

	render() {
		return(
			<div className="position-relative"> 
				<div id="histogram-chart-container"></div> 
			</div>
		)
	}
}

export default Histogram