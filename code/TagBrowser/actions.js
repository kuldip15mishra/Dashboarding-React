import axios from "axios";
import * as actionTypes from '../constants'
import CONFIG from '../../config'
import * as SERVICE from '../../service'
import _ from "lodash";

// fetch tag list
export const fetchTagsList = (skip, limit) => {
  return function (dispatch) {
    let p = {
      method: 'get',
      url: CONFIG.base_api_url + '/signals?skip=' + skip + '&limit=' + limit
    }
    return axios(p)
      .then((response) => {
        dispatch(fetchTagsListSuccess(response.data))
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

export const fetchTagsListSuccess = (data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_SUCCESS,
    data
  }
}

export const fetchTagsListFailed = (data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_FAILED,
    data
  }
}

// fetch tag list item current value 
export const fetchTagsListItemCurrentValue = (tagName) => {
  return function (dispatch) {
   
var requestList =[];
    tagName.forEach(req => {
      requestList.push(axios.get(CONFIG.base_api_url + '/signaldata?tagName=' + req.tagName ))
  
    });
    axios.all(requestList)
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
        dispatch(fetchTagsListItemCurrentValueSuccess(response[i].data))
        }
      })
      .catch((err) => {
        dispatch(fetchTagsListItemCurrentValueFailed(err))
      })
  }
}

export const fetchTagsListItemCurrentValueSuccess = (data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_CURRENT_VALUE_SUCCESS,
    data
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
export const fetchTagsListItemOneHourSparkLine = (tagName, periodFrom, periodTo) => {
  return function (dispatch) {

    var requestList = [];
    tagName.forEach(req => {
      requestList.push(axios.get(CONFIG.base_api_url + '/signaldata?tagName=' + req.tagName + '&periodFrom=' + periodFrom + '&periodTo=' + periodTo))
    });
    axios.all(requestList)
      .then(function (res) {
        console.log(res.length);
        for (let i = 0; i < res.length; i++) {
          dispatch(fetchTagsListItemOneHourSparkLineSuccess(res[i].data))
        }

      })
      .catch(err => dispatch(fetchTagsListItemOneHourSparkLineFailed(err)));

  }
}

export const fetchTagsListItemOneHourSparkLineSuccess = (data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_SPARKLINE_SUCCESS,
    data
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
export const fetchTagsListItemOneHourAverage = (tagName, periodFrom, periodTo) => {
  return function (dispatch) {



    var requestList = [];
    tagName.forEach(req => {
      let url = CONFIG.base_api_url + '/signaldata/expression'
      let expression = "(" + req.tagName + ").avg()"
      let retrievalOptions = {}
      retrievalOptions = {
        "timeOffset": "UTC+05:30",
        "periodFrom": periodFrom,
        "periodTo": periodTo,
        "maxRepresentationPoints": 2000
      }

      let body = {
        "expression": expression,
        "retrievalOptions": retrievalOptions
      }
      requestList.push({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(body),
        url,
      })
    });

    return axios.all(requestList.map(l => axios.request(l)))
    .then((response) => {
      if(response){
        for (let i = 0; i < response.length; i++) {
          dispatch(fetchTagsListItemOneHourAverageSuccess(tagName[i].tagName, response[i].data))
        }

      }
      
    })
    .catch((err) => {
      dispatch(fetchTagsListItemOneHourAverageFailed(err))
    })
   
      
  }
}

export const fetchTagsListItemOneHourAverageSuccess = (tagName, data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_AVERAGE_SUCCESS,
    tagName,
    data
  }
}

export const fetchTagsListItemOneHourAverageFailed = (tagName, data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_AVERAGE_FAILED,
    tagName,
    data
  }
}

// fetch tag list item 24 hours(1day) average 
export const fetchTagsListItemOneDayAverage = (tagName, periodFrom, periodTo) => {
  return function (dispatch) {
    let url = CONFIG.base_api_url + '/signaldata/expression'
   
    var requestList = [];
    tagName.forEach(req => {
      let expression = "(" + req.tagName + ").avg()"
      let retrievalOptions = {}
      retrievalOptions = {
        "timeOffset": "UTC+05:30",
        "periodFrom": periodFrom,
        "periodTo": periodTo,
        "maxRepresentationPoints": 2000
      }
  
      let body = {
        "expression": expression,
        "retrievalOptions": retrievalOptions
      }
      requestList.push({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(body),
        url,
      })
    })
    return axios.all(requestList.map(l => axios.request(l)))
      .then((response) => {
        if(response){
          for (let i = 0; i < response.length; i++) {
           dispatch(fetchTagsListItemOneDayAverageSuccess(tagName[i].tagName, response[i].data))
          }
        }
      })
      .catch((err) => {
        dispatch(fetchTagsListItemOneDayAverageFailed(err))
      })
  }
}

export const fetchTagsListItemOneDayAverageSuccess = (tagName, data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEDAY_AVERAGE_SUCCESS,
    tagName,
    data
  }
}

export const fetchTagsListItemOneDayAverageFailed = (tagName, data) => {
  return {
    type: actionTypes.FETCH_TAGS_LIST_ITEM_ONEDAY_AVERAGE_FAILED,
    tagName,
    data
  }
}