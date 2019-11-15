import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class Class{
    // get class list
    getStudentList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url                         = '/manage/student/';
            data.pageNum                = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/student/list';
            data.pageNum                = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }

    getClassList(param){
        return _mm.request({
            api_token:   param.api_token,
            type    : 'get',
            url     : 'https://laravel-lsm.herokuapp.com/api/v1/'+ param.userID + '/classroom',

        });
    }
    // get class details
    getClassDetails (classId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/class/detail.do',
            data    : {
                classId : classId || 0
            }
        });
    }
    
    
}

export default Class;