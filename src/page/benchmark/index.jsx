import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';
import MUtil        from 'util/mm.jsx'
import TableList    from 'util/table-list/index.jsx';

const _mm           = new MUtil();
const _class         = new Class();

import './index.scss'
import PreLoader from 'component/pre-loader/index.jsx';



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
        this.refs.loader.black();
        this.checkLogin();
        this.loadClassList();

    }
    handleChange(event) {
        this.setState({taskID: event.target.value});
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
            this.refs.loader.hide();
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

    goTo(e, link) {
        e.preventDefault();
        window.location.assign(link);
    }


    render(){


     let listBody;
    if(this.state.role== '1'){
     listBody = this.state.list.map((target, index) => {
            return (
                <tr key={index} onClick={e => {this.goTo(e, `/classroom/${this.state.classID}/${this.state.pLevel}/${target.id}`)}}>
                    <td className="text-center">{target.name}</td>
                    <td>{target.description}</td>
                    <td className="text-center" style={target.proficient != 0 ? {backgroundColor:"#01CF85"} : {}}>{target.proficient}</td>
                    <td className="text-center" style={target.almost_proficient != 0 ? {backgroundColor:"#FFD800"} : {}}>{target.almost_proficient}</td>
                    <td className="text-center" style={target.non_proficient != 0 ? {backgroundColor:"#FE4C4C"} : {}}>{target.non_proficient}</td>
                </tr>
            );
        });
    }else{

        listBody = this.state.list.map((target, index) => {
            return (
                <tr key={index}>
                    <td className="text-center"> {target.name} </td>
                    <td>{target.description}</td>
                {
                target.scores.map((score,index) => (

                   <td key={index} className="text-center" style={score.score ? (score.score> 75 ? {backgroundColor:"#01CF85"} : (score.score > 40 ? {backgroundColor:"#FFD800"} : {backgroundColor:"#FE4C4C"} )) : {}}>{score.score == 0 ? "-": score.score}</td>

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
        <PreLoader display="none" ref="loader" size=""></PreLoader>
        {listBody}
    </TableList>;
    } else {
        renderer =
    <TableList tableHeads={['Targets', 'Description', 'Scores']}>
        <PreLoader display="none" ref="loader" size=""></PreLoader>
        {listBody}
    </TableList>;

    }


        return (
            <div id="page-wrapper">
                <h1 className="display-3" style={{fontWeight:"bold", color:"grey", opacity:"0.3", marginBottom:"50px"}}>{this.state.pLevel == 'p'?'Proficient': this.state.pLevel == 'ap'?'Almost Proficient':'Not Proficient'}</h1>
                {renderer}
            </div>

        );
    }
}
export default Benchmark;
