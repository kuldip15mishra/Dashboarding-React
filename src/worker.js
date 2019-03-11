
export default () => {

  self.addEventListener("message", e => { // eslint-disable-line no-restricted-globals
  
 
    var result;
    let url = 'http://localhost:3000/api/tag/tagdata/' + e.data.api
 // let url = 'https://api.ddriven.xyz/api/tag/tagdata/' + e.data.api
 //let url = 'http://192.168.0.90:3000/api/tag/tagdata/' + e.data.api
    let retrievalOptions = {}
    retrievalOptions = {
      "skip": e.data.skip,
      "limit": e.data.limit,
      "timeperiod": [e.data.params],
      "pagenum" :e.data.pagenum,
      'userID': e.data.userID,
        'sessionID':  e.data.sessionID,
        'resource':  e.data.resource,
    }

  console.log(e.data)
    const options = {
      method: 'post',
      headers: {
        'Content-type':'application/json' ,// 'application/x-www-form-urlencoded; charset=UTF-8'
        'userID': e.data.userID,
        'sessionID':  e.data.sessionID,
        'resource':  e.data.resource,
      },
      body: JSON.stringify(retrievalOptions),
    }
    
     fetch(url, options)
    .then(response =>{
      if(response){
        return response.json()
      }
    })
    .then(function(myJson) {
  
      postMessage(myJson); // eslint-disable-line no-restricted-globals
      
    })
    .catch(err => {
      if(err){
        console.log(err);
      }
    })

     
  });
}

