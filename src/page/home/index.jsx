import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';

import MUtil        from 'util/mm.jsx'

const _mm           = new MUtil();
const _class         = new Class();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'


class Home extends React.Component{
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
        this.checkLogin();
        this.loadClassList();
    }


    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
        window.location.href = '/login';
        }
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
            _mm.setStorage('classrooms', res.classes);
            console.log(window.localStorage.getItem('classrooms'))
        }, errMsg =>{
            this.setState({ 
                list : []
            })
          
        });
    }

    render(){
        const checkRole = this.state.role;
    
        return (
            <div id="page-wrapper" style={{marginTop:"0px"}}>
                <h1 className="display-3" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"25px"}}>Your Classes</h1>
                <div className="row">
                    { 
                        this.state.list.map((classrooms, index) => {
                            return (
                                <div class="card col-md-3" key={index} style={{padding:"0px", marginLeft:"25px"}}>
                                    <div class="card-header" style={{backgroundColor:"#019DF4"}}>
                                        <span className="text-white" style={{fontWeight:"bold"}}>{classrooms.subject}</span>
                                    </div>
                                    <Link to={`/classroom/${classrooms.class_id}`} className="text-muted" style={{textDecoration:"none"}}>
                                        <div class="card-body" style={{backgroundColor:"#02D0FF"}}>
                                            <p class="display-1 text-white" style={{marginBottom:"0px", fontWeight:"bold"}}>{classrooms.users_count}</p>
                                            <p className="text-white">Students</p>
                                            <a href="#" class="btn btn-primary" style={{backgroundColor:"#019DF4", border:"none", borderRadius:"25px"}}>More Details</a>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

        );
    }
}

export default Home;