import { Component } from 'react';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            headerText: '',
            subheaderText: ''
        }
    }

    render() { 
        return (
            <header>
                <div className="headerOverlay">
                    <h1 className="wrapper" >{this.props.headerText}</h1>
                    <h2 className="wrapper">{this.props.subheaderText}</h2>
                </div>
            </header>
        )
    }
}

export default Header;

