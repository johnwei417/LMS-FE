import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';
import MUtil        from 'util/mm.jsx'
const _mm           = new MUtil();
const _class         = new Class();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'
import warning from 'tiny-warning';

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

            //info student page need
            //Task info (tasks assigned by teacher)
            tasks:              []        
        }
    }

    componentDidMount(){

        this.loadClassDetail();
        this.checkLogin();
        this.loadBanner();
       
    }
  

    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
        window.location.href = '/login';
        }
    }

    loadBanner(){
        let studentInfo = {};
        studentInfo.api_token = this.state.api_token;
        studentInfo.userID = this.state.userID;
        //call api to get data from backend,
        //then store them into local storage
        _class.getTasks(studentInfo).then((res)=>{
            _mm.setStorage('bannerInfo', res.tasks.details);
            this.setState({
                tasks: res.tasks.details
          });    
        }, (errMsg)=>{
            _mm.errorTips(errMsg);
        })
       
    }

    loadClassDetail(){
        let classInfo = {};
        classInfo.api_token = this.state.api_token;
        classInfo.userID = this.state.userID;
        classInfo.classID = this.state.classID;
        classInfo.pLevel = this.state.proficientLevel;

        let countInfo  ={};
        countInfo.p_count = this.state.p_count
        if(this.state.role == '1'){
            if (window.localStorage.getItem('classInfo')) {
                this.setState({
                    p_count:             _mm.getStorage('classInfo').scores.proficient.count,
                    ap_count:            _mm.getStorage('classInfo').scores.almostProficient.count,
                    np_count:            _mm.getStorage('classInfo').scores.notProficient.count
                })
            }

            _class.getClassDetails(classInfo).then((res)=>{
                _mm.setStorage('classInfo', res.classroom);
                this.setState({
                    p_count:             _mm.getStorage('classInfo').scores.proficient.count,
                    ap_count:            _mm.getStorage('classInfo').scores.almostProficient.count,
                    np_count:            _mm.getStorage('classInfo').scores.notProficient.count
                })
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }else{
            _class.getClassDetails(classInfo).then((res)=>{
                _mm.setStorage('classInfo', res.classroom);
                //check proficiency level from local stoage;
                if(_mm.getStorage('classInfo').scores.proficient.count != 0){
                    this.setState({
                        proficientLevel: 'p',
                        scores : _mm.getStorage('classInfo').scores.proficient.users.scores
                    })
                }

                if(_mm.getStorage('classInfo').scores.almostProficient.count != 0){
                    this.setState({
                        proficientLevel: 'ap',
                        scores : _mm.getStorage('classInfo').scores.almostProficient.users.scores
                    })
                }

                if(_mm.getStorage('classInfo').scores.notProficient.count != 0){
                    this.setState({
                        proficientLevel: 'np',
                        scores : _mm.getStorage('classInfo').scores.notProficient.users.scores
                    })
                }
            }, (errMsg) => {
                _mm.errorTips(errMsg);

            });
        
        }
    }

    // render page
    render(){
        const checkRole = this.state.role;
        let renderer;
        
        
        if(checkRole == '1'){
        renderer =   <div className="row" style={{marginTop:"45px"}}>
            <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px"}}>
                <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Proficient</span>
                </div>
                <Link to={`/classroom/${this.state.classID}/p`} className="text-muted" style={{textDecoration:"none"}}>
                    <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                         <p className="display-1 text-white" style={{marginBottom:"0px", fontWeight:"bold"}}>{this.state.p_count}</p>
                         <p className="text-white">Students</p>
                         <a href="#" className="btn btn-primary" style={{backgroundColor:"#019DF4", border:"none", borderRadius:"25px"}}>More Details</a>
                    </div>
                </Link>
            </div>
            <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px", minWidth:"26%"}}>
                <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Almost Proficient</span>
                </div>
                <Link to={`/classroom/${this.state.classID}/ap`} className="text-muted" style={{textDecoration:"none"}}>
                    <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                         <p className="display-1 text-white" style={{marginBottom:"0px", fontWeight:"bold"}}>{this.state.ap_count}</p>
                         <p className="text-white">Students</p>
                         <a href="#" className="btn btn-primary" style={{backgroundColor:"#019DF4", border:"none", borderRadius:"25px"}}>More Details</a>
                    </div>
                </Link>
            </div>
            <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px"}}>
                <div className="card-header" style={{backgroundColor:"#019DF4"}}>
                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Non-Proficient</span>
                </div>
                <Link to={`/classroom/${this.state.classID}/np`} className="text-muted" style={{textDecoration:"none"}}>
                    <div className="card-body" style={{backgroundColor:"#02D0FF"}}>
                         <p className="display-1 text-white" style={{marginBottom:"0px", fontWeight:"bold"}}>{this.state.np_count}</p>
                         <p className="text-white">Students</p>
                         <a href="#" className="btn btn-primary" style={{backgroundColor:"#019DF4", border:"none", borderRadius:"25px"}}>More Details</a>
                    </div>
                </Link>
            </div>
            
        </div>
        ;
       

        //student page
        }else{
        
    
            
        renderer = 
        <div>
       

        {
            this.state.tasks.map((task, index)=>{
                return (
                <div key ={index} className= {`p-3 mb-2 ${task.status == '0'? 'bg-warning': 'bg-success'} text-white`}> <a href= {task.url} >{task.name}</a></div>
                );

            })
        }
        </div>
        ;
        }
        
        return (
            <div id="page-wrapper">
               
                <h1 className="display-3" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"50px"}}>Students Performance</h1>
               {renderer}
    
            </div>
        );
            
    
 }
}

export default ClassDetail;