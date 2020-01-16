import React        from 'react';
import { VueInReact } from 'vuera';
import './index.scss'
import PreLoader from 'component/pre-loader/index.jsx';
import Recording from 'component/vue-components/recordings.vue';

class Record extends React.Component{

  componentDidMount(){
    this. checkLogin();
  }
  checkLogin(){
    if(localStorage.getItem("userInfo") === null){
    window.location.href = '/login';
    }
}
    render(){
        const Component = VueInReact(Recording)
        let styles = {
          padding: '0px'
        }

        return(
        <div id="page-wrapper" style={styles}>
        <Component></Component>
        <button type="button" class="btn btn-primary btn-lg" style={{marginTop: "20px", backgroundColor:"#02D0FF", marginLeft: "30px",marginTop:"70px"}}>
             <span onClick={() => this.props.history.goBack()}>Back</span>
        </button>
        </div>
        
        )
    }
}

export default Record;
