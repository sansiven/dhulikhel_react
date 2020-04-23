import React, { Component } from 'react';
import { firebaseMessages } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';
import CircularProgress from '@material-ui/core/CircularProgress';
import AdminLayout from '../../../HOC/AdminLayout';

class AdminMesaages extends Component {

    state = {
        isLoading : true,
        messages: []
    }

    getMessages(){
        console.log('get Messages Called',firebaseMessages)
        firebaseMessages.once('value').then((snapshot) => {
            const messages = firebaseLooper(snapshot);
            this.setState({
                isLoading: false,
                messages: reverseArray(messages)
            })
        })
        
    }

    componentDidMount(){
        console.log('hey')
        firebaseMessages.once('value').then((snapshot) => {
            const messages = firebaseLooper(snapshot);
            this.setState({
                isLoading: false,
                messages: reverseArray(messages)
            })
        })
    }


    render() {
        console.log(this.state)
        return (
            <AdminLayout>
            <div className="messages-container" style={{marginTop: "100px"}}>
                <div className="container">
                    <h3 style={{textAlign:'center'}}>Messages</h3>
                    <div className="row" style={{display: 'block'}}>
                        <div className="admin_progress">
                            {this.state.isLoading ?
                                    <CircularProgress thickness={7} style={{color:"#3da066"}} />
                                : ''
                            }
                        </div>
                        {this.state.messages ?
                            this.state.messages.map((message, i) => (
                                <ul className="list-group" key={i}>
                                    <li className="list-group-item">
                                        Name: {message.name}
                                    </li>
                                    <li className="list-group-item">
                                        Email: {message.email}
                                    </li>
                                    <li className="list-group-item">
                                        Message: {message.message}
                                    </li>
                                    <li className="list-group-item">
                                        Please reply these messages through your gmail account as this feature is not yet available
                                    </li>
                                </ul>
                            ))
                            :null
                        }                        
                    </div>
                </div>

            </div>
            </AdminLayout>
        );
    }
}

export default AdminMesaages;