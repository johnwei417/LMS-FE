import React                from 'react';
import { Link, NavLink }    from 'react-router-dom';

import Class         from 'service/class-service.jsx';

import MUtil        from 'util/mm.jsx'

const _mm           = new MUtil();
const _class         = new Class();

class NavSide extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            userID:         _mm.getStorage('userInfo').id,
            api_token:      _mm.getStorage('userInfo').api_token,
            role:           _mm.getStorage('userInfo').role

        };
    }

    componentDidMount(){
        this.loadClassList();
    }

    loadClassList(){
        let UserInfo = {};
        UserInfo.api_token = this.state.api_token;
        UserInfo.userID = this.state.userID;
       
        _class.getClassList(UserInfo).then(res => {
            this.setState({list : res.classes.classrooms});
        }, errMsg =>{
            this.setState({ 
                list : []
            })
            _mm.errorTips(errMsg);
        });
    }

    render(){
        return (
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-dashboard"></i>
                                <span>Main</span>
                            </NavLink>
                        </li>
                        <li className="active">
                            <Link to="/class">
                                <i className="fa fa-check-square-o"></i>
                                <span>Classes</span>
                                <span className="fa arrow"></span>
                            </Link>
                            {
                                this.state.list.map((classrooms, index) => {
                                    return (
                                      
                                        <ul className="nav nav-second-level collapse in">
                                        <li>
                                          <NavLink to={`/classroom/${classrooms.class_id}`} activeClassName="active-menu">{classrooms.subject}</NavLink>
                                        </li>
                                    </ul>

                                        );
                                    })
                            }
                          
                        </li>
                    

                       
                    </ul>

                </div>

            </div>
        );
    }
}

export default NavSide;