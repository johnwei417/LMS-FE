import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';
import MUtil        from 'util/mm.jsx'
const _mm           = new MUtil();
const _class         = new Class();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'
import warning from 'tiny-warning';

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



    // render page
    render(){
        const checkRole = this.state.role;
        let renderer;
        
        
        if(checkRole == '1'){
            renderer = 
            <div>
           
    
            {
                this.state.tasks.map((task, index)=>{
                    return (
                    <div key ={index} className= {`p-3 mb-2 ${task.status == '0'? 'bg-warning': 'bg-success'} text-white`}> <a href= {`${task.status == '2'? '/records':''}`} >{task.user_details.name}</a></div>
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

export default Task;