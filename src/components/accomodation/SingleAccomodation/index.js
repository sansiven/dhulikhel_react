import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebase, firebaseDB } from '../../../firebase'
import SingleRoom from './SingleRoom'; 
import MessageUs from '../../home/contact/MessageUs';
import Tariff from '../Tariff';
import {withRouter} from 'react-router-dom'

class SingleAccomodation extends Component {

    state={
        isLoading: true,
        room: {},
        roomId: ''
    }

    componentDidMount(){
        if(this.props.match.params.id){
            const roomId = this.props.match.params.id;
            firebaseDB.ref(`rooms/${roomId}`).once('value').then((snapshot) => {
                const room = snapshot.val();
                let promise = new Promise((resolve, reject) => {
                    firebase.storage().ref('rooms')
                    .child(room.image).getDownloadURL()
                    .then( url => {
                        room.url = url;
                        resolve();
                    }).catch(err => {
                        reject(err)
                    })
                }) 
                promise.then(()=>{
                    this.setState({
                        roomId,
                        room,
                        isLoading: false
                    })
                })
            })
        }
    }

    render() {
        return (
            <div className="container single-room-container">
                {
                    this.state.isLoading ? 
                        <div style={{textAlign:'center'}}><CircularProgress /></div>
                    : <SingleRoom room={this.state.room}/>
                }
                <div className="row">
                    <div className="col-md-6">
                        <Tariff />
                    </div>
                    <div className="col-md-6">
                        <MessageUs 
                            btnText="Book Now"
                            placeholder="Please leave your message details and phone number here"
                        />
                    </div>    
                </div>
                
            </div>
        );
    }
}

export default withRouter(SingleAccomodation);