import React        from 'react';
import { Link }     from 'react-router-dom';

import PageTitle    from 'component/page-title/index.jsx';

class Error extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Loading Failed!"/>
                <div className="row">
                    <div className="col-md-12">
                        <span>Cannot find this path，</span>
                        <Link to="/">Return Main page</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;