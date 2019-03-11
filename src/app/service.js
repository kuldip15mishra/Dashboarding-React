import  moment from 'moment-timezone'
import _ from "lodash";

export const getPeriodData = period => {
  return {
    periodFrom: "",
    periodTo: ""
  };
};

export const getTrendingDataForGraph = data => {
  return data.map(item => {
    return [item.timestamp, item.value];
  });
};

export const getDayOptedHeatmapAxis = timePeriodOptedType => {

  

  let xAxis = [];
  let yAxis = [];
  let x = 0;
  let y = 0;
  let xPrepend = '';
  let yPrepend = '';

  let YFormatType = ''

  if( timePeriodOptedType == '1H' ){
    x = 60;
    y = 1;
    xPrepend = 'Mins'
    yPrepend = 'HR'
    YFormatType = 'HR'
  } else if( timePeriodOptedType == '8H' ){
    x = 60;
    y = 8;
    xPrepend = 'Mins'
    yPrepend = 'HR'
    YFormatType = 'HR'
  } else if( timePeriodOptedType == '1D' ){
    x = 60;
    y = 24;
    xPrepend = 'Mins'
    yPrepend = 'HR'
    YFormatType = 'HR'
  } else if( timePeriodOptedType == '7D' ){
    x = 24;
    y = 7;
    xPrepend = 'HR'
    yPrepend = 'Day'
    YFormatType = 'DAY'
  } else if( timePeriodOptedType == '30D' ){
    x = 24;
    y = 30;
    xPrepend = 'HR'
    yPrepend = 'Day'
    YFormatType = 'Day'
  }

  let i = 1
  let j = 0

  do {
    // xAxis.push(i + xPrepend )
    xAxis.push(i)
    i++;
  } while ( i <= x )

  if( YFormatType.toLowerCase() == 'day' ){
    do {
      let momentTime = moment().tz("Asia/Kolkata");
      let mT = momentTime.subtract(j, "days").format('D-MMM')
      yAxis.push(mT)
      j++;
    } while ( j <= y )

  } else {

    do {
      let momentTime = moment().tz("Asia/Kolkata");
      let mT = momentTime.subtract(j, "hours").startOf('hour').format('h:mm a');
      yAxis.push(mT)
      j++;
    } while ( j <= y )
    // do {
    //   yAxis.push(j + yPrepend)
    //   j++;
    // } while ( j <= y )
  }
  
  return {
    xAxisCount: x,
    yAxisCount: y,
    xAxis: xAxis,
    yAxis: yAxis
  }
}

export const manipulateForHeatMap = ( timePeriodOptedType, data ) => {  
  let finalMatrix = [];
  let final_yaxis = [];
  if( timePeriodOptedType == '1D' || timePeriodOptedType == '7D' || timePeriodOptedType == '30D' ){
    let dd = [];
    let hours = []
    for( var i = 0;  i<=23; i++ ){
      let r = {n: 0}
      hours.push(r);
    }
    _.map( data, ( item, key ) => {
      let ts = item.timestamp;
   
      ts = ts / 1000;
      let tsDateMonth = moment.unix(ts).format("D-MMM");
      let tsTime = moment.unix(ts).format("H");
      let tsDate = moment.unix(ts).format("D-MMM");
      if( dd[tsDateMonth] ){
        dd[tsDateMonth][tsTime] = { n :  item.value }
      } else {
        dd[tsDateMonth] = _.cloneDeep(hours);
        dd[tsDateMonth][tsTime] = { n: item.value}
      }
    })
    let kk = 0;
    for( var k in dd ){
      final_yaxis.push(k)
      let arr = dd[k]
      _.map( arr, (item,key ) => {
        let r = []
        r.push(key)
        r.push(kk)
        r.push(item.n)
        finalMatrix.push( r )
        
      })
      kk++;
    }
  
  } else {
    let dd = [];
    let minutes = []
    for( var i = 0;  i<=60; i++ ){
      let r = {n: 0}
      minutes.push(r);
    }
    _.map( data, ( item, key ) => {
      let ts = item.timestamp;
      ts = ts / 1000;
      let tsDateMonth = moment.unix(ts).format("D-MMM");
      let tsTime = moment.unix(ts).startOf('hour').format("D-MMM H:mm");
      let tsMin = moment.unix(ts).format('m');
      let tsDate = moment.unix(ts).format("D-MMM");
      if( dd[tsTime] ){
        dd[tsTime][tsMin] = { n :  item.value }
      } else {
        dd[tsTime] = _.cloneDeep(minutes);
        dd[tsTime][tsMin] = { n: item.value}
      }
    })
    let kk = 0;
    for( var k in dd ){
      final_yaxis.push(k)
      let arr = dd[k]
      _.map( arr, (item,key ) => {
        let r = []
        r.push(key)
        r.push(kk)
        r.push(item.n)
        finalMatrix.push( r )
        
      })
      kk++;
    }
   
  }


  /////////
  let getDayOptedHeatmapAxis_details = getDayOptedHeatmapAxis( timePeriodOptedType );

  let xAxisCount = getDayOptedHeatmapAxis_details.xAxisCount;
  let yAxisCount = getDayOptedHeatmapAxis_details.yAxisCount;



  let matrix = [];

  var X = 0;
  do {
    var Y = 0;
    do{
      let YY = [X, Y];
      matrix.push( YY )
      Y++;
    } while ( Y < yAxisCount)
    X++;
  }
  while (X < xAxisCount );

  let legend_max_value = 0;
  let legend_min_value = 0;
  let preLegendsArray = []

  let newMatrix = _.map( matrix, ( item, key ) => {
    if( data[key] && data[key].value ){
      item.push( data[key].value )
      preLegendsArray.push( data[key].value)
    } else {
      item.push( '0' )
    }
    return item;
  })

  if( preLegendsArray.length > 0 ){
    preLegendsArray = _.sortBy(preLegendsArray, [function(o) { return o; }]);
    legend_min_value = preLegendsArray[0]
    legend_max_value = preLegendsArray[preLegendsArray.length - 1]
  }
  
  return {
    // data: newMatrix,
    data: finalMatrix,
    xAxis: getDayOptedHeatmapAxis_details.xAxis,
    // yAxis: getDayOptedHeatmapAxis_details.yAxis,
    yAxis: final_yaxis,
    legend_min_value,
    legend_max_value
  }
}

export const calculateDelta = (current, average) => {
  //val1 = current value
  //var2 = average value
  if( current && average != "" ){
    let diff = current - average
    return  Math.round( (diff / average ) * 100 );
  }
  return "";
};

// get periods from and period to
export const getCurrentPeriodFromTo = () => {

  let momentTime = moment().tz("Asia/Kolkata");

  let periodTo = momentTime.valueOf();
  return {
    "1H": {
      periodFrom: momentTime
        .subtract(1, "hours")
        .valueOf(),
      periodTo: periodTo
    },
    "8H": {
      periodFrom: momentTime
        .subtract(8, "hours")
        .valueOf(),
      periodTo: periodTo
    },
    "1D": {
      periodFrom: momentTime
        .subtract(24, "hours")
        .valueOf(),
      periodTo: periodTo
    },
    "7D": {
      periodFrom: momentTime
        .subtract(7, "days")
        .valueOf(),
      periodTo: periodTo
    },
    "30D": {
      periodFrom: momentTime
        .subtract(30, "days")
        .valueOf(),
      periodTo: periodTo
    }
  };
};
