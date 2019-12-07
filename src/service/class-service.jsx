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


    assignTask(param, param1){
        return _mm.request({
            api_token: param.api_token,
            type    : 'post',
            url     : 'https://laravel-lsm.herokuapp.com/api/v1/' + param.userID + '/assign/'+ param.taskID,
            data    :  param1
        })
    }
    
    getTaskList(param){
        return _mm.request({
            api_token: param.api_token,
            type: 'get',
            url: 'https://laravel-lsm.herokuapp.com/api/v1/tasks/'+param.targetID,
        });
    }

    getStudentsInTaskPage(param){
        return _mm.request({
            api_token: param.api_token,
            type    : 'get',
            url     : 'https://laravel-lsm.herokuapp.com/api/v1/' + param.userID + '/tasks',

        })
    }
   
    getStudentInTarget(param){
        return _mm.request({
            api_token: param.api_token,
            type    : 'get',
            url     : 'https://laravel-lsm.herokuapp.com/api/v1/' + param.userID + '/classroom/' + param.classID +'/'+param.pLevel +'/'+param.targetID,

        })
    }
}

export default Class;