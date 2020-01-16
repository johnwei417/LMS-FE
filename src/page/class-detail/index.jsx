import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';
import MUtil        from 'util/mm.jsx'
const _mm           = new MUtil();
const _class         = new Class();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'
import warning from 'tiny-warning';
import PreLoader from 'component/pre-loader/index.jsx';

class ClassDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userID:              _mm.getStorage('userInfo').id,
            username:            _mm.getStorage('userInfo').name,
            classID:             this.props.match.params.classID,
            api_token:           _mm.getStorage('userInfo').api_token,
            role:                _mm.getStorage('userInfo').role,
            p_count:             0,
            ap_count:            0,
            np_count:            0,

            proficientLevel:     '',
            moduleInfo:          [],
            grade:               '',
            subject:             'Math',

            //info student page need
            //Task info (tasks assigned by teacher)

            list:               [],
        }
    }

    componentDidMount(){
        this.loadClassDetail();
        this.checkLogin();
        this.loadTaskAssigned();
        this.checkProficiencyLevel();


    }

    componentWillmount(){

    }

    loadClassDetail() {
        let classInfo = {};
        classInfo.api_token = this.state.api_token;
        classInfo.userID = this.state.userID;
        classInfo.classID = this.state.classID;
        _class.getClassDetails(classInfo).then((res)=>{
            this.setState({
                grade:  ' - ' + res.classroom.details.grade + ' Grade',
                subject: res.classroom.details.subject,
                classID: res.classroom.details.class_id
            })
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
    }


    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
            window.location.href = '/login';
        }
    }

    toModule(e, link) {
        e.preventDefault();
        window.location.href = link;
    }

    checkProficiencyLevel(){
        if(this.state.role == '0'){
            let classInfo = {};
            classInfo.api_token = this.state.api_token;
            classInfo.userID = this.state.userID;
            classInfo.classID = this.state.classID;


            _class.getClassDetails(classInfo).then((res)=>{

                _mm.setStorage('classInfo', res.classroom);
                this.setState({
                    p_count:             res.classroom.scores.proficient.count,
                    ap_count:            res.classroom.scores.almostProficient.count,
                    np_count:            res.classroom.scores.notProficient.count
                })

                if(this.state.p_count == 1){
                    this.setState({proficientLevel:  'p'})
                }

                if(this.state.np_count == 1){
                 this.setState({proficientLevel:  'np'})
                 }

                 if(this.state.ap_count == 1){
                 this.setState({proficientLevel:  'ap'})
                 }

            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });


        }
    }

    formatDate (date) {
        let splitDate = date.split('-');
        return splitDate[1] + ' / ' + splitDate[2] + ' / ' + splitDate[0];
    }

    loadTaskAssigned(){
        if (this.state.role == 1) {
            return
        }
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

    // render page
    render(){
        const checkRole = this.state.role;

        let renderer;

        if(checkRole == '1'){
            renderer =   (<div >
            <h1 className="display-3" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"35px",marginTop:"70px"}}>{this.state.subject + this.state.grade}</h1>
                <div className="row" style={{marginTop:"45px"}}>  
                    <div className="card col-md-3" style={{padding:"0px", marginLeft:"18px"}}>
                        <Link to={`/classroom/${this.state.classID}/p-page`} className="text-muted" style={{textDecoration:"none"}}>
                            <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                                <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Proficiency</span>
                            </div>
                            <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                                <PreLoader display="none" ref="loader" size=""></PreLoader>

                                <a href={`/classroom/${this.state.classID}/p-page`} className="btn btn-primary" style={{backgroundColor:"#019DF4", border:"none", borderRadius:"25px",  width:"100%"}}>More Details</a>
                            </div>
                        </Link>
                    </div>
                    <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px", minWidth:"26%"}}>
                        <Link to={this.state.classID == 1 ? `/tasks` : {}} className="text-muted" style={{textDecoration:"none"}}>
                            <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                                <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Tasks</span>
                            </div>
                            <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                                <PreLoader display="none" ref="loader1" size=""></PreLoader>

                                <a href={this.state.classID == 1 ? `/tasks` : {}} className="btn btn-primary" style={{backgroundColor:"#019DF4", border:"none", borderRadius:"25px", width:"100%"}}>More Details</a>
                            </div>
                        </Link>
                    </div>
                </div> 
        </div>
        );

        //student page
        } else {

                renderer =
                <div>
                    <div style={{float:"right"}}>
                        <p>
                            <div className="dot-yellow" title="In progress" style={{borderRadius:"100%", border:"none"}}></div>
                            <span className="text-bold">{'In progress'}</span>
                        </p>
                        <p>
                            <div className="dot-red" title="Have not started" style={{borderRadius:"100%", border:"none"}}></div>
                            <span className="text-bold">{'Not started'}</span>
                        </p>
                    </div>
                    <h1 className="display-3" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"35px",marginTop:"70px"}}>{this.state.subject + this.state.grade}</h1>
                {
                    this.state.list.map((task, index)=>{
                        return (
                            <a onClick={(e) => this.toModule(e, task.url)} href="javascript:void(0)">
                                {task.status == '2'? '':
                                <div key ={index} className={`p-2 mb-2 col-md-7 ${task.status == '0'? 'alert': (task.status == '1' ? 'warning' : 'success')} text-white`} style={{borderRadius:"7px", maxWidth:"53.9%", fontWeight:"700"}}>
                                    {task.name}
                                    <span class="badge badge-pill badge-dark lead" style={{marginLeft:"10px", marginTop:"7px", fontWeight:"320"}}>{'Due: '+this.formatDate(task.due_date)}</span>
                                </div>
                                }
                            </a>
                        );

                    })
                }
               <div className="row" style={{marginTop:"20px"}}>
                        <div className="card col-md-3" style={{padding:"0px", marginLeft:"16px"}}>
                            <Link to={`/classroom/${this.state.classID}/${this.state.proficientLevel}`} className="text-muted" style={{textDecoration:"none"}}>
                                <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Proficiency</span>
                                </div>
                            </Link>
                            <Link to={`/classroom/${this.state.classID}/${this.state.proficientLevel}`} className="text-muted" style={{textDecoration:"none"}}>
                                <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                                    <PreLoader display="none" ref="loader" size=""></PreLoader>
                                    <a href={`/classroom/${this.state.classID}/${this.state.proficientLevel}`} className="btn btn-primary" style={{backgroundColor:"#019DF4", border:"none", borderRadius:"25px", width:"100%"}}>More Details</a>
                                </div>
                            </Link>
                        </div>
                        <div className="card col-md-3" style={{padding:"0px", marginLeft:"20px", minWidth:"26%"}}>
                            <Link to={`/tasks/${this.state.userID}`} className="text-muted" style={{textDecoration:"none"}}>
                                <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Tasks</span>
                                </div>
                            </Link>
                            <Link to={`/tasks/${this.state.userID}`} className="text-muted" style={{textDecoration:"none"}}>
                                <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                                    <PreLoader display="none" ref="loader1" size=""></PreLoader>
                                    <a href={`/tasks/${this.state.userID}`} className="btn btn-primary" style={{backgroundColor:"#019DF4", border:"none", borderRadius:"25px", width:"100%"}}>More Details</a>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
             }



        return (
            <div id="page-wrapper">
                {renderer}
                <button type="button" class="btn btn-primary btn-lg" style={{marginTop: "100px", backgroundColor:"#02D0FF"}}>
                     <span onClick={() => this.props.history.goBack()}>Back</span>
                </button>
            </div>
        );


 }
}

export default ClassDetail;
