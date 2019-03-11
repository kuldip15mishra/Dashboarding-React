import axios from "axios";
import * as actionTypes from '../constants'
import CONFIG from '../../config'

//set time period opted
export const setTimePeriodOpted = (optedPeriod) => {
  return {
    type: actionTypes.SET_TIME_PERIOD_OPTED,
    payload: optedPeriod
  }
}

// tag meta data
export const fetchTagMetaData = ( tagName ) => {
	return function(dispatch) {
    let p = {
      method: 'get',
      url: CONFIG.base_api_url + '/signals?tagPath=' +  tagName
    }
    var userID= localStorage.getItem("userID")
      var sessionID=localStorage.getItem("sessionID")
      var resource= localStorage.getItem("resource")
    axios.defaults.headers.common['user-id'] = userID;
    axios.defaults.headers.common['session-id'] = sessionID;
    axios.defaults.headers.common['app-id'] = resource;
    return axios(p)
      .then((response) => {
        
        dispatch( fetchTagMetaDataSuccess( response.data ) )
      })
      .catch((err) => {
        dispatch( fetchTagMetaDataFailed( err ) )
      })
  }
}

export const fetchTagMetaDataSuccess = ( data ) => {
	 return {
    type: actionTypes.FETCH_TAG_META_DATA_SUCCESS,
    payload:data.data[0]
  }
}

export const fetchTagMetaDataFailed = ( data ) => {
	 return {
    type: actionTypes.FETCH_TAG_META_DATA_FAILED,
    data
  }
}

// tag current data
// value
export const fetchTagCurrentValue = ( tagName ) => {
  return function(dispatch) {
    let p = {
      method: 'get',
      url: CONFIG.base_api_url + '/signaldata?tagPath='+tagName + '&limit='+ CONFIG.limit + '&maxReductionPoints='+ CONFIG.maxReductionPoints+ '&RepresentationAlgorithm='+ CONFIG.RepresentationAlgorithm
    }
    var userID= localStorage.getItem("userID")
      var sessionID=localStorage.getItem("sessionID")
      var resource= localStorage.getItem("resource")
    axios.defaults.headers.common['user-id'] = userID;
    axios.defaults.headers.common['session-id'] = sessionID;
    axios.defaults.headers.common['app-id'] = resource;
    return axios(p)
      .then((response) => {
     
        dispatch( fetchTagCurrentValueSuccess( response.data ) )
      })
      .catch((err) => {
        dispatch( fetchTagCurrentValueFailed( err ) )
      })
  }
}

export const fetchTagCurrentValueSuccess = ( data ) => {
   return {
    type: actionTypes.FETCH_TAG_CURRENT_VALUE_SUCCESS,
    data
  }
}

export const fetchTagCurrentValueFailed = ( data ) => {
   return {
    type: actionTypes.FETCH_TAG_CURRENT_VALUE_FAILED,
    data
  }
}
// average
export const fetchTagCurrentAverage = ( tagName, periodFrom, periodTo ) => {
  return function(dispatch) {
    let url = CONFIG.base_api_url + '/signaldata/expression'
    let expression=""
    let retrievalOptions={}
    expression = "("+tagName+").AVG(86400000)"
      retrievalOptions= {
        "timeOffset": "UTC+05:30",
        "periodTo": periodTo,
        "periodFrom":periodFrom,
     
        
        "maxReductionPoints": CONFIG.maxReductionPoints

      }
    
    let body = {
      "expression": expression,
      "retrievalOptions": retrievalOptions,
      "pagination": {
        "skip": 0,
        "limit": CONFIG.limit
      }
    }
    var userID= localStorage.getItem("userID")
      var sessionID=localStorage.getItem("sessionID")
      var resource= localStorage.getItem("resource")
    axios.defaults.headers.common['user-id'] = userID;
    axios.defaults.headers.common['session-id'] = sessionID;
    axios.defaults.headers.common['app-id'] = resource;
    const p = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data:  JSON.stringify( body ),
      url,
    };    
    return axios(p)
      .then((response) => {
     
        dispatch( fetchTagCurrentAverageSuccess( response.data ) )
      })
      .catch((err) => {
        dispatch( fetchTagCurrentAverageFailed( err ) )
      })
  }
}

export const fetchTagCurrentAverageSuccess = ( data ) => {
   return {
    type: actionTypes.FETCH_TAG_CURRENT_AVERAGE_SUCCESS,
    data
  }
}

