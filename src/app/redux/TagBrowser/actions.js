import axios from "axios";
import * as actionTypes from '../constants'
import CONFIG from '../../config'
import * as SERVICE from '../../service'
import _ from "lodash";

// fetch tag list
export const fetchTagsList = (skip, limit,pageNum) => {
  return function (dispatch) {
    let bodyParams ={
      "skip": skip,
      "limit": limit,
      "timeperiod":"['CURRENT','1HOUR','1HOURAVG','24HOURAVG']",
      "userID": localStorage.getItem("userID"),
      "sessionID":localStorage.getItem("sessionID"),
      "resource": localStorage.getItem("resource"),
      pageNum :pageNum
    }
    let p = {
      method: 'post',
      url: CONFIG.base_node_url,
      data: bodyParams
      
    }
    return axios(p)
      .then((response) => {

        if(response.data.payload.message === "not authorized"){
          localStorage.clear();
             window.location.href = "https://solutionviewer.ddriven.xyz";
          // window.location.href = "http://101.53.139.108:5000/";
         // window.location.href = "http://localhost:3000/login";
        }else{
        dispatch(fetchTagsListSuccess(response.data,response.data.payload.totalCount,skip,limit,pageNum))}
        //if( response.data.data && response.data.data.length > 0 ){

        //  dispatch( fetchTagsListItemCurrentValue( tag.tagName ) )
        // let currentPerioFromTo = SERVICE.getCurrentPeriodFromTo();
        // _.map( response.data.data, (tag,k) => {
        //   setTimeout( function timer(){
        //       dispatch( fetchTagsListItemCurrentValue( tag.tagName ) )
        //       dispatch( fetchTagsListItemOneHourSparkLine( tag.tagName, currentPerioFromTo['1H'].periodFrom,  currentPerioFromTo['1H'].periodTo ) )
        //       dispatch( fetchTagsListItemOneHourAverage( tag.tagName, currentPerioFromTo['1H'].periodFrom,  currentPerioFromTo['1H'].periodTo ) )
        //       dispatch( fetchTagsListItemOneDayAverage( tag.tagName, currentPerioFromTo['1D'].periodFrom,  currentPerioFromTo['1D'].periodTo ) )
        //   }, k*4000 );
        // })
        // }

      })
      .catch((err) => {
        dispatch(fetchTagsListFailed(err))
      })
  }
}




export const fetchTagsListSuccess = (data,totalCount,skip,limit,pageNum) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_SUCCESS,
    data,
    totalCount,
    skip,
    limit,
    pageNum
    
  }
}

export const fetchTagsListFailed = (data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_FAILED,
    data
  }
}

// fetch tag list item current value 
export const fetchTagsListItemCurrentValue = (skip, limit ) => {
  return function (dispatch) {



    var requestList = [];
   
      let url = CONFIG.base_node_url + '/current'

     

      
      let retrievalOptions = {}
      retrievalOptions = {
        "skip": skip,
        "limit": limit,
        "timeperiod": "CURRENT",
        "userID": localStorage.getItem("userID"),
        "sessionID":localStorage.getItem("sessionID"),
        "resource": localStorage.getItem("resource")
       
      }

      // let body = {
      //   "expression": expression,
      //   "retrievalOptions": retrievalOptions
      // }
      requestList.push({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(retrievalOptions),
        url,
      
    });

    return axios.all(requestList.map(l => axios.request(l)))
    .then((response) => {
      if(response){
      
          dispatch(fetchTagsListItemCurrentValueSuccess(response[0].data.payload))
        

      }
      
    })
    .catch((err) => {
      dispatch(fetchTagsListItemCurrentValueFailed(err))
    })
   
      
  }
}

export const fetchTagsListItemCurrentValueSuccess = (data,page) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_CURRENT_VALUE_SUCCESS,
    data,
    page
  }
}

export const fetchTagsListItemCurrentValueFailed = (data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_CURRENT_VALUE_FAILED,
    data
    
  }
}

// fetch tag list item one hour spark line
// export const fetchTagsListItemOneHourSparkLine = ( tagName, periodFrom, periodTo ) => {
//   return function(dispatch) {
//     let p = {
//       method: 'get',
//       url: CONFIG.base_api_url + '/signaldata?tagName=' +  tagName +'&periodFrom=' + periodFrom +'&periodTo='+periodTo
//     }
//     return axios(p)
//       .then((response) => {
//           dispatch( fetchTagsListItemOneHourSparkLineSuccess( response.data ) )
//       })
//       .catch((err) => {
//         dispatch( fetchTagsListItemOneHourSparkLineFailed( err ) )
//       })
//   }
// }

