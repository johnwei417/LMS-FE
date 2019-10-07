import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class User{
 
    //user login
    login(loginInfo){
        return _mm.request({
            type: 'post',
            url: '/manage/account/login',
            data: loginInfo
        });
    }
    
    //check if login data is valid
    checkLoginInfo(loginInfo){
        let email = $.trim(loginInfo.email),
            password = $.trim(loginInfo.password);
        // validate username
        if(typeof email !== 'string' || email.length === 0){
            return {
                status: false,
                msg: 'Username cannot be empty'
            }
        }
        //validate password
        if(typeof password !== 'string' || password.length ===0){
            return {
                status: false,
                msg: 'password cannot be empty'
            }
        }
        return {
            status : true,
            msg : 'pass validation'
        }
    }
    // logout
    logout(){
        return _mm.request({
            type    : 'post',
            url     : 'manage/account/logout'
        });
    }
    getUserList(pageNum){
        return _mm.request({
            type    : 'post',
            url     : '/user/list',
            data    : {
                pageNum : pageNum
            }
        });
    }
}

export default User;