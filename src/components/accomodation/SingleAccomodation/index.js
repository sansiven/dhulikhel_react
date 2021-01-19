import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebase, firebaseDB } from '../../../firebase'
import SingleRoom from './SingleRoom'; 
import MessageUs from '../../home/contact/MessageUs';
import Tariff from '../Tariff';
import {withRouter} from 'react-router-dom'
import { Helmet } from 'react-helmet'

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
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Accomodation | Dhulikhel Boutique Hotel | Best Boutique Hotel in Dhulikhel, Nepal</title>
                    <meta name="description" content="Dhulikhel Boutique Hotel situated just a km outside of dhulikhel buspark,provides a unique and beautiful experience of your stay. Contact us to get this experience." />
                    <link rel="icon" href="%PUBLIC_URL%/new-logo.jpg" />
                    <link rel="canonical" href="http://dhulikhelboutiquehotel.com/" />
                </Helmet>
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