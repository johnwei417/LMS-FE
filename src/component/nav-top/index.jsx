import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

const _mm   = new MUtil();
const _user = new User();

class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: _mm.getStorage('userInfo').name || '',
            role:     _mm.getStorage('userInfo').role

        }
    }
    // logout
    onLogout(){
            window.location.href = '/';
            _mm.removeStorage('userInfo');
            _mm.removeStorage('classInfo');
            _mm.removeStorage('classrooms')
    }
    render(){
        return (
            <div className="navbar navbar-default top-navbar" style={{backgroundColor:"#00276C", borderRadius:"0px", padding:"0px"}}>
                <div className="navbar-header">
                    <Link className="navbar-brand" style={{backgroundColor:"#00276C", borderRadius:"0px", fontSize:"24px", width:"350px", marginLeft:"20px", paddingTop:"13px"}} to="/"><b className="text-capitalize" style={{color:"white"}}>{'Interventive Learning'}</b> </Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw" style={{color: "white"}}></i>
                            <span style={{color: "white"}}>
                            {
                                this.state.username
                                ? <span>Welcome, {this.state.username}</span>
                                : <span>Welcome</span>
                            }
                            </span>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavTop;