import React            from 'react';
import './index.scss';
//general list
class TableList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFirstLoading: true
        }
    }
    componentWillReceiveProps(){
        //list only be true when is first loading, otherwise false
        this.setState({
            isFirstLoading : false
        });
    }
    render(){
        //table head information
        let tableHeader = this.props.tableHeads.map(
            (tableHead, index) => {
                if(typeof tableHead === 'object'){
                    return <th key={index} width={tableHead.width} style={tableHead.name == 'Proficient' ? {backgroundColor:"#02B385"} : (tableHead.name == 'Almost Proficient' ? {backgroundColor:"#EF9B0F"} : (tableHead.name == 'Non Proficient' ? {backgroundColor:"#BC0000"} : {})) }>{tableHead.name}</th>
                }else if(typeof tableHead === 'string'){
                    return <th key={index} style={tableHead == 'Proficient' ? {backgroundColor:"#02B385"} : (tableHead == 'Almost Proficient' ? {backgroundColor:"#EF9B0F"} : (tableHead == 'Non Proficient' ? {backgroundColor:"#BC0000"} : (tableHead == 'Missing Score' ? {backgroundColor:"#E0E0E0"}:{}))) }>{tableHead}</th>
                }
            }
        );
        // list body
        let listBody = this.props.children;
        // list information
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isFirstLoading ? 'Loading...' : 'Cannot find corresponding content~'}
                </td>
            </tr>
        );
        let tableBody = listBody.length > 0 ? listBody : listInfo;
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="text-center">
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TableList;