import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';
import MUtil        from 'util/mm.jsx'
import TableList    from 'util/table-list/index.jsx';

const _mm           = new MUtil();
const _class         = new Class();



import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'



class Benchmark extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            details:        [],
            count:          0,
            scores:         [],
            classID:        this.props.match.params.classID,
            pLevel:         this.props.match.params.pLevel,
            userID:         _mm.getStorage('userInfo').id,
            api_token:      _mm.getStorage('userInfo').api_token,
            role:           _mm.getStorage('userInfo').role,
            title:          '',
            selected:       [],
            taskID:          0,
            taskList:       []
           
        };
       
    }
    componentDidMount(){
        this.checkLogin();
        this.getTitle();
        this.loadClassList();
        this.loadTaskList();
    
    }
    
    loadTaskList(){
        let Info = {};
        Info.api_token = this.state.api_token;

       
        _class.getTaskList(Info).then(res => {
            this.setState({
                taskList : res.tasks,
               
            });
        }, errMsg =>{
            _mm.errorTips(errMsg);
        });

    }


    loadClassList(){
        let UserInfo = {};
        UserInfo.api_token = this.state.api_token;
        UserInfo.userID = this.state.userID;
        UserInfo.classID = this.state.classID;
        UserInfo.pLevel = this.state.pLevel;
       
        _class.getPList(UserInfo).then(res => {
            this.setState({
                list : res.details,
                count: res.target_count
            });
        }, errMsg =>{
            this.setState({ 
                list : []
            })
            _mm.errorTips(errMsg);
        });
    }

    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
           window.location.href = '/login';
        }
    }

    getTitle(){
        if(this.state.pLevel == 'p'){
            this.state.title = 'Proficient';
        }
        if(this.state.pLevel == 'ap'){
            this.state.title = 'Almost Proficient';
        }
        if(this.state.pLevel == 'np'){
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

       
        console.log(inputName);
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
        taskID: this.state.taskID + 1
        };
        console.log(this.state.selected);
     let data = {
            "task" : {
                   "class_id" : this.state.classID,
                   "students_id" : this.state.selected
               }
        }
        console.log(data);
        _class.assignTask(loginInfo, JSON.stringify(data)).then((res)=>{
             _mm.successTips(res.message);
        
        }, (errMsg) => {
            _mm.errorTips(errMsg.message);
        });

    }

   

   
    render(){

       const tasklist = this.state.taskList.map((task, index)=>{
        return (
          <option key={index} name="taskID" value={task.idr}  
          onKeyUp={e => this.onInputKeyUp(e)}
          onChange={e => this.onInputChange(e)}>{task.name}</option>
        )});

        let renderer;
    if(this.state.classID == '1'){
        renderer = ( <tbody>
        <tr>
        <td>Sally Rogers</td>
        <td scope="row" className="p-3 mb-2 bg-success text-dark">
            <div className="form-check">
            <input type="checkbox" className="form-check-input" 
                    name = "selected"
                    value = '4'
                    onKeyUp={e => this.onInputKeyUp(e)}
                    onChange={e => this.onInputChange(e)}/>
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
        <td></td>
        </tr>

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
        <td></td>
       
        </tr>

        <tr>
        <td>Josiah Nigel</td>
        <td scope="row" className="p-3 mb-2 bg-success text-dark">
            <div className="form-check">
            <input type="checkbox" className="form-check-input" 
                    name = "selected"
                    value = '6'
                    onKeyUp={e => this.onInputKeyUp(e)}
                    onChange={e => this.onInputChange(e)}/>
            <label className="form-check-label" htmlFor="tableMaterialCheck3">98</label>
            </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        </tr>

        <tr>
        <td>Shahbaaz Singb</td>
        <td></td>
        <td scope="row" className="p-3 mb-2 bg-warning text-dark">
            <div className="form-check">
            <input type="checkbox" className="form-check-input" 
                    name = "selected"
                    value = '7'
                    onKeyUp={e => this.onInputKeyUp(e)}
                    onChange={e => this.onInputChange(e)}/>
            <label className="form-check-label" htmlFor="tableMaterialCheck3">75.3</label>
            </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        </tr>
        </tbody>);
        }else{
            renderer = "";
        }

        return (
            <div id="page-wrapper">
               
                <PageTitle title={`${this.state.title}`} />
                <p>Select Module</p>
                <select>
                {
                  tasklist
                }
                 
                </select>
                
                <button className="btn btn-lg btn-primary btn-block"
                onClick={e => {this.onSubmit(e)}}>Assign Module</button>

                <table className="table table-bordered">
                <thead>
                <tr>
                    <th>
                    Student Name
                    </th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                    <th>F</th>
                    <th>G</th>
                </tr>
                </thead>
                {renderer}
                </table>
              
            </div>
        );
    }
}
export default Benchmark;