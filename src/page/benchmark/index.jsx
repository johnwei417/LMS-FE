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
        this.handleChange = this.handleChange.bind(this);
       
    }
    componentDidMount(){
        this.checkLogin();
        this.loadClassList();
        this.loadTaskList();
    
    }
    handleChange(event) {
        this.setState({taskID: event.target.value});
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
                list : res.targets.modules,
                // /count: res.target_count
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
        taskID: this.state.taskID
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
        
    
     let listBody;
    if(this.state.role== '1'){ 
     listBody = this.state.list.map((target, index) => {
            return (
                <tr key={index}>
                    
                    <td> <Link to={`/classroom/${this.state.classID}/${this.state.pLevel}/${target.id}`} className="color-box blue">   {target.name} </Link></td>
                   
                    <td>{target.description}</td>
                    <td>{target.proficient}</td>
                    <td>{target.almost_proficient}</td>
                    <td>{target.non_proficient}</td>
                </tr>
            );
        });
    }else{

        listBody = this.state.list.map((target, index) => {
            return (
                <tr key={index}>
                    
                    <td> {target.name} </td>
                    <td>{target.description}</td>
                {
                target.scores.map((score,index) => (
                score.score == 0 ? "":
                   <td key={index}>{score.score}</td>
                
                ))
                }
                
                    
                </tr>
            );
        });
    }

   
        
    let renderer;
   
    if(this.state.role == '1'){
        renderer =   
    <TableList tableHeads={['Targets', 'Description', 'Proficient', 'Almost Proficient', 'Non Proficient']}>
        {listBody}
    </TableList>;
    }else{
        renderer =   
    <TableList tableHeads={['Targets', 'Description', 'Scores']}>
        {listBody}
    </TableList>;

    }

    
        return (
            
            <div id="page-wrapper">
               
                <PageTitle title={`${this.state.pLevel == 'p'?'Proficient': this.state.pLevel == 'ap'?'Almost Proficient':'Not Proficient'}`} />

                {renderer}
              
            </div>
            
        );
    }
}
export default Benchmark;