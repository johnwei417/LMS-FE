import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

import './index.scss'
class UserList extends React.Component{
   
    render(){
       
        return (
            <div id="page-wrapper">
           <Link to="/s/media/video"  class="notification">
                <span>New Assignments</span>
                <span class="badge">1</span>
            </Link>
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>M5.1.1</th>
                                <th>M5.1.2</th>
                                <th>M5.1.3</th>
                                <th>M5.1.4</th>
                                <th>M5.1.5</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Connor</td>
                            <td>60</td>
                            <td>45</td>
                            <td>72</td>
                            <td>66</td>
                            <td>55</td>
                        </tr>
                       
                       
                        
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        );
    }
}

export default UserList;