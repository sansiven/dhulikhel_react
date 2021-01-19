import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebase, firebaseRooms } from '../../firebase'
import { firebaseLooper } from '../ui/misc'; 
import RoomCard from './RoomCard.js';
import Tariff from './Tariff';
import {withRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet'

class Accomodation extends Component {

    state = {
        isLoading: true,
        rooms: []
    }

    componentDidMount(){
        firebaseRooms.once('value').then((snapshot) => {
            const rooms = firebaseLooper(snapshot);
            let promises = [];
            for(let key in rooms){
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('rooms')
                        .child(rooms[key].image).getDownloadURL()
                        .then((url)=>{
                            rooms[key].url = url;
                            resolve();
                        })
                    })
                )
            }
            Promise.all(promises)
            .then(()=>{
                this.setState({
                    isLoading: false,
                    rooms
                })
            }).catch(e => {
                console.log('erroe: ', e)
            })
        })
    }

    render() {
        return (
            <div className="accomodation-container container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Accomodation | Dhulikhel Boutique Hotel | Best Boutique Hotel in Dhulikhel, Nepal</title>
                    <meta name="description" content="Dhulikhel Boutique Hotel situated just a km outside of dhulikhel buspark,provides a unique and beautiful experience of your stay. Contact us to get this experience." />
                    <link rel="icon" href="%PUBLIC_URL%/new-logo.jpg" />
                    <link rel="canonical" href="http://dhulikhelboutiquehotel.com/" />
                </Helmet>
                <div className="accomodation-heading">
                    <h2 className="second-heading">Accomodation</h2>
                    <hr class="service-line"/>
                    <h5 className="third-heading">"Get the best sleep away from home"</h5>
                </div>
                <div className="gallery-grids row">
                    {
                        this.state.isLoading ? 
                            <CircularProgress />
                        : this.state.rooms.map((room, i) => (
                            <RoomCard 
                                room={room}
                                key={i}
                            />
                        ))

                    }
                </div>
                <Tariff />
            </div>
        );
    }
}

export default withRouter(Accomodation);