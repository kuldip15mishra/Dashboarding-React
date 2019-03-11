export const apiURL = {
   // BASE_URL: "http://192.168.0.90:3000/api",
    //BASE_URL: "https://api.ddriven.xyz/api",
    BASE_URL: "http://localhost:3000/api",
    SERVERBASE_URL: "https://api.signal.ddriven.in:1111",
    //NEW_SERVERBASE_URL: "http://101.53.138.47:8091/SignalAPI/signaldata",
    //NEW_SERVERBASE_URL: "http://101.53.138.47:8091/SignalAPI/signaldata",
    NEW_SERVERBASE_URL: "https://api.signal.ddriven.in:1111/trender/signaldata",
    AUTHENTICATE:"https://api.entitlement.ddriven.in:3773/entitlement/api/security-manager/authenticate",
    AUTHORIZE:"https://api.entitlement.ddriven.in:3773/entitlement/api/security-manager/authorize",
    LOGOUT:"https://api.entitlement.ddriven.in:3773/entitlement/api/security-manager/logout",
    API_CONNECTION_STRING: "/connstring/conndata",
    API_TAGBROWSER: "tag/tagmeta",
    API_TAGBROWSERELASTIC: "tag/metav1",
    API_DATAEXPLORER: "/tag/getdata",
    API_HISTORICDATA: "tags/history/",
    API_TRENDMETA: "trend/trendmeta",
    API_CURRENTVALUE: "/tag/tagvalue/",
    API_DATA: "tags/",
    API_TAGVALUE: "tags/point/",
    API_EXPORT: "tag/excelexport",
    SHARE_URL: "/?trendid=",
    LICENCE: "https://api.lms.ddriven.in:2125/license/statusCheck",
    //Signals:"/SignalAPI/signals",
    Signals: "/trender/signals",
    ElasticSearch: "http://101.53.139.108:9200",
    searchURL: "/signalmetasearch/signals/_search",
    navigateURL:"https://solutionviewer.ddriven.xyz"
  };
  export const Permissions = {
    ALLOWED:"1 1 1 1",
    NOTALLOWED:"0 0 0 0"
  };

  export const AppId={
    id:"USV"
  }

  export const LicenceTime={
    time:5000
  }
    