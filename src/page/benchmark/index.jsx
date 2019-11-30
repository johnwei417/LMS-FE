import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';
import MUtil        from 'util/mm.jsx'
import TableList    from 'util/table-list/index.jsx';

const _mm           = new MUtil();
const _class         = new Class();



import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'


class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            scores          :[],
            classID:        this.props.match.params.classID,
            pLevel:         this.props.match.params.pLevel,
            userID:         _mm.getStorage('userInfo').id,
            api_token:      _mm.getStorage('userInfo').api_token,
            role:           _mm.getStorage('userInfo').role,
            title:          ''
    
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
                list : res.modules,
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
   
    render(){
        let listBody = this.state.list.map((modules, index) => {
            //this.setState({scores: modules.scores });
            return (
                <tr key={index}>
                    <td>{modules.name}</td>
                </tr>
            );
        });
       
        return (
            <div id="page-wrapper">
                <PageTitle title={`${this.state.title}`} />
                <TableList tableHeads={['Target']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

export default UserList;