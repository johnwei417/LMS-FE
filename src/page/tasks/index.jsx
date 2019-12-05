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

class Task extends React.Component{
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

        this.checkLogin();
        this.loadBanner();
       
    }
  

    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
        window.location.href = '/login';
        }
    }

    loadBanner(){
        this.refs.loader.black();
        let studentInfo = {};
        studentInfo.api_token = this.state.api_token;
        studentInfo.userID = this.state.userID;
        //call api to get data from backend,
        //then store them into local storage
        _class.getTasks(studentInfo).then((res)=>{
            _mm.setStorage('bannerInfo', res.tasks.details);
            this.refs.loader.hide();
            this.setState({
                tasks: res.tasks.details
          });    
        }, (errMsg)=>{
            _mm.errorTips(errMsg);
        })
       
    }



    // render page
    render(){
        const checkRole = this.state.role;
        let renderer;
        
        
        if(checkRole == '1'){
            let tasks = this.state.tasks
            renderer = 
            <div>
           
    
            {
                tasks.sort((a, b) => {return (a.user_details.name >= b.user_details.name)}).map((task, index)=> {
                    return (
                        <a href= {`${task.status == '2'? `/records/${task.score_id}`:'#'}`} key ={index}>
                            <div className= {`p-3 mb-2 ${task.status == '0'? 'alert': (task.status == '1' ? 'warning' : 'success')} text-white`} style={{borderRadius:"7px"}}>
                                {task.user_details.name + ' - ' + task.task_details.name}
                            </div>
                        </a>
                    );
    
                })
            }
            </div>
            ;

        //student page
        }else{
        
    
            
        renderer = 
        <div>
       

        {
            this.state.tasks.map((task, index)=>{
                return (
                    <a href= {`${task.url}`} >
                        <div key ={index} className= {`p-3 mb-2 ${task.status == '0'? 'alert': (task.status == '1' ? 'warning' : 'success')} text-white`} style={{borderRadius:"7px"}}>
                            {task.name}
                        </div>
                    </a>
                );

            })
        }
        </div>
        ;
        }
        
        return (
            <div id="page-wrapper">
               
                <h1 className="display-3" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"50px"}}>Tasks</h1>
                <PreLoader display="none" ref="loader" size=""></PreLoader>
               {renderer}
    
            </div>
        );
            
    
 }
}

export default Task;