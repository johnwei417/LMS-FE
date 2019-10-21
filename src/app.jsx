import React            from 'react';
import ReactDOM         from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Layout           from 'component/layout/index.jsx';
// page
import Home             from 'page/home/index.jsx';
import Class            from 'page/class/index.jsx';
import Login            from 'page/login/index.jsx';
import UserList         from 'page/user/index.jsx';
import Prof             from 'page/prof/index.jsx';
import PList            from 'page/p-list/index.jsx';
import APList            from 'page/ap-list/index.jsx';
import NPList            from 'page/np-list/index.jsx';
import ErrorPage        from 'page/error/index.jsx';

class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/class" component={Class}/>
                    <Route exact path="/class/:id" component={Prof}/>
                    <Route path="/user/index" component={UserList}/>
                    <Route exact path="/class/1/p/list" component={PList}/>
                    <Route exact path="/class/1/ap/list" component={APList}/>
                    <Route exact path="/class/1/np/list" component={NPList}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);