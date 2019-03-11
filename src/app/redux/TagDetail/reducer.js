import {handleActions} from 'redux-actions'
import update from 'immutability-helper';
import { cloneDeep } from 'lodash';
import * as actionTypes from '../constants';
import * as SERVICE from '../../service';

const initialState = {
	timePeriodOpted : {
		type: '7D', // 1H, 8H, 24H, 7D, 30D
		periodFrom: '', // will be the timestamp according to the type choosen ( create a service to get this )
		periodTo: '', // will be the timestamp according to the type choosen ( create a service to get this ),
		timePeriodList: [
			{ text:'1H', value: '1H'},
			{ text:'8H', value: '8H'},
			{ text:'1D', value: '1D'},
			{ text:'7D', value: '7D'},
			{ text:'30D', value: '30D'}
		]
	},
	metaData : {
		tagName: '',
		description: '',
		unit: '',
		source:''
	},
	currentData: {
		value: '',
		average: '',
		delta: ''
	},
	histogramData: [],
	trendingData:[],
	heatMapData:{}
}

//--tag meta data
const setTimePeriodOpted = (state, action) => {
	let optedPeriod = action.payload;
	let periods = SERVICE.getPeriodData( optedPeriod );

	let data = cloneDeep(state);
	return update(data, {
		timePeriodOpted:{
			type:  { $set: action.payload },
			periodFrom:  { $set: periods.periodFrom },
			periodTo:  { $set: periods.periodTo }
		}
	});
}

//--tag meta data
const fetchTagMetaDataSuccess = (state, action) => {
	return update(state, {
		metaData: {
			tagName: { $set: action.payload.tagName },
			description: {$set: action.payload.description},
			unit: {$set: action.payload.unit},
			source: { $set: action.payload.source }
		}
	  })
	  
	
	// let data = cloneDeep(state);
	// let metaData = {};
	// if( action.data && action.data.data && action.data.data.length > 0 ){
	// 	metaData = action.data.data[0];
	// }
	// return update(data, {
	// 	metaData: { $set: metaData }
	// });
}
const fetchTagMetaDataFailed = (state, action) => {
	let data = cloneDeep(state);
	return data
}

// tag current value
const fetchTagCurrentValueSuccess = (state, action) => {
	let data = cloneDeep(state);
	let currentData_value = "";
	if( action.data && action.data.data && action.data.data.length > 0 ){
		currentData_value = action.data.data[0].value;
	}
	return update(data, {
		currentData:{
			value:  { $set: currentData_value },
			delta : {$set: SERVICE.calculateDelta(currentData_value,data.currentData.average)}
		}
	});
}
const fetchTagCurrentValueFailed = (state, action) => {
	let data = cloneDeep(state);
	let currentData_value = "";
	return data
}

// tag current average
const fetchTagCurrentAverageSuccess = (state, action) => {
	let data = cloneDeep(state);
	let currentData_average = "";
	if( action.data && action.data.data && action.data.data.length > 0 ){
		currentData_average = action.data.data[0].value;
	}
	return update(data, {
		currentData:{
			average:  { $set: currentData_average },
			delta : {$set: SERVICE.calculateDelta(data.currentData.value, currentData_average)}
		}
	});
}
const fetchTagCurrentAverageFailed = (state, action) => {
	let data = cloneDeep(state);
	let currentData_value = "";
	return data
}

// tag histogram & trendig data
const fetchTagHistogramDataSuccess = (state, action) => {
	let data = cloneDeep(state);
	let histogramData = [];
	if( action.data && action.data.data && action.data.data.length > 0 ){
		histogramData = action.data.data;
	}
	let trendingData = SERVICE.getTrendingDataForGraph(histogramData);  
	return update(data, {
		histogramData:{ $set: histogramData },
		trendingData: { $set: trendingData }
	});
	return data
}
const fetchTagHistogramDataFailed = (state, action) => {
	let data = cloneDeep(state);
	let currentData_value = "";
	return data
}

// tag heatmap data
const fetchTagHeatmapDataSuccess = (state, action) => {
	let data = cloneDeep(state);
	let heatmapData = [];
	let heatmapAxisData = {}
	if( action.data && action.data.data && action.data.data.length > 0 ){
		heatmapData = SERVICE.manipulateForHeatMap( action.timePeriodOptedType, action.data.data);
	}
	return update(data, {
		heatMapData:{ $set: heatmapData }
	});
}
const fetchTagHeatmapDataFailed = (state, action) => {
	let data = cloneDeep(state);
	let currentData_value = "";
	return data
}

export default handleActions({
	//set time periond opted
	[actionTypes.SET_TIME_PERIOD_OPTED]: setTimePeriodOpted,
	//tag meta data
	[actionTypes.FETCH_TAG_META_DATA_SUCCESS]: fetchTagMetaDataSuccess,
	[actionTypes.FETCH_TAG_META_DATA_FAILED]: fetchTagMetaDataFailed,
	//tag current value
	[actionTypes.FETCH_TAG_CURRENT_VALUE_SUCCESS]: fetchTagCurrentValueSuccess,
	[actionTypes.FETCH_TAG_CURRENT_VALUE_FAILED]: fetchTagCurrentValueFailed,
	//tag current average
	[actionTypes.FETCH_TAG_CURRENT_AVERAGE_SUCCESS]: fetchTagCurrentAverageSuccess,
	[actionTypes.FETCH_TAG_CURRENT_AVERAGE_FAILED]: fetchTagCurrentAverageFailed,
	//tag histogram data
	[actionTypes.FETCH_TAG_HISTOGRAM_DATA_SUCCESS]: fetchTagHistogramDataSuccess,
	[actionTypes.FETCH_TAG_HISTOGRAM_DATA_FAILED]: fetchTagHistogramDataFailed,
	//tag heatmap data
	[actionTypes.FETCH_TAG_HEATMAP_DATA_SUCCESS]: fetchTagHeatmapDataSuccess,
	[actionTypes.FETCH_TAG_HEATMAP_DATA_FAILED]: fetchTagHeatmapDataFailed
}, initialState)