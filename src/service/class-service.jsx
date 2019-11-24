import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class Class{
    // get class list
    getStudentList(listParam){
        
    }

    getClassList(param){
        return _mm.request({
            api_token:   param.api_token,
            type    : 'get',
            url     : 'https://laravel-lsm.herokuapp.com/api/v1/'+ param.userID + '/classroom',

        });
    }

    getClassDetails(param){
        return _mm.request({
            api_token: param.api_token,
            type    : 'get',
            url     : 'https://laravel-lsm.herokuapp.com/api/v1/' + param.userID + '/classroom/' + param.classID,

        })
    }

    getPList(param){
        return _mm.request({
            api_token: param.api_token,
            type    : 'get',
            url     : 'https://laravel-lsm.herokuapp.com/api/v1/' + param.userID + '/classroom/' + param.classID +'/'+param.pLevel,

        })
    }
   
    
}

export default Class;