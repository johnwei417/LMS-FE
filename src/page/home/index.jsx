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
        console.log('continued')
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
            <div id="page-wrapper">
                <PageTitle title="Home" />
           { 
                this.state.list.map((classrooms, index) => {
                    
                    return (

                            <div className="col-md-4" key={index}>
                                <Link to={`/classroom/${classrooms.class_id}`} className="color-box blue">
                                
                                    <p className="grade">
                                        <i className="fa fa-list"></i>
                                        <span> <em>{classrooms.subject}</em> - {classrooms.grade} Grade</span>
                                    
                                    </p>
                                    <p className="desc">
                                        <i className="fa fa-building"></i>
                                        <span>{classrooms.room} - Room: {classrooms.school}</span>
                                    
                                    </p>

                                    <p className="desc">
                                        <i className="fa fa-calendar"></i>
                                        <span>{classrooms.starts_at} - {classrooms.ends_at}</span>
                                    
                                    </p>
                                
                                </Link>
                            </div>
                  
                          
                    );
                 
                })
            }
            </div>

        );
    }
}

export default Home;