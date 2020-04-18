import React, { Component } from 'react';
import Maps from './Maps'

class Contact extends Component {
    render() {
        return (
            <div className="container">
                <div className="row contact" style={{height: '400px'}}>
                    <Maps/>
                    <div className="col-md-6">contact form</div>
                </div>
            </div>
        );
    }
}

export default Contact;