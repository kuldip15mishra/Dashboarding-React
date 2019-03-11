import {handleActions} from 'redux-actions'
import update from 'immutability-helper';
import { cloneDeep } from 'lodash';
import * as actionTypes from '../constants';
import _ from "lodash";

const initialState = {
	timePeriodOpted : {
		type: '1H', // 1H, 8H, 24H, 7D, 30D
		periodFrom: '', // will be the timestamp according to the type choosen ( create a service to get this )
		periodTo: '' // will be the timestamp according to the type choosen ( create a service to get this )
	},
	tagsList : []
}

//--tags list
const fetchTagsListSuccess = (state, action) => {
	let data = cloneDeep(state);
	let newTagList = data.tagsList.concat( action.data.data );
	newTagList = _.map( newTagList, (k, i) => {
		k.index = i;
		return k;
	})
	return update(data, {
		tagsList: { $set: newTagList }
	});
}

const fetchTagsListFailed = (state, action) => {
	let data = cloneDeep(state);
	return data
}

//--tags list item value current value
const fetchTagsListItemCurrentValueSuccess = (state, action) => {
	let data = cloneDeep(state);
	let tagsList = data.tagsList;
	tagsList = _.map( tagsList, (tag,k) => {
		if( tag.tagName == action.data.tagName ){
			tag.current = action.data.data[0]
		}
		return tag;
	})
	return update(data, {
		tagsList: { $set: tagsList }
	});
}

const fetchTagsListItemCurrentValueFailed = (state, action) => {
	let data = cloneDeep(state);
	return data
}

//--tags list item one hour spark line data
const fetchTagsListItemOneHourSparkLineSuccess = (state, action) => {
	let data = cloneDeep(state);
	let tagsList = data.tagsList;
	tagsList = _.map( tagsList, (tag,k) => {
		if( tag.tagName == action.data.tagName ){
			tag.oneHourSparkline = action.data.data
		}
		return tag;
	})
	return update(data, {
		tagsList: { $set: tagsList }
	});
}

const fetchTagsListItemOneHourSparkLineFailed = (state, action) => {
	let data = cloneDeep(state);
	return data
}

//--tags list item one hour average
const fetchTagsListItemOneHourAverageSuccess = (state, action) => {
	let data = cloneDeep(state);
	let tagsList = data.tagsList;
	tagsList = _.map( tagsList, (tag,k) => {
		if( tag.tagName == action.tagName ){
			tag.oneHourAverage = action.data.data[0]
		}
		return tag;
	})
	return update(data, {
		tagsList: { $set: tagsList }
	});
}

const fetchTagsListItemOneHourAverageFailed = (state, action) => {
	let data = cloneDeep(state);
	return data
}

//--tags list item one day average
const fetchTagsListItemOneDayAverageSuccess = (state, action) => {
	let data = cloneDeep(state);
	let tagsList = data.tagsList;
	tagsList = _.map( tagsList, (tag,k) => {
		if( tag.tagName == action.tagName ){
			tag.oneDayAverage = action.data.data[0]
		}
		return tag;
	})
	return update(data, {
		tagsList: { $set: tagsList }
	});
}

const fetchTagsListItemOneDayAverageFailed = (state, action) => {
	let data = cloneDeep(state);
	return data
}

export default handleActions({
	//tags list
	[actionTypes.FETCH_TAGS_LIST_SUCCESS]: fetchTagsListSuccess,
	[actionTypes.FETCH_TAGS_LIST_FAILED]: fetchTagsListFailed,
	//tags list item current value
	[actionTypes.FETCH_TAGS_LIST_ITEM_CURRENT_VALUE_SUCCESS]: fetchTagsListItemCurrentValueSuccess,
	[actionTypes.FETCH_TAGS_LIST_ITEM_CURRENT_VALUE_FAILED]: fetchTagsListItemCurrentValueFailed,
	//tags list item one hour tag line data
	[actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_SPARKLINE_SUCCESS]: fetchTagsListItemOneHourSparkLineSuccess,
	[actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_SPARKLINE_FAILED]: fetchTagsListItemOneHourSparkLineFailed,
	//tags list item one hour average
	[actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_AVERAGE_SUCCESS]: fetchTagsListItemOneHourAverageSuccess,
	[actionTypes.FETCH_TAGS_LIST_ITEM_ONEHOUR_AVERAGE_FAILED]: fetchTagsListItemOneHourAverageFailed,
	//tags list item one day average
	[actionTypes.FETCH_TAGS_LIST_ITEM_ONEDAY_AVERAGE_SUCCESS]: fetchTagsListItemOneDayAverageSuccess,
	[actionTypes.FETCH_TAGS_LIST_ITEM_ONEDAY_AVERAGE_FAILED]: fetchTagsListItemOneDayAverageFailed,
}, initialState)