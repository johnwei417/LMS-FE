import MUtil        from 'util/mm.jsx'
import axios from 'axios'

const _mm   = new MUtil();

class User{
 
    //user login
    login(loginInfo){
        return _mm.request({
            type: 'post',
            url: 'https://laravel-lsm.herokuapp.com/api/v1/account/login',
            data: loginInfo
        });
    }
    
    //check if login data is valid
    checkLoginInfo(loginInfo){
        let email = $.trim(loginInfo.account.email),
            password = $.trim(loginInfo.account.password);
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