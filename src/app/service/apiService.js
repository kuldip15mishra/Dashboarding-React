
/*/#region Copyright(c) 2018 D-Driven All rights are reserved
* =============================================================================================================================================
* <copyright company="D-Driven">
* COPYRIGHT (c) 2018 D-Driven (P) Ltd.
* ALL RIGHTS ARE RESERVED. REPRODUCTION OR TRANSMISSION IN WHOLE OR IN PART,
* ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL OR OTHERWISE,
* WITHOUT THE PRIOR PERMISSION OF THE COPYRIGHT OWNER.
* </copyright>
* =============================================================================================================================================
* Created By :
* Module :  API global configuration
* Description : */
/* This API wrapper is useful because it:
   1. Centralizes our Axios default configuration.
   2. Abstracts away the logic for determining the baseURL.
   3. Provides a clear, easily consumable list of JavaScript functions
      for interacting with the API. This keeps API calls short and consistent.

* Date:31-JULY-2018.
* =============================================================================================================================================
 *
 * #endregion
 * */


//library import section Begin
import axios from 'axios';
import { apiURL, httpStatusCodes } from "../constants/Constants"
//library import section End

class HttpClient {
    constructor() {
        this.api = null;
        this.apielastic = null;
        this.headers= {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
    }

  //it is a method which initalize http instance
    getInitializedApi() {
        if (this.api) return this.api; // return initialized api if already initialized.
        return (this.api = axios.create({
            baseURL: this.getBaseUrl(),
            responseType: 'json',

            // withCredentials: true
        }));
    }

    getInitializedApiElastic() {
        //if (this.api) return this.api; // return initialized api if already initialized.
        return (this.apielastic = axios.create({
            baseURL: this.getBaseUrlElasstic(),
            responseType: 'json',

            // withCredentials: true
        }));
    }

     //it is a method which return base url
    getBaseUrl() {
        // Insert logic here to get the baseURL by either:
        // 1. Sniffing the URL to determine the environment we're running in.
        // 2. Looking for an environment variable as part of the build process.
        return apiURL.BASE_URL
    }

    getBaseUrlElasstic() {
        // Insert logic here to get the baseURL by either:
        // 1. Sniffing the URL to determine the environment we're running in.
        // 2. Looking for an environment variable as part of the build process.
        return apiURL.BASE_URL
    }

 //it is a method which use at the time of get
    get(url,header=null) {
        return this.getInitializedApi().get(url, {headers: header === null ? this.headers :header});
    }

    //it is a method which use at the time of Post
    post(url, data, header=null) {
        return this.getInitializedApi().post(url, data, {headers: header === null ? this.headers :header });
    }
    

     //it is a method which use at the time of Post
     postElastic(url, data) {
        return this.getInitializedApiElastic().post(url, data);
    }

    getallList(requestList) {
        return axios.all(requestList.map(l => axios.get(l)));
    }

    postallList(requestList) {
        return axios.all(requestList.map(l => axios.request(l)));
    }
}
// export function saveAuthToken(token) {
//     localStorage.setItem("authToken", token);
//     setAuthorizationToken(token);
//   }
  
//   export function getAuthToken() {
//     return localStorage.getItem("authToken");
//   }
  
//   export function clearAuthToken() {
//     localStorage.removeItem("authToken");
//     setAuthorizationToken(false);
//   }
export default HttpClient
