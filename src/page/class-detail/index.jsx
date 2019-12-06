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
            tasks:              []        
        }
    }

    componentDidMount(){
        this.loadBanner();
        this.loadClassDetail();
        this.checkLogin();
    }

    componentWillmount(){
        this.loadClassDetail();
    }
  

    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
            window.location.href = '/login';
        }
    }

    loadBanner(){
        if(this.state.role == '0'){
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
        });
    }
       
    }
    
    toModule(e, link) {
        e.preventDefault();
        window.location.href = '/'+link;
    }

    loadClassDetail(){
        if(this.state.role == '1'){
            let classInfo = {};
            this.refs.count1.style.display="none"; 
            this.refs.count2.style.display="none";
            this.refs.count3.style.display="none"; 
    
            this.refs.loader.show();
            this.refs.loader1.show();
            this.refs.loader2.show();
            classInfo.api_token = this.state.api_token;
            classInfo.userID = this.state.userID;
            classInfo.classID = this.state.classID;
            classInfo.pLevel = this.state.proficientLevel;
    
            let countInfo  ={};
            countInfo.p_count = this.state.p_count;
            if (window.localStorage.getItem('classInfo')) {
                this.setState({
                    p_count:             _mm.getStorage('classInfo').scores.proficient.count,
                    ap_count:            _mm.getStorage('classInfo').scores.almostProficient.count,
                    np_count:            _mm.getStorage('classInfo').scores.notProficient.count
                })
            }

            _class.getClassDetails(classInfo).then((res)=>{
                this.refs.count1.style.display="block"; 
                this.refs.count2.style.display="block";
                this.refs.count3.style.display="block";
                this.refs.loader.hide();
                this.refs.loader1.hide();
                this.refs.loader2.hide();
                _mm.setStorage('classInfo', res.classroom);
                this.setState({
                    p_count:             _mm.getStorage('classInfo').scores.proficient.count,
                    ap_count:            _mm.getStorage('classInfo').scores.almostProficient.count,
                    np_count:            _mm.getStorage('classInfo').scores.notProficient.count
                })
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
        renderer =   (<div className="row" style={{marginTop:"45px"}}>
            <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px"}}>
                <div className="card-header" style={{backgroundColor:"#02B385"}}>
                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Proficient</span>
                </div>
                <Link to={`/classroom/${this.state.classID}/p`} className="text-muted" style={{textDecoration:"none"}}>
                    <div className="card-body" style={{backgroundColor:"#01CF85"}}>
                         <PreLoader display="none" ref="loader" size=""></PreLoader>
                         <p className="display-1 text-white" style={{marginBottom:"0px", fontWeight:"bold"}} ref="count1">{this.state.p_count}</p>
                         <p className="text-white">Students</p>
                         <a href="#" className="btn btn-primary" style={{backgroundColor:"#02B385", border:"none", borderRadius:"25px"}}>More Details</a>
                    </div>
                </Link>
            </div>
            <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px", minWidth:"26%"}}>
                <div className="card-header" style={{backgroundColor:"#EF9B0F"}}>
                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Almost Proficient</span>
                </div>
                <Link to={`/classroom/${this.state.classID}/ap`} className="text-muted" style={{textDecoration:"none"}}>
                    <div className="card-body" style={{backgroundColor:"#FFD800"}}>
                         <PreLoader display="none" ref="loader1" size=""></PreLoader>
                         <p className="display-1 text-white" style={{marginBottom:"0px", fontWeight:"bold"}} ref="count2">{this.state.ap_count}</p>
                         <p className="text-white">Students</p>
                         <a href="#" className="btn btn-primary" style={{backgroundColor:"#EF9B0F", border:"none", borderRadius:"25px"}}>More Details</a>
                    </div>
                </Link>
            </div>
            <div className="card col-md-3" style={{padding:"0px", marginLeft:"40px"}}>
                <div className="card-header" style={{backgroundColor:"#BC0000"}}>
                    <span className="text-white" style={{fontWeight:"bold", fontSize:"30px"}}>Non-Proficient</span>
                </div>
                <Link to={`/classroom/${this.state.classID}/np`} className="text-muted" style={{textDecoration:"none"}}>
                    <div className="card-body" style={{backgroundColor:"#FE4C4C"}}>
                         <PreLoader display="none" ref="loader2" size=""></PreLoader>
                         <p className="display-1 text-white" style={{marginBottom:"0px", fontWeight:"bold"}} ref="count3">{this.state.np_count}</p>
                         <p className="text-white">Students</p>
                         <a href="#" className="btn btn-primary" style={{backgroundColor:"#BC0000", border:"none", borderRadius:"25px"}}>More Details</a>
                    </div>
                </Link>
            </div>
            
        </div>
        );
       

        //student page
        } else {     
             if ( this.state.userID  == '4') {
                renderer = <div>
                {
                    this.state.tasks.map((task, index)=>{
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
                <table className="table table-bordered">
                <thead>
                <tr>
                <th>
                    Student Name
                    </th>
                    <th title="Write and interpret numerical expressions.">A</th>
                    <th title="Analyze patterns and relationships.">B</th>
                    <th title="Understand the place value system.">C</th>
                    <th title="Perform operations with multi‐digit whole numbers and with decimals to hundredths.">D</th>
                    <th title="Use equivalent fractions as a strategy to add and subtract fractions.">E</th>
                    <th title="Apply and extend previous understandings of multiplication and division to multiply and divide fractions.">F</th>
                   
                </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td>Sally Rogers</td>
                        <td scope="row" className="p-3 mb-2 bg-success text-dark">
                            <div className="form-check">
                        
                            <label className="form-check-label" htmlFor="tableMaterialCheck3">80.25</label>
                            </div>
                        </td>
                        <td scope="row" className="p-3 mb-2 bg-warning text-dark ">
                            <div className="form-check">
                            <input type="checkbox" className="form-check-input" 
                                    name = "selected"
                                    value = '4'
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            <label className="form-check-label" htmlFor="tableMaterialCheck3">70</label>
                            </div>
                        </td>
                        <td></td>
                        <td scope="row" className="p-3 mb-2 bg-warning text-dark ">
                            <div className="form-check">
                            <input type="checkbox" className="form-check-input" 
                                    name = "selected"
                                    value = '4'
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            <label className="form-check-label" htmlFor="tableMaterialCheck3">60.25</label>
                            </div>
                        </td>
                        <td></td>
                        
                        <td></td>
                    </tr>
                </tbody>
                </table>
                </div>        
             } else if (this.state.userID  == '5') {
                renderer = <div>
                {
                    this.state.tasks.map((task, index)=>{
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
                <table className="table table-bordered">

                <thead>
                <tr>
                <th>
                    Student Name
                    </th>
                    <th title="Write and interpret numerical expressions.">A</th>
                    <th title="Analyze patterns and relationships.">B</th>
                    <th title="Understand the place value system.">C</th>
                    <th title="Perform operations with multi‐digit whole numbers and with decimals to hundredths.">D</th>
                    <th title="Use equivalent fractions as a strategy to add and subtract fractions.">E</th>
                    <th title="Apply and extend previous understandings of multiplication and division to multiply and divide fractions.">F</th>
                   
                </tr>
                </thead>
                <tbody>
                            <tr>
                                <td>Burt Hagard</td>
                                <td scope="row" className="p-3 mb-2 bg-warning text-dark">
                                    <div className="form-check">
                                    <input type="checkbox" className="form-check-input" 
                                            name = "selected"
                                            value = '5'
                                            onKeyUp={e => this.onInputKeyUp(e)}
                                            onChange={e => this.onInputChange(e)}/>
                                    <label className="form-check-label" htmlFor="tableMaterialCheck3">75.5</label>
                                    </div>
                                </td>
                                <td></td>
                                <td scope="row" className="p-3 mb-2 bg-warning text-dark ">
                                    <div className="form-check">
                                    <input type="checkbox" className="form-check-input" 
                                            name = "selected"
                                            value = '5'
                                            onKeyUp={e => this.onInputKeyUp(e)}
                                            onChange={e => this.onInputChange(e)}/>
                                    <label className="form-check-label" htmlFor="tableMaterialCheck3">50.65</label>
                                    </div>
                                </td>

                                <td></td>
                                <td></td>
                               
                                <td></td>
                            
                            </tr>
                </tbody>
                </table>
                </div>
             } else {
                renderer = <div>
                {
                    this.state.tasks.map((task, index)=>{
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
                <table className="table table-bordered">
                <thead>
                <tr>
                <th>
                    Student Name
                    </th>
                    <th title="Write and interpret numerical expressions.">A</th>
                    <th title="Analyze patterns and relationships.">B</th>
                    <th title="Understand the place value system.">C</th>
                    <th title="Perform operations with multi‐digit whole numbers and with decimals to hundredths.">D</th>
                    <th title="Use equivalent fractions as a strategy to add and subtract fractions.">E</th>
                    <th title="Apply and extend previous understandings of multiplication and division to multiply and divide fractions.">F</th>
                   
                </tr>
                </thead>
                </table>
                </div>
             }

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