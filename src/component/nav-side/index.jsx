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

        // if classrooms exist, do not call ajax again
        if (window.localStorage.getItem('classrooms')) { 
            this.setState({list : JSON.parse(window.localStorage.getItem('classrooms')).classrooms})
            return
        }
       
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
                    <ul className="nav list-group list-group-flush">
                        <li className="list-group-item list-group-item-action" style={{backgroundColor:"#043874"}}>
                            <NavLink exact to="/">
                                <i style={{color:"white", fontWeight:"600"}} className="fa fa-home"></i>
                                <span style={{color:"white", fontWeight:"600"}}>Home</span>
                            </NavLink>
                        </li>
                        <li className="list-group-item list-group-item-action" style={{backgroundColor:"#043874"}}>
                            <Link to="/class">
                                <i style={{color:"white", fontWeight:"600"}} className="fa fa-check-square-o"></i>
                                <span style={{color:"white", fontWeight:"600"}}>Classes</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav list-group list-group-flush" style={{marginTop:"15px"}}>
                            {
                                this.state.list.map((classrooms, index) => {
                                    console.log(classrooms)
                                    return (
                                        <NavLink to={`/classroom/${classrooms.class_id}`} activeClassName="active-menu" key={index}>
                                            <li className="list-group-item list-group-item-action" key={index} style={{backgroundColor:"#14497F"}}>
                                                <span style={{color:"white", fontWeight:"600"}}>{classrooms.subject + ' - ' + classrooms.room}</span>
                                            </li>
                                        </NavLink>

                                        );
                                    })
                            }
                            </ul>
                        </li>
                    

                       
                    </ul>

                </div>

            </div>
        );
    }
}

export default NavSide;