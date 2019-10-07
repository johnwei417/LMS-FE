import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class Class{
    // get class list
    getStudentList(listParam){
        let url     = '',
            data    = {};
        if(listParam.listType === 'list'){
            url                         = '/manage/product/list.do';
            data.pageNum                = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/product/search.do';
            data.pageNum                = listParam.pageNum;
            data[listParam.searchType]  = listParam.keyword;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }
    // get product details
    getClassDetails (classId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/class/detail.do',
            data    : {
                classId : classId || 0
            }
        });
    }
    
    /*
    *  category
    */

    getCategoryList(parentCategoryId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/category/get_category.do',
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }
    
}

export default Class;