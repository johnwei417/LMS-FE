
class MUtil{
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer '+ param.api_token);
                } || null,
                type        : param.type        || 'get',
                url         : param.url         || '',
                dataType    : param.dataType    || 'json',
                data        : param.data        || null,
                success     : res => {
                    //data request success          
                        resolve(res);
                },
                error       : err => {
                    typeof reject === 'function' && reject(err.responseJSON.error.message);
                }
            });
        });  
    }
    //jump to login
    doLogin(){
        window.location.href = '/login';
    }
    //get URL parameter
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    //success tips
    successTips(successMsg){
        alert(successMsg || 'Success!');
    }
    // error tips
    errorTips(errorMsg){
        alert(errorMsg || 'Failed!');
    }

    // localstorage
    setStorage(name, data){
        let dataType = typeof data;
        console.log(dataType);
        // json object
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        //basic types
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data);
        }
        //other not supported types
        else{
            alert('This type cannot be used as local storage');
        }
    }

    //get local storage context
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }
    //delete local storage
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil;