import React        from 'react';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

const _mm   = new MUtil();
const _user = new User();

import './index.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = 'Login';
    }
    // when username changed
    onInputChange(e){
        let inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    //user submit form
    onSubmit(){ 
        let loginInfo = {
         "account" : {
                "email" : this.state.email,
                "password" : this.state.password
            }
        }
    ,
            checkResult = _user.checkLoginInfo(loginInfo);
         
        // pass validation
        if(checkResult.status){
            _user.login(JSON.stringify(loginInfo)).then((res) => {
                _mm.setStorage('userInfo', res.account);
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        // valid failed
        else{
            _mm.errorTips(checkResult.msg);
        }
            
    }
    render(){
        return (
            <body className="login-body">
            
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">Welcome to Learning System</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                    name="email"
                                    className="form-control"
                                    placeholder="Please type email" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                    name="password"
                                    className="form-control" 
                                    placeholder="Please type password" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={e => {this.onSubmit(e)}}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
           
            </body>
                    
        );
    }
}

export default Login;