import React        from 'react';
import { Link }     from 'react-router-dom';

import MUtil        from 'util/mm.jsx'
const _mm           = new MUtil();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'

class Class extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            subject         : 'MATH',
            pCount       : 6,
            apCount    : 8,
            npCount      : 10
        }
    }

    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.subject} />
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/class/1/p/list" className="color-box brown">
                            <p className="count">{this.state.pCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>Proficient</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/class/1/ap/list" className="color-box green">
                            <p className="count">{this.state.apCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>Almost Proficient</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/class/1/np/list" className="color-box blue">
                            <p className="count">{this.state.npCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>Non-Proficient</span>
                            </p>
                        </Link>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Class;