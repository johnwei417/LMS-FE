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
            selected:       []
    
        };
    }
    componentDidMount(){
        this.checkLogin();
        this.getTitle();
        this.loadClassList();
    
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

    onSubmit(){
        // button to loading state
        this.refs.loading.show()
        
        let loginInfo = {
        data: {
         "task" : {
                "class_id" : this.state.classID,
                "student_id" : [this.state.password]
            }
        }
        }
    ,
        checkResult = _user.checkLoginInfo(loginInfo);
         
        // pass validation
        if(checkResult.status == true){
            _user.login(JSON.stringify(loginInfo)).then((res) => {
                _mm.setStorage('userInfo', res.account);
                this.props.history.push(this.state.redirect);
                this.refs.loading.hide();
            }, (errMsg) => {
               _mm.errorTips(errMsg);
               this.refs.loading.hide();
            });
        }
        // valid failed
        else{
          _mm.errorTips(checkResult.msg);
        }
            
    }

   
    render(){

       
        return (
            <div id="page-wrapper">
                <PageTitle title={`${this.state.title}`} />
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
                </tr>
                </thead>

                <tbody>
                        <tr>
                        <th scope="row">
                            
                            <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="tableMaterialCheck2" />
                            <label className="form-check-label" htmlFor="tableMaterialCheck2">Check 2</label>
                            </div>
                        </th>
                        <td className="p-3 mb-2 bg-warning text-dark">Cell 1</td>
                        <td>Cell 2</td>
                        <td>Cell 3</td>
                        <td>Cell 4</td>
                        </tr>
                        <tr>
                        <th scope="row">
                        
                            <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="tableMaterialCheck3" />
                            <label className="form-check-label" htmlFor="tableMaterialCheck3">Check 3</label>
                            </div>
                        </th>
                        <td>Cell 4</td>
                        <td>Cell 5</td>
                        <td>Cell 6</td>
                        </tr>
                        <tr>
                        <th scope="row">
                        
                            <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="tableMaterialCheck4" />
                            <label className="form-check-label" htmlFor="tableMaterialCheck4">Check 4</label>
                            </div>
                        </th>
                        <td>Cell 7</td>
                        <td>Cell 8</td>
                        <td>Cell 9</td>
                        </tr>
                    </tbody>
                </table>
              
            </div>
        );
    }
}
export default Benchmark;