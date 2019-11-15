import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';

import MUtil        from 'util/mm.jsx'

const _mm           = new MUtil();
const _class         = new Class();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'


class ClassList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            userID:         _mm.getStorage('userInfo').id,
            api_token:      _mm.getStorage('userInfo').api_token,
            role:           _mm.getStorage('userInfo').role

        };
    }
    componentDidMount(){
        this.loadClassList();
    }

    loadClassList(){
        let UserInfo = {};
        UserInfo.api_token = this.state.api_token;
        UserInfo.userID = this.state.userID;
       
        _class.getClassList(UserInfo).then(res => {
            this.setState({list : res.classes.classrooms});
        }, errMsg =>{
            this.setState({ 
                list : []
            })
            _mm.errorTips(errMsg);
        });
    }

    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Courses" />
            {
                this.state.list.map((classrooms, index) => {
                    return (
                        <div>
                            <div className="col-md-4">
                            <Link to={`/${this.state.userID}/classroom/${classrooms.class_id}`} className="color-box green">
                                <p className="subject">{classrooms.subject}</p>
                                <p className="desc">
                                    <i className="fa fa-list"></i>
                                    <span>{classrooms.grade}</span>
                                </p>
                            </Link>
                            </div>
                        </div>
                          
                    );
                })
            }
            </div>

        );
    }
}

export default ClassList;