import React            from 'react';
import ReactDOM         from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Layout           from 'component/layout/index.jsx';
import SLayout           from 'component/s-layout/index.jsx';
// page
// page
import Home             from 'page/home/index.jsx';
import SHome            from 'page/student-home/index.jsx'
import Class            from 'page/class/index.jsx';
import SClass           from 'page/s-class/index.jsx'
import Login            from 'page/login/index.jsx';
import UserList         from 'page/user/index.jsx';
import Prof             from 'page/prof/index.jsx';
import PList            from 'page/p-list/index.jsx';
import APList            from 'page/ap-list/index.jsx';
import NPList            from 'page/np-list/index.jsx';
import ErrorPage        from 'page/error/index.jsx';
import Media            from 'page/media/index.jsx';
import SMedia           from 'page/s-media/index.jsx';
import ClassDetail      from 'page/s-class-detail/index.jsx';

class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/class" component={Class}/>
                    <Route exact path="/class/:id" component={Prof}/>
                    <Route path="/user/index" component={UserList}/>
                    <Route exact path="/media/video" component={Media}/>
                    <Route exact path="/class/1/p/list" component={PList}/>
                    <Route exact path="/class/1/ap/list" component={APList}/>
                    <Route exact path="/class/1/np/list" component={NPList}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Route component={ErrorPage} />
                </Switch>
            </Layout>
        );

        let studentRouter = (
        <SLayout> 
            <Switch>
                <Route exact path="/s" component={SHome}/>
                <Route exact path="/s/classlist" component={SClass}/>
                <Route exact path="/s/classlist/1" component={ClassDetail} />
                <Route exact path="/s/media/video" component={SMedia} /> 
            </Switch>
        </SLayout>
        );

        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/"  render={ props => LayoutRouter}/>
                    <Route path="/s"  render={ props => studentRouter}/>
                    <Route path="/s/media/video" render={ props => LayoutRouter}/>
                    
                </Switch>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);