import HttpClient from "../../service/apiService";
// import CommonUtils from '../commonutils/CommonUtils'
import { apiURL, AppId } from "../../constants/Constants"
// import { renderComponent } from "recompose";
import AesUtil from './AesUtil'



export const getLogin = (username, password) => {
     var aesUtil = new AesUtil(128, 1000);

    var loginRequestModel = {
         "email": aesUtil.encrypt('ddriven@1234', username),
         "password": aesUtil.encrypt('ddriven@1234', password)
        // "email": username,
        // "password":password
        
    }
    var headers= {
        'app-id':AppId.id,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    // localStorage.setItem("token", "Smith");
   
    


    const httpClient = new HttpClient();
    let url = apiURL.AUTHENTICATE;
    return httpClient.post(url, loginRequestModel, headers)
        .then(response => {
           
            console.log(response.data)
            // if (!CommonUtils.isEmpty(response.data)) {
                if (response.data.data) {                  
                    if(response.data.data.userId){
                        localStorage.setItem("user", response.data.data.userId);
                        localStorage.setItem("username", response.data.data.name); 
                        localStorage.setItem("session",response.data.data.sessionId );
                       
                        localStorage.setItem("res", AppId.id); 
                       
                        var headers= {
                            'user-id': response.data.data.userId,
                            'session-id':response.data.data.sessionId,
                            'app-id':AppId.id
                        }

                      
                           return httpClient.get(apiURL.AUTHORIZE,headers)
                           
                    
                    }
                    else{

                        return {
                            "description": response.data.status.description,
                            "error":true
                        }
                   
                    }
               
                }

                else{
                    
                   return{
                       "description": response.data.status.description,
                       "error": true
                   }
                }

        })
        .catch(error => {
            console.log(error);
        });
}