// fetch tag list item one hour spark line
export const fetchTagsListItemOneHourSparkLine = (skip, limit) => {
  return function (dispatch) {



    var requestList = [];
   
      let url = CONFIG.BASE_URL + '/tag/tagdata/1hr'
     
      let retrievalOptions = {}
      retrievalOptions = {
        "skip": skip,
        "limit": limit,
        "timeperiod": "1HOUR",
        "userID": localStorage.getItem("userID"),
        "sessionID":localStorage.getItem("sessionID"),
        "resource": localStorage.getItem("resource")
       
      }

      // let body = {
      //   "expression": expression,
      //   "retrievalOptions": retrievalOptions
      // }
      requestList.push({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(retrievalOptions),
        url,
      
    });

    return axios.all(requestList.map(l => axios.request(l)))
    .then((response) => {
      if(response){

     
      
          dispatch(fetchTagsListItemOneHourSparkLineSuccess(response[0].data.payload))
        

      }
      
    })
    .catch((err) => {
      dispatch(fetchTagsListItemOneHourSparkLineFailed(err))
    })
   
      
  }
}

export const fetchTagsListItemOneHourSparkLineSuccess = (data,page) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_SPARKLINE_SUCCESS,
    data,
    page
    }
}

export const fetchTagsListItemOneHourSparkLineFailed = (data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_SPARKLINE_FAILED,
    data
  }
}

// fetch tag list item one hour average
// export const fetchTagsListItemOneHourAverage = ( tagName, periodFrom, periodTo ) => {
//   return function(dispatch) {
//     let url = CONFIG.base_api_url + '/signaldata/expression'
//     let expression = "("+tagName+").avg()"
//     let retrievalOptions={}
//     retrievalOptions= {
//       "timeOffset": "UTC+05:30",
//       "periodFrom" : periodFrom,
//       "periodTo" : periodTo,
//       "maxRepresentationPoints": 2000
//     }

//     let body = {
//       "expression": expression,
//       "retrievalOptions":retrievalOptions
//     }
//     const p = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       data:  JSON.stringify( body ),
//       url,
//     };   
//     return axios(p)
//       .then((response) => {
//           dispatch( fetchTagsListItemOneHourAverageSuccess( tagName, response.data ) )
//       })
//       .catch((err) => {
//         dispatch( fetchTagsListItemOneHourAverageFailed( err ) )
//       })
//   }
// }

// fetch tag list item one hour average
export const fetchTagsListItemOneHourAverage = (skip, limit) => {
  return function (dispatch) {



    var requestList = [];
   
      let url = CONFIG.BASE_URL + '/tag/tagdata/1hravg'
      
      let retrievalOptions = {}
      retrievalOptions = {
        "skip": skip,
        "limit": limit,
        "timeperiod": "1HOURAVG",
        "userID": localStorage.getItem("userID"),
        "sessionID":localStorage.getItem("sessionID"),
        "resource": localStorage.getItem("resource")
       
      }

      // let body = {
      //   "expression": expression,
      //   "retrievalOptions": retrievalOptions
      // }
      requestList.push({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(retrievalOptions),
        url,
      
    });

    return axios.all(requestList.map(l => axios.request(l)))
    .then((response) => {
      if(response){
        
          dispatch(fetchTagsListItemOneHourAverageSuccess(response[0].data.payload))
        

      }
      
    })
    .catch((err) => {
      dispatch(fetchTagsListItemOneHourAverageFailed(err))
    })
   
      
  }
}

export const fetchTagsListItemOneHourAverageSuccess = ( data,page) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_AVERAGE_SUCCESS,
    data,
    page
  }
}

export const fetchTagsListItemOneHourAverageFailed = (data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_AVERAGE_FAILED,
    data
  }
}

// fetch tag list item 24 hours(1day) average 
export const fetchTagsListItemOneDayAverage = (skip, limit) => {
  return function (dispatch) {
    var requestList = [];
   
      let url = CONFIG.BASE_URL + '/tag/tagdata/24hravg'
      
      let retrievalOptions = {}
      retrievalOptions = {
        "skip": skip,
        "limit": limit,
        "timeperiod": "24HOURAVG",
        "userID": localStorage.getItem("userID"),
        "sessionID":localStorage.getItem("sessionID"),
        "resource": localStorage.getItem("resource")
       
      }

      // let body = {
      //   "expression": expression,
      //   "retrievalOptions": retrievalOptions
      // }
      requestList.push({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(retrievalOptions),
        url,
      
    });

    return axios.all(requestList.map(l => axios.request(l)))
    .then((response) => {
      if(response){
      
          dispatch(fetchTagsListItemOneDayAverageSuccess(response[0].data.payload))
        

      }
      
    })
    .catch((err) => {
      dispatch(fetchTagsListItemOneDayAverageFailed(err))
    })
  }
}

export const fetchTagsListItemOneDayAverageSuccess = (data,page) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEDAY_AVERAGE_SUCCESS,
   
    data,
    page
  }
}

export const fetchTagsListItemOneDayAverageFailed = (data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEDAY_AVERAGE_FAILED,
    
    data
  }
}