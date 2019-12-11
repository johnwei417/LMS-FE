import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';
import Calendar from 'react-calendar';
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
            taskID:          0,
            taskList:       [],
            date:           new Date()

        };
        this.handleChange = this.handleChange.bind(this);
        this.selected = [];
    }
    componentDidMount(){
        this.checkLogin();
        this.loadStudentListInTarget();
        this.refs.assignBtn.disabled = true;
    }

    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
            window.location.href = '/login';
        }
    }

    handleChange(event) {
        this.setState({taskID: event.target.value});
        console.log(this.state.date)
        if (event.target.value > 0 && this.selected.length > 0) {
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
            if (this.selected.indexOf(inputValue) > -1) {
                let index = this.selected.indexOf(inputValue);
                this.selected.splice(index,1);
                if (this.selected.length == 0) {
                    this.refs.assignBtn.disabled = true;
                }
            } else  {
                this.selected = this.selected.concat(inputValue);
                if (this.state.taskID > 0) {
                    this.refs.assignBtn.disabled = false;
                }
            }

        }
    }

    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit(e);
        }
    }

    onSubmit(e){
        e.preventDefault();
     let loginInfo = {
        api_token: this.state.api_token,
        userID: this.state.userID,
        taskID: this.state.taskID
        };
        console.log('task: ' + this.state.taskID + ' student: ' + this.selected);
        
        // set due date
        let dueDate = new Date(this.state.date);
        dueDate = dueDate.getFullYear() + '-' + (dueDate.getMonth()+1) + '-' + dueDate.getDate()

       let data = {
            "task" : {
                   "class_id" : this.state.classID,
                   "students_id" : this.selected,
                   "due_date": dueDate
               }
        }

        _class.assignTask(loginInfo, JSON.stringify(data)).then((res)=>{
             _mm.successTips(res.message);

            // reset back
            for(let i = 0; i < this.selected.length; i++) {
                this.refs['student'+this.selected[i]].checked = false;
            }
            this.selected = [];
            this.setState({
                taskID: 0
            });
            this.refs.assignBtn.disabled = true;
            $('#calendarModal').modal('hide');
            $("[data-dismiss=modal]").trigger({ type: "click" })
        }, (errMsg) => {
            console.log(errMsg);
            _mm.errorTips(errMsg);

            // reset back
            for(let i = 0; i < this.selected.length; i++) {
                this.refs['student'+this.selected[i]].checked = false;
            }
            this.selected = [];
            this.setState({
                taskID: 0
            });
            this.refs.assignBtn.disabled = true;
            $('#calendarModal').modal('hide');
            $("[data-dismiss=modal]").trigger({ type: "click" })
        });

    }

    dateChange (currentDate) {
        console.log(currentDate);
        this.setState({date : currentDate});
        console.log(this.state.date);
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
              <option key={index} name="taskID" value={task.id}>{task.name}</option>
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
                            <button className="btn btn-primary" style={{marginLeft:"20px", padding:"0px", paddingLeft:"35px", paddingRight:"35px"}} ref="assignBtn" data-toggle="modal" data-target="#calendarModal">Assign Module</button>
                            <div ref="calendarModal" className="modal fade" id="calendarModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="modalLabel">Select Due Date</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div style={{marginLeft:"auto", marginRight:"auto"}}>
                                            <Calendar 
                                                onChange={e => this.dateChange(e)}
                                                value={this.state.date}
                                                minDate={new Date()}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" class="btn btn-primary" onClick={e => this.onSubmit(e)}>Assign Modules</button>
                                    </div>
                                    </div>
                                </div>
                                </div>

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
                                                            ref={'student'+student.user_id}
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
