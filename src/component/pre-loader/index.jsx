import React from 'react';
import './index.scss'

class PreLoader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: 'none',
            size: '',
            class: 'lds-ring',
            color: 'white'
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }
    show() {
        this.setState({display: 'block', size: this.props.size, class: this.state.class, color: this.state.color});
    }
    hide() {
        this.setState({display: 'none', size: this.props.size, class: this.state.class, color: this.state.color});
    }
    black() {
        this.setState({display: 'block', size: this.props.size, class: this.state.class, color: 'black'});
    }
    render(){

        if (this.state.size !== '') {
            this.state.size = '-'+this.state.size
        } else if (this.state.color == 'black') {
            this.state.size = '-black'
        }

        return (
            <div style={{display: "block"}}>
                <div className={this.state.class + this.state.size + " centered"} style={{display: this.state.display}}><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }
}

export default PreLoader;