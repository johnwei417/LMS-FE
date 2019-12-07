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
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        this.checkLogin();
        this.loadStudentListInTarget();
    }

    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
            window.location.href = '/login';
        }
    }

    handleChange(event) {
        this.setState({taskID: event.target.value});
        if ( event.target.value > 0) {
            this.refs.assignBtn.disabled = false;
        } else {
            this.refs.assignBtn.disabled = true;
        }
    }

    loadTaskList(){
        let Info = {};
        Info.api_token = this.state.api_token;
        Info.targetID = this.state.targetID;
        _class.getTaskList(Info).then(res => {
            this.setState({
                taskList : res.tasks
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
        this.refs.loader.black();
        let UserInfo = {};
        UserInfo.api_token = this.state.api_token;
        UserInfo.userID = this.state.userID;
        UserInfo.classID = this.state.classID;
        UserInfo.pLevel = this.state.pLevel;
        UserInfo.targetID = this.state.targetID;

        _class.getStudentInTarget(UserInfo).then(res => {
            this.loadTaskList();
            this.setState({list : res.student_scores});
            this.refs.loader.hide();
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
                        <h1 className="display-3" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"50px"}}>Students</h1>
                        <p>
                            <select value={this.state.taskID} onChange={this.handleChange}><option>Select Module Here</option>
                                {
                                tasklist
                                }
                            </select> 
                            <button className="btn btn-primary" onClick={e => {this.onSubmit(e)}} style={{marginLeft:"20px", padding:"0px", paddingLeft:"35px", paddingRight:"35px"}} disabled ref="assignBtn">Assign Module</button>
                        </p>

                        <div className="row">
                            <PreLoader display="none" ref="loader" size=""></PreLoader>
                            { 
                                this.state.list.map((student, index) => {
                                    return (
                                        <div className="card col-md-3" key={index} style={{padding:"0px", marginLeft:"10px", marginBottom:"10px"}}>
                                                <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                                                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>
                                                        {student.users.name}
                                                        <input type="checkbox" 
                                                            name="selected"
                                                            value={student.user_id}
                                                            placeholder="checkbox" 
                                                            onKeyUp={e => this.onInputKeyUp(e)}
                                                            onChange={e => this.onInputChange(e)}
                                                            style={{backgroundColor:"#4BDEFF", border:"none", color:"black", marginLeft:"15px"}}/>
                                                    </span>
                                                </div>
                                                <div className="card-body" style={{backgroundColor:"#02D0FF", padding: "0"}}>
                                                    <div className="content-left col-md-6 display-inline" style={student.standardized_score ? (student.standardized_score > 75 ? {backgroundColor:"#02B385"} : (student.standardized_score > 40 ? {backgroundColor:"#EF9B0F"} : {backgroundColor:"#BC0000"} )) : {}} >
                                                        <p className="text-center text-white text-25" >{student.standardized_score ? student.standardized_score : '-'}</p>
                                                    </div>
                                                    <div className="col-md-6 display-inline" style={student.score ? (student.score > 75 ? {backgroundColor:"#02B385"} : (student.score > 40 ? {backgroundColor:"#EF9B0F"} : {backgroundColor:"#BC0000"} )) : {}}>
                                                        <p className="text-center text-white text-25" >{student.score == 0 ? '-' : student.score}</p> 
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
