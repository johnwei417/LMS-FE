import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';

import MUtil        from 'util/mm.jsx'

const _mm           = new MUtil();
const _class         = new Class();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss';
import PreLoader from 'component/pre-loader/index.jsx';


class TargetDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            userID:         _mm.getStorage('userInfo').id,
            api_token:      _mm.getStorage('userInfo').api_token,
            targetID:       this.props.match.params.targetID,
            pLevel:         this.props.match.params.pLevel,
            classID:        this.props.match.params.classID,
            role:           _mm.getStorage('userInfo').role,
            selected:       [],
            taskID:          0,
            taskList:       []

        };
    }
    componentDidMount(){
        this.checkLogin();
        this.loadTasks();
       
    }

    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
        window.location.href = '/login';
        }
    }


    getTitle(){
        if(this.state.pLevel = 'p'){
            this.state.title = 'Proficient';
        }
        if(this.state.pLevel = 'ap'){
            this.state.title = 'Almost Proficient';
        }
        if(this.state.pLevel = 'np'){
            this.state.title = 'Not Proficient';
        }
    }

    
    loadTasks(){
        let UserInfo = {};
        UserInfo.api_token = this.state.api_token;
        UserInfo.userID = this.state.userID;
       

        _class.getStudentsInTaskPage(UserInfo).then(res => {
            this.setState({list : res.tasks.students})
        }, errMsg =>{
            this.setState({ 
                list : []
            })
            _mm.errorTips(errMsg);
           
        });
    }

    render(){
                return (
                    <div id="page-wrapper" style={{marginTop:"0px"}}>
                        <h1 className="display-3" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"50px"}}>Tasks</h1>
                        <PreLoader display="none" ref="loader" size=""></PreLoader>
                        
                        <div className="row">
                            { 
                                this.state.list.map((student, index) => {
                                    return (
                                        <div className="card col-md-3" key={index} style={{padding:"0px", marginLeft:"20px", marginBottom:"20px"}}>
                                            <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                                            </div>
                                            <Link to={`/tasks/${student.user_id}`} className="text-muted" style={{textDecoration:"none"}}>
                                                <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                                                    <p className="text-white" style={{marginBottom:"0px", fontWeight:"bold", fontSize:"30px"}}>{student.user_details.name}</p> 
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

export default TargetDetail;
