import React from 'react';
import './index.scss'

class PreLoader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: 'none',
            size: '',
            class: 'lds-ring'
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }
    show() {
        this.setState({display: 'block', size: this.props.size, class: this.state.class});
    }
    hide() {
        this.setState({display: 'none', size: this.props.size, class: this.state.class});
    }
    render(){

        if (this.state.size != '') {
            this.state.size = '-'+this.state.size
        }

        return (
            <div style={{display: "block"}}>
                <div className={this.state.class + this.state.size + " centered"} style={{display: this.state.display}}><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }
}

export default PreLoader;