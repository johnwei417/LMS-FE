import React        from 'react';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

const _mm   = new MUtil();
const _user = new User();

import './index.scss';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            username: '',
            role: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = 'Register';
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
                "name": this.state.name,
                "username": this.state.username,
                "email" : this.state.email,
                "password" : this.state.password,
                "role" : this.state.role
            }
        }
    ,
            checkResult = _user.checkLoginInfo(loginInfo);
         
        // pass validation
        if(checkResult.status){
            _user.register(JSON.stringify(loginInfo)).then((res) => {
                window.location.href = '/login';
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
                                    name="name"
                                    className="form-control" 
                                    placeholder="Please type your name" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="text" 
                                    name="username"
                                    className="form-control" 
                                    placeholder="Please type your username" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            </div>

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

                            <div className="form-group">
                                <input type="radio" 
                                    name="role"
                                    value="1"
                                    className="form-control" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/> Teacher
                            </div>

                            <div className="form-group">
                                <input type="radio" 
                                    name="role"
                                    value="0"
                                    className="form-control" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/> Student
                            </div>

                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={e => {this.onSubmit(e)}}>Register Now!</button>
                            <p>Already have an account? <a href="/login">Login here</a></p>
                        </div>
                    </div>
                </div>
            </div>
           
            </body>
                    
        );
    }
}

export default Register;