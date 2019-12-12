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
            <body className="login-body container-fluid" style={{backgroundColor: "#02D0FF"}}>
            <div className="col-md-4 col-md-offset-4" style={{marginLeft: "auto", marginRight:"auto", paddingTop:"100px"}}>
                <div className="panel center" style={{backgroundColor: "#02D0FF"}}>
                    <div className="panel-heading"><h1 className="text-center" style={{color:"white", fontSize:"65px", fontWeight:"bolder"}}>Sign Up!</h1></div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                    <input type="text" 
                                        name="name"
                                        className="form-control" 
                                        placeholder="Name" 
                                        onKeyUp={e => this.onInputKeyUp(e)}
                                        onChange={e => this.onInputChange(e)}
                                        style={{backgroundColor:"#4BDEFF", border:"none", color:"black"}}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" 
                                        name="username"
                                        className="form-control" 
                                        placeholder="Username" 
                                        onKeyUp={e => this.onInputKeyUp(e)}
                                        onChange={e => this.onInputChange(e)}
                                        style={{backgroundColor:"#4BDEFF", border:"none", color:"black"}}/>
                                </div>

                                <div className="form-group">
                                    <input type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email address" 
                                        onKeyUp={e => this.onInputKeyUp(e)}
                                        onChange={e => this.onInputChange(e)}
                                        style={{backgroundColor:"#4BDEFF", border:"none", color:"black"}}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" 
                                        name="password"
                                        className="form-control" 
                                        placeholder="Password" 
                                        onKeyUp={e => this.onInputKeyUp(e)}
                                        onChange={e => this.onInputChange(e)}
                                        style={{backgroundColor:"#4BDEFF", border:"none", color:"black"}}/>
                                </div>

                                <div className="form-group" style={{marginLeft:"180px"}}>
                                    <div>

                                        <input type="radio" 
                                            name="role"
                                            value="1"
                                            onKeyUp={e => this.onInputKeyUp(e)}
                                            onChange={e => this.onInputChange(e)}
                                            style={{maxWidth: "50px", float:"left", marginRight:"10px", marginTop:"3px"}}
                                        />                                        
                                        <p style={{color:"white"}}>Teacher</p>

                                        <input type="radio" 
                                        name="role"
                                        value="0"
                                        onKeyUp={e => this.onInputKeyUp(e)}
                                        onChange={e => this.onInputChange(e)}
                                        style={{maxWidth: "50px", float:"left", marginRight:"10px", marginTop:"3px"}}/>
                                        <p style={{color:"white"}}>Student</p>

                                    </div>
                                </div>

                                <button className="btn btn-lg btn-primary btn-block" style={{backgroundColor: "#00276C", padding: "1px", borderRadius:"25px"}}
                                    onClick={e => {this.onSubmit(e)}}><span className="lead" style={{color:"white"}}>Register Now!</span></button>
                                <p className="text-muted" style={{fontSize: "12px"}}>Already have an account? <a href="/login">Login here</a></p>
                            </div>
                        </div>
                </div>
            </div>
           
            </body>
                    
        );
    }
}

export default Register;