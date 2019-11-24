import React        from 'react';
import { Link }     from 'react-router-dom';
//import ReactPlayer from 'react-player';
import MUtil        from 'util/mm.jsx';
import { VueInReact } from 'vuera'

const _mm           = new MUtil();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'
import Module from 'component/vue-components/modules.vue';

class Media extends React.Component{

    render() {
        const Component = VueInReact(Module)
        return(
        <div id="page-wrapper">
        <PageTitle title="Math Module" />
        <Component></Component>
        </div>
        )
      }

}

export default Media;