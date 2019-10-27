import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'
import { VueInReact } from 'vuera'
import assignModules from 'component/vue-components/assign-button-modal.vue'


class UserList extends React.Component{
   
    render(){
        const AssignComponent = VueInReact(assignModules)
        return (
            <div id="page-wrapper">
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
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                
                                <td>Winston</td>
                                <td></td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Beth</td>
                                <td></td>
                                <td></td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>
                            <tr>
                            
                                <td>Sarah</td>
                                <td></td>
                                <td></td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>
                            <tr>
                            
                                <td>Tina</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                
                                <td>Anthony</td>
                                <td></td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>

                            <tr>
                                
                                <td>Shelly</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>X</td>
                                <td>X</td>
                            </tr>

                            <tr>
                                
                                <td>Trisha</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>X</td>
                            </tr>

                            <tr>
                            
                                <td>Brittany</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>X</td>
                                <td>X</td>
                            </tr>

                            <tr>
                
                                <td>Melissa</td>
                                <td></td>
                                <td></td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>

                            
                                <tr>
                                    <th>Count</th>
                                    <th>2</th>
                                    <th>4</th>
                                    <th>7</th>
                                    <th>9</th>
                                    <th>10</th>
                                    
                                </tr>
                        
                            
                            </tbody>
                        </table>
                    </div>
                </div>
                <AssignComponent></AssignComponent>
            </div>

        );
    }
}

export default UserList;