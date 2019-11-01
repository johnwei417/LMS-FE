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
                            <NavLink exact activeClassName="active-menu" to="/s">
                                <i className="fa fa-dashboard"></i>
                                <span>Main</span>
                            </NavLink>
                        </li>
                        <li className="active">
                            <Link to="/s/classlist">
                                <i className="fa fa-check-square-o"></i>
                                <span>Classes</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/s/classlist/1" activeClassName="active-menu">Math</NavLink>
                                </li>
                            </ul>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/s/classlist/2" activeClassName="active-menu">Reading</NavLink>
                                </li>
                            </ul>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/s/classlist/3" activeClassName="active-menu">Science</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="active">
                            <Link to="/s">
                                <i className="fa fa-user-o"></i>
                                <span>Assignments</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/s/media/video" activeClassName="active-menu">Media</NavLink>
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