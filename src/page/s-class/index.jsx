import React        from 'react';
import { Link }     from 'react-router-dom';

import MUtil        from 'util/mm.jsx'
const _mm           = new MUtil();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'

class SClass extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {
            mathCount       : 40,
            readingCount    : 43,
            scienceCount      : 28
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Course" />
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/s/classlist/1" className="color-box brown">
                            <p className="count">Math</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span></span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/s/classlist/2" className="color-box green">
                            <p className="count">Reading</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span></span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/s/classlist/3" className="color-box blue">
                            <p className="count">Science</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span></span>
                            </p>
                        </Link>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default SClass;