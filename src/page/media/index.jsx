import React        from 'react';
import { Link }     from 'react-router-dom';
//import ReactPlayer from 'react-player';
import MUtil        from 'util/mm.jsx';
import { VueInReact } from 'vuera';

const _mm           = new MUtil();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'
import Module from 'component/vue-components/modules/video/modules.vue';

class Media extends React.Component{
  

  componentDidMount(){
    this. checkLogin();
  }

  checkLogin(){
    if(localStorage.getItem("userInfo") === null){
    window.location.href = '/login';
    }
}

    render() {
        const Component = VueInReact(Module)
        let styles = {
          padding: '80px'
        }

        return(
        <div id="page-wrapper" style={styles}>
        <Component></Component>
        </div>
        )
      }

}

export default Media;