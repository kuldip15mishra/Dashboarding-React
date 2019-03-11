import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { apiURL } from "../../constants/Constants";
class TimeSelection extends Component {

	renderRedirect = () => {
		
		window.location =apiURL.navigateURL+'?tagName=' + `${this.props.tagName}`
		
	  }

	_renderButtons = () => {
		return this.props.timePeriodOpted.timePeriodList.map((item,k) => {
			let activeClass = "time-filter-btn";
			if( item.value == this.props.timePeriodOpted.type ){
				activeClass += " active"
			}
			return <li key={k}>
				<button 
					className={activeClass} 
					onClick={() => this.props.setTimePeriodOpted(item.value)}
				>
						{item.text}
				</button>
      </li>
		})
	}

	render() {
		return(
		
        <div className="time-btns">
          <ul>
          	{this._renderButtons()}
          </ul>
        </div>
		)
	}
}
//href="http://101.53.136.158:4800/?tagName=${dataItem.tagName}"  target="_blank"
export default TimeSelection