import React        from 'react';
import { Link }     from 'react-router-dom';
//import ReactPlayer from 'react-player';
import MUtil        from 'util/mm.jsx';
import video1       from 'resource/Blackmer1.mp4';
import video2        from 'resource/Blackmer2.mp4';
import video3        from 'resource/Blackmer3.mp4';
import video4        from 'resource/Blackmer4.mp4';
import video5        from 'resource/Blackmer5.mp4';
import video6        from 'resource/Blackmer6.mp4';
import video7        from 'resource/Blackmer7.mp4';


const _mm           = new MUtil();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'

class Media extends React.Component{

    render() {
        return(
        <div id="page-wrapper">
       <PageTitle title="Module 5.1.1" />
         <video src={video1} controls></video>
         <div><h1>#2</h1></div>
         <video src={video2} controls></video>
         

        </div>
       
        );
      }
}

export default Media;