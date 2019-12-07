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
        this.loadTaskList();
    }

    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
        window.location.href = '/login';
        }
    }

    handleChange(event) {
        this.setState({taskID: event.target.value});
    }

    loadTaskList(){
        let Info = {};
        Info.api_token = this.state.api_token;
        Info.targetID = this.state.targetID;
        _class.getTaskList(Info).then(res => {
            this.setState({
                taskList : res.tasks,
               
            });
        }, errMsg =>{
            _mm.errorTips(errMsg);
        });

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

    onInputChange(e){
        let inputValue  = e.target.value,
            inputName   = e.target.name;
        if(inputName == "selected"){
            this.setState({
                selected : this.state.selected.concat(inputValue)
            });
            console.log(inputValue);
        }else{ this.setState({
            [inputName] : inputValue
        });
    }
    }

    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }

    onSubmit(){
     let loginInfo = {
        api_token: this.state.api_token,
        userID: this.state.userID,
        taskID: this.state.taskID
        };
        console.log(this.state.selected);
       let data = {
            "task" : {
                   "class_id" : this.state.classID,
                   "students_id" : this.state.selected
               }
        }
    
        _class.assignTask(loginInfo, JSON.stringify(data)).then((res)=>{
             _mm.successTips(res.message);
        
        }, (errMsg) => {
            _mm.errorTips(errMsg.message);
        });

    }

    loadStudentListInTarget(){
        let UserInfo = {};
        UserInfo.api_token = this.state.api_token;
        UserInfo.userID = this.state.userID;
        UserInfo.classID = this.state.classID;
        UserInfo.pLevel = this.state.pLevel;
        UserInfo.targetID = this.state.targetID;

        _class.getStudentInTarget(UserInfo).then(res => {
            this.setState({list : res.student_scores});
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
                        <h1 className="display-1" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"50px"}}>Students</h1>
                        <p>Select Module</p>
                
                            <select value={this.state.taskID} 
                            onChange={this.handleChange}>
                                <option>Pick one </option>
                            {
                            tasklist
                            }
                            </select> 
                            <button className="btn btn-lg btn-primary btn-block"
                            onClick={e => {this.onSubmit(e)}}>Assign Module</button>
                        <PreLoader display="none" ref="loader" size=""></PreLoader>
                        
                        <div className="row">
                            { 
                                this.state.list.map((student, index) => {
                                    return (
                                        <div className="card col-md-3" key={index} style={{padding:"0px", marginLeft:"40px"}}>
                                            <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                                            </div>
                                           
                                                <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                                                    <p className="display-3 text-white" style={{marginBottom:"0px", fontWeight:"bold"}}>{student.users.name}</p> 
                                                    <div className="form-group">
                                                        <input type="checkbox" 
                                                            name="selected"
                                                            value={student.user_id}
                                                            className="form-control" 
                                                            placeholder="checkbox" 
                                                            onKeyUp={e => this.onInputKeyUp(e)}
                                                            onChange={e => this.onInputChange(e)}
                                                            style={{backgroundColor:"#4BDEFF", border:"none", color:"black"}}/>
                                                    </div>
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
