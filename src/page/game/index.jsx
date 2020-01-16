import React        from 'react';
import MUtil        from 'util/mm.jsx';
import { VueInReact } from 'vuera';

const _mm           = new MUtil();
import './index.scss'
import Module from 'component/vue-components/modules/game/module.vue';

class Media extends React.Component{

    render() {
        const Component = VueInReact(Module)
        let styles = {
          paddingTop: '60px',
          mariginTop: '50px'
        }

        return(
        <div id="page-wrapper" style={styles}>
        <Component></Component>
        </div>
        )
      }

}

export default Media;