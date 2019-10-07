import React        from 'react';
import { Link }     from 'react-router-dom';

import MUtil        from 'util/mm.jsx'
const _mm           = new MUtil();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mathCount       : '-',
            readingCount    : '-',
            scienceCount      : '-'
        }
    }

    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Main page" />
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/class/1" className="color-box brown">
                            <p className="count">{this.state.mathCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>Math</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/class/2" className="color-box green">
                            <p className="count">{this.state.readingCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>Reading</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/class/3" className="color-box blue">
                            <p className="count">{this.state.scienceCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>Science</span>
                            </p>
                        </Link>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Home;