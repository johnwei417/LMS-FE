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
            userID:         this.props.match.params.userID,
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
        this.loadStudentListInTarget();
        this.checkLogin();
    }

    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
        window.location.href = '/login';
        }
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


   

    loadStudentListInTarget(){
        let UserInfo = {};
        UserInfo.api_token = this.state.api_token;
        UserInfo.userID = this.state.userID;
      
        _class.getStudentsInTaskPage(UserInfo).then(res => {
            this.setState({list : res.tasks.details});
        }, errMsg =>{
            this.setState({ 
                list : []
            })
            _mm.errorTips(errMsg);
           
        });
    }

    render(){
        const tasklist = this.state.taskList.map((task, index)=>{
        
            return (
              <option key={index} name="taskID" value = {task.id}>{task.name}</option>
              
            )});
       
                return (
                    <div id="page-wrapper" style={{marginTop:"0px"}}>
                        <h1 className="display-1" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"50px"}}>Assigned Tasks</h1>
                      
                        <PreLoader display="none" ref="loader" size=""></PreLoader>
                        
                        <div className="row">
                            { 
                                this.state.list.map((modules, index) => {
                                    return (
                                        <div className="card col-md-3" key={index} style={{padding:"0px", marginLeft:"40px"}}>
                                            <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                                            </div>
                                           
                                                <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                                                    <p className="display-3 text-white" style={{marginBottom:"0px", fontWeight:"bold"}}>{modules.name}</p> 
                                                </div>
                                           
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
