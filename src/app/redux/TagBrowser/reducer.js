import { handleActions } from 'redux-actions'
import update from 'immutability-helper';
import { cloneDeep } from 'lodash';
import * as actionTypes from '../constants';
import _ from "lodash";

const initialState = {
	timePeriodOpted: {
		type: '1H', // 1H, 8H, 24H, 7D, 30D
		periodFrom: '', // will be the timestamp according to the type choosen ( create a service to get this )
		periodTo: '' // will be the timestamp according to the type choosen ( create a service to get this )
	},
	tagsList: [],
	totalCount: 0,
	isloading: true,
	isunauthorised :false
}

//--tags list
const fetchTagsListSuccess = (state, action) => {
	let data = cloneDeep(state);
	let isunauthorised=false;
	//let newTagList = data.tagsList.concat( action.data.data );
	let newList = data.tagsList;
	let newTagListWithPage = { pageNum: (action.pageNum), data: action.data.payload.data };
	newList.push(newTagListWithPage);
	let totalCount = action.totalCount > 0 ? action.totalCount : data.totalCount;
	// newTagList = _.map( newTagList, (k, i) => {
	// 	k.index = i;
	// 	return k;

	if(action.data.payload.message === "not authorized"){
		isunauthorised=true;
	}
	// })
	return update(data, {
		tagsList: { $set: newList },
		totalCount: { $set: totalCount },
		isloading: { $set: false },
		isunauthorised:{ $set: isunauthorised }
	});
}

const fetchTagsListFailed = (state, action) => {
	let data = cloneDeep(state);
	data.isloading = false;
	return update(data, {
	
		isloading: { $set: false },
		isunauthorised:{ $set: true }
	});
	//return data
}

//--tags list item value current value
const fetchTagsListItemCurrentValueSuccess = (state, action) => {
	let data = cloneDeep(state);

	let tagsList = data.tagsList;

	let index = tagsList.findIndex(x => { return x.pageNum === action.page });

	if (tagsList && tagsList.length > 0 && tagsList[index] && tagsList[index].data && tagsList[index].data.length > 0) {

		if (action.data && action.data.length > 0 && action.data[0].current && action.data[0].current.length > 0) {

			for (var i = 0; i < tagsList[index].data.length; i++) {

				if (action.data[i] && action.data[i].current && action.data[i].current.length != 0) {

				tagsList[index].data[i]["current"] = action.data[i].current[0].value
				}

			}

		}

	}



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

	let index = tagsList.findIndex(x => { return x.pageNum === action.page });

	if (tagsList && tagsList.length > 0 && tagsList[index] && tagsList[index].data && tagsList[index].data.length > 0) {

		if (action.data && action.data.length > 0 && action.data[0].oneHourSparkline) {

			for (var i = 0; i < tagsList[index].data.length; i++) {

				if(action.data[i]!=null)
				{
				tagsList[index].data[i]["oneHourSparkline"] = action.data && action.data.length > 0 && action.data[i].oneHourSparkline !== undefined ? action.data[i].oneHourSparkline : 0;

				}

			}
		}
	}

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

	let index = tagsList.findIndex(x => { return x.pageNum === action.page });

	if (tagsList && tagsList.length > 0 && tagsList[index] && tagsList[index].data && tagsList[index].data.length > 0) {

		if (action.data && action.data.length > 0 && action.data[0].oneHourAverage) {

			for (var i = 0; i < tagsList[index].data.length; i++) {
				
				if (action.data[i] && action.data[i].oneHourAverage[0] !== null) {
					tagsList[index].data[i]["oneHourAverage"] = action.data[i].oneHourAverage[0].value;
				}
			}
		}

	}





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

	let index = tagsList.findIndex(x => { return x.pageNum === action.page });

	if (tagsList && tagsList.length > 0 && tagsList[index] && tagsList[index].data && tagsList[index].data.length > 0) {

		if (action.data && action.data.length > 0 && action.data[0].oneDayAverage) {

			for (var i = 0; i < tagsList[index].data.length; i++) {

				if (action.data[i] && action.data[i].oneDayAverage[0] !== null) {

				tagsList[index].data[i]["oneDayAverage"] = action.data[i].oneDayAverage[0].value;
				}

			}

		}
	}

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