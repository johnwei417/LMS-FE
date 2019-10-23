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
            mathCount       : 40,
            readingCount    : 43,
            scienceCount      : 28
        }
    }

    render(){
        return (
            <div id="page-wrapper">
        
            </div>
        );
    }
}

export default Home;