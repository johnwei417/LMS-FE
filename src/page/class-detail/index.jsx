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

            //info student page need
            //Task info (tasks assigned by teacher)
            
            list:               [],     
        }
    }

    componentDidMount(){
        this.checkLogin();
        this.loadTaskAssigned();
        this.checkProficiencyLevel();
       
       
    }

    componentWillmount(){
        this.loadClassDetail();
    }
  

    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
            window.location.href = '/login';
        }
    }
    
    toModule(e, link) {
        e.preventDefault();
        window.location.href = '/'+link;
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

    loadTaskAssigned(){
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
        renderer =   (<div className="row" style={{marginTop:"45px"}}>
            <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px"}}>
                <div className="card-header" style={{backgroundColor:"#02B385"}}>
                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Proficiency</span>
                </div>
                <Link to={`/classroom/${this.state.classID}/p-page`} className="text-muted" style={{textDecoration:"none"}}>
                    <div className="card-body" style={{backgroundColor:"#01CF85"}}>
                         <PreLoader display="none" ref="loader" size=""></PreLoader>
                         <p className="display-5 text-white" style={{marginBottom:"0px", fontWeight:"bold"}} ref="count1">Proficiency</p>
                        
                         <a href="#" className="btn btn-primary" style={{backgroundColor:"#02B385", border:"none", borderRadius:"25px"}}>More Details</a>
                    </div>
                </Link>
            </div>
            <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px", minWidth:"26%"}}>
                <div className="card-header" style={{backgroundColor:"#EF9B0F"}}>
                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Tasks</span>
                </div>
                <Link to={`/tasks`} className="text-muted" style={{textDecoration:"none"}}>
                    <div className="card-body" style={{backgroundColor:"#FFD800"}}>
                         <PreLoader display="none" ref="loader1" size=""></PreLoader>
                         <p className="display-5 text-white" style={{marginBottom:"0px", fontWeight:"bold"}} ref="count2">tasks</p>
                        
                         <a href="#" className="btn btn-primary" style={{backgroundColor:"#EF9B0F", border:"none", borderRadius:"25px"}}>More Details</a>
                    </div>
                </Link>
            </div>
           
            
        </div>
        );
       

        //student page
        } else {     

                renderer = 
                <div>
                {
                    this.state.list.map((task, index)=>{
                        return (
                            <a onClick={(e) => this.toModule(e, task.url)} href="javascript:void(0)">
                                {task.status == '2'? '':
                                <div key ={index} className= {`p-3 mb-2 ${task.status == '0'? 'alert': (task.status == '1' ? 'warning' : 'success')} text-white`} style={{borderRadius:"7px"}}>
                                    {task.name}
                                </div>
                                }
                            </a>
                        );
        
                    })
                }
               
               <div className="row" style={{marginTop:"45px"}}>
                        <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px"}}>
                            <div className="card-header" style={{backgroundColor:"#02B385"}}>
                                <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Proficiency</span>
                            </div>
                            <Link to={`/classroom/${this.state.classID}/${this.state.proficientLevel}`} className="text-muted" style={{textDecoration:"none"}}>
                                <div className="card-body" style={{backgroundColor:"#01CF85"}}>
                                    <PreLoader display="none" ref="loader" size=""></PreLoader>
                                    <p className="display-5 text-white" style={{marginBottom:"0px", fontWeight:"bold"}} ref="count1">Proficiency</p>
                                    
                                    <a href="#" className="btn btn-primary" style={{backgroundColor:"#02B385", border:"none", borderRadius:"25px"}}>More Details</a>
                                </div>
                            </Link>
                        </div>
                        <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px", minWidth:"26%"}}>
                            <div className="card-header" style={{backgroundColor:"#EF9B0F"}}>
                                <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Tasks</span>
                            </div>
                            <Link to={`/tasks/${this.state.userID}`} className="text-muted" style={{textDecoration:"none"}}>
                                <div className="card-body" style={{backgroundColor:"#FFD800"}}>
                                    <PreLoader display="none" ref="loader1" size=""></PreLoader>
                                    <p className="display-5 text-white" style={{marginBottom:"0px", fontWeight:"bold"}} ref="count2">Tasks</p>
                                    
                                    <a href="#" className="btn btn-primary" style={{backgroundColor:"#EF9B0F", border:"none", borderRadius:"25px"}}>More Details</a>
                                </div>
                            </Link>
                        </div>
                    
                        
                    </div>
                </div>
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