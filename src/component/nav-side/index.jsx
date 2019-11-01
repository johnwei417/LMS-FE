import React                from 'react';
import { Link, NavLink }    from 'react-router-dom';

class NavSide extends React.Component{
    constructor(props){
        super(props);
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
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/class/1" activeClassName="active-menu">Math</NavLink>
                                </li>
                            </ul>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/class/2" activeClassName="active-menu">Reading</NavLink>
                                </li>
                            </ul>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/class/3" activeClassName="active-menu">Science</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="active">
                            <Link to="/user">
                                <i className="fa fa-user-o"></i>
                                <span>User</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/user" activeClassName="active-menu">User Management</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="active">
                            <Link to="/media/video">
                                <i className="fa fa-user-o"></i>
                                <span>Media</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/media/video" activeClassName="active-menu">Video</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>

            </div>
        );
    }
}

export default NavSide;