export const fetchTagCurrentAverageFailed = ( data ) => {
   return {
    type: actionTypes.FETCH_TAG_CURRENT_AVERAGE_FAILED,
    data
  }
}

//histogram
export const fetchTagHistogramData = ( tagName, periodFrom, periodTo ) => {
  return function(dispatch) {
    let p = {
      method: 'get',
      url: CONFIG.base_api_url + '/signaldata?tagPath='+ tagName + '&periodFrom=' + periodFrom + '&periodTo=' + periodTo + '&limit='+CONFIG.limit+ '&maxReductionPoints='+ CONFIG.maxReductionPoints+ '&RepresentationAlgorithm='+CONFIG.RepresentationAlgorithm
    }
    var userID= localStorage.getItem("userID")
      var sessionID=localStorage.getItem("sessionID")
      var resource= localStorage.getItem("resource")
    axios.defaults.headers.common['user-id'] = userID;
    axios.defaults.headers.common['session-id'] = sessionID;
    axios.defaults.headers.common['app-id'] = resource;
    return axios(p)
      .then((response) => {

    
       
        dispatch( fetchTagHistogramDataSuccess( response.data ) )
      })
      .catch((err) => {
        dispatch( fetchTagHistogramDataFailed( err ) )
      })
  }
}

export const fetchTagHistogramDataSuccess = ( data ) => {
   return {
    type: actionTypes.FETCH_TAG_HISTOGRAM_DATA_SUCCESS,
    data
  }
}

export const fetchTagHistogramDataFailed = ( data ) => {
   return {
    type: actionTypes.FETCH_TAG_HISTOGRAM_DATA_FAILED,
    data
  }
}

//heatmap
export const fetchTagHeatmapData = ( tagName, timePeriodOptedType, periodFrom, periodTo ) => {
  return function(dispatch) {
    let url = CONFIG.base_api_url + '/signaldata/expression'
    let expression = ""
    let retrievalOptions={}
    if( timePeriodOptedType == '1H' || timePeriodOptedType == '8H' || timePeriodOptedType == '24H' ){
     // expression = "("+tagName+").interpolate("+periodFrom+","+ periodTo+",60000)"
     expression = "("+tagName+").AVG(60000)"
     retrievalOptions= {
      "periodTo": periodTo,
      "periodFrom":periodFrom,
      
      
        "timeOffset": "UTC+05:30",
        "RepresentationAlgorithm": CONFIG.RepresentationAlgorithm,
        "maxReductionPoints": CONFIG.maxReductionPoints
    
      }
      
      
      
    } else {
      
 
        // expression = "("+tagName+").avg("+periodFrom+","+ periodTo+",3600000)"
      expression = "("+tagName+").AVG(3600000)"
      retrievalOptions= {
        "timeOffset": "UTC+05:30",
        "periodTo": periodTo,
        "periodFrom":periodFrom,
    

	      "RepresentationAlgorithm": CONFIG.RepresentationAlgorithm,
        "maxReductionPoints": CONFIG.maxReductionPoints

      }
    }
    let body = {
      "expression": expression,
      "retrievalOptions": retrievalOptions,
      "pagination": {
        "skip": 0,
        "limit": CONFIG.limit
      }
    }
    const p = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data:  JSON.stringify( body ),
      url,
    }; 
    var userID= localStorage.getItem("userID")
      var sessionID=localStorage.getItem("sessionID")
      var resource= localStorage.getItem("resource")
    axios.defaults.headers.common['user-id'] = userID;
    axios.defaults.headers.common['session-id'] = sessionID;
    axios.defaults.headers.common['app-id'] = resource;
    return axios(p)
      .then((response) => {
        
        dispatch( fetchTagHeatmapDataSuccess( timePeriodOptedType, response.data ) )
      })
      .catch((err) => {
        dispatch( fetchTagHeatmapDataFailed( err ) )
      })
  }
}

export const fetchTagHeatmapDataSuccess = ( timePeriodOptedType, data ) => {
   return {
    type: actionTypes.FETCH_TAG_HEATMAP_DATA_SUCCESS,
    timePeriodOptedType,
    data
  }
}

export const fetchTagHeatmapDataFailed = ( data ) => {
   return {
    type: actionTypes.FETCH_TAG_HEATMAP_DATA_FAILED,
    data
  }
}
