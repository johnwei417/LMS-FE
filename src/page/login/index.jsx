import React        from 'react';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'
import { Link }     from 'react-router-dom';
import Loader      from 'component/pre-loader/index.jsx'

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
        // button to loading state
        this.refs.loading.show()
        
        let loginInfo = {
         "account" : {
                "email" : this.state.email,
                "password" : this.state.password
            }
        }
    ,
        checkResult = _user.checkLoginInfo(loginInfo);
         
        // pass validation
        if(checkResult.status == true){
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
            <div className="navbar navbar-default top-navbar" style={{backgroundColor:"#00276C", borderRadius:"0px", padding:"0px"}}>
            <ul className="nav navbar-top-links navbar-left">
            <img src="https://firebasestorage.googleapis.com/v0/b/web-learning-system.appspot.com/o/logo.png?alt=media&token=85f38e7c-5478-41c9-bfc0-1b1804a588f2" style={{padding: "15px", display:"block", width:"66%", height:"66%"}}></img>
            </ul>
        
            <body className="login-body container-fluid" style={{backgroundColor: "#02D0FF"}}>
                

            <div className="col-md-4 col-md-offset-4" style={{marginLeft: "auto", marginRight:"auto"}}>
                <div className="panel center" style={{backgroundColor: "#02D0FF"}}>
                    <div className="panel-heading"><h1 className="text-center" style={{color:"white", fontSize:"65px", fontWeight:"bolder"}}>Welcome!</h1></div>
                    <div className="panel-body">
                
                        <div>
                            <div className="form-group">
                                <input type="text"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}
                                    style={{backgroundColor:"#4BDEFF", border:"none", color:"black"}}
                                    />
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                    name="password"
                                    className="form-control" 
                                    placeholder="Password" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}
                                    style={{backgroundColor:"#4BDEFF", border:"none", color:"black"}}
                                    />
                            </div>
                            <button className="btn btn-lg btn-block" data-loading-text="loading.." style={{backgroundColor: "#00276C", padding: "1px", borderRadius:"25px"}}
                                onClick={e => {this.onSubmit(e)}}>
                                    <div style={{display:"block", marginLeft:"auto", marginRight:"auto"}}><Loader  ref="loading" className="centered" display="none" size="xs" ></Loader></div>
                                    <span className="lead" style={{color:"white"}}>Login</span>
                            </button>
                            
                            <p className="text-muted" style={{fontSize: "12px"}}>Don't have an account? <a href="/register">Register here</a></p>

                        </div>
                    </div>
                </div>
            </div>
           
            </body>
            </div>
                    
        );
    }
}

export default Login;