import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'


class UserList extends React.Component{
   
    render(){
       
        return (
            <div id="page-wrapper">
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>213</td>
                            <td>Juan</td>
                            <td>wead@email.com</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>213</td>
                            <td>Austin</td>
                            <td>wead@email.com</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>213</td>
                            <td>Jennifer</td>
                            <td>wead@email.com</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>213</td>
                            <td>Megan</td>
                            <td>wead@email.com</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>213</td>
                            <td>William</td>
                            <td>wead@email.com</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>213</td>
                            <td>Harold</td>
                            <td>wead@email.com</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>213</td>
                            <td>Kristi</td>
                            <td>wead@email.com</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>213</td>
                            <td>Amber</td>
                            <td>wead@email.com</td>
                            <td>90</td>
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