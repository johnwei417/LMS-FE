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
        this.refs.loader.black();
        this.loadStudentListInTarget();
        this.checkLogin();
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

    toRecord(e, link) {
        e.preventDefault();
        window.location.href = '/records/' + link
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
            this.refs.loader.hide();
        }, errMsg =>{
            this.setState({
                list : []
            })
            _mm.errorTips(errMsg);

        });
    }

    render(){
        let renderer;

       if(this.state.role == '1'){
        renderer =
        <div>
        <h1 className="display-3" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"15px"}}>Assigned Tasks</h1>
        <div className="col-md-12" style={{display:"block", height:"30px", marginBottom:"25px"}}>
            <div className="box-green" title="Done"></div>
            <div className="box-yellow" title="In progress"></div>
            <div className="box-red" title="Have not started"></div>
        </div>
        <PreLoader display="none" ref="loader" size=""></PreLoader>

        <div className="row">
            {
                this.state.list.map((modules, index) => {
                    return (
                        <div className="card col-md-3" key={index} style={{padding:"0px", marginLeft:"20px"}}>
                            <div className="card-header" style={modules.status == 2 ? {backgroundColor:"#02B385"} : (modules.status == 1 ? {backgroundColor:"#EF9B0F"} : {backgroundColor:"#BC0000"} )}>
                                <a onClick={modules.status == 2 ? (e) => this.toRecord(e, modules.scoreInfo.score_id) : ''}>
                                    <p className="text-white" style={{marginBottom:"0px", fontWeight:"bold", fontSize:"30px"}}>{modules.name}</p>
                                </a>
                            </div>
                                <div className="card-body" style={{backgroundColor:"#02D0FF", padding: "0"}}>
                                    <div className="content-left col-md-6 display-inline" style={modules.scoreInfo.standardized_score ? (modules.scoreInfo.standardized_score> 75 ? {backgroundColor:"#01CF85"} : (modules.scoreInfo.standardized_score > 40 ? {backgroundColor:"#FFD800"} : {backgroundColor:"#FE4C4C"} )) : {}} >
                                        <p className="text-center text-white text-25" >{modules.scoreInfo.standardized_score ? modules.scoreInfo.standardized_score : '-'}</p>
                                    </div>
                                    <div className="col-md-6 display-inline" style={modules.scoreInfo.score ? (modules.scoreInfo.score  > 75 ? {backgroundColor:"#01CF85"} : (modules.scoreInfo.score > 40 ? {backgroundColor:"#FFD800"} : {backgroundColor:"#FE4C4C"} )) : {}}>
                                        <p className="text-center text-white text-25" >{modules.scoreInfo.score  == 0 ? '-' : modules.scoreInfo.score }</p> 
                                  </div>
                                </div>
                        </div>
                    );
                })
            }
        </div>
        </div>;

       }else{

        renderer =
        <div>
            <h1 className="display-1" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"50px"}}>Assigned Tasks</h1>
            <PreLoader display="none" ref="loader" size=""></PreLoader>

        <div className="row">

            {
                this.state.list.map((modules, index) => {
                    return (

                        <div className="card col-md-3" key={index} style={{padding:"0px", marginLeft:"20px"}}>
                            <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                            </div>

                                <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                                <a onClick={(e) => this.toModule(e, modules.url)}>
                                    <p className="text-white" style={{marginBottom:"0px", fontWeight:"bold", fontSize:"30px"}}>{modules.name}</p>
                                    </a>
                                </div>

                        </div>

                    );
                })
            }

        </div>
        </div>;
       }


                return (
                    <div id="page-wrapper" style={{marginTop:"0px"}}>
                       {renderer}
                    </div>

                );
            }

}

export default TargetDetail;
