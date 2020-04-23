import React, { Component } from 'react';
import { firebaseServices, firebase } from '../../firebase';
import {firebaseLooper} from '../ui/misc';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Promise} from 'core-js';


class Services extends Component {

    state = {
        isLoading: true,
        services: []
    }

    addServices(){
        
        if(this.state.services){
            console.log('add services called')
            this.state.services.map((service, i) => {
                
                console.log(service)
                return (<div className="white-bg" key={i}>
                    hey
                    <div className="item">
                        <figure className="col-lg-5 col-sm-4">
                            <img  src={service.url} alt={service.name}/>
                        </figure>
                        <div className="featured-box-col2 delay-04s">
                            <h3 className="carousel-h3">{service.name}</h3>
                            <p>{service.description} </p>
                        </div>    
                    </div>
                </div>
            )})
            
        }
    }

    componentDidMount(){
        firebaseServices.once('value').then((snapshot) => {
            const services = firebaseLooper(snapshot);
            let promises = [];

            for (let key in services){
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref(`services`)
                            .child(services[key].image).getDownloadURL()
                            .then((url) => {
                                services[key].url = url;
                                resolve();
                            })
                    })
                )
            }

            Promise.all(promises).then(()=>{
                this.setState({
                    isLoading: false,
                    services
                })
            })
            
        })
        
    }

    render() {
        console.log(this.state)
        return (
            <div className="services-container">
                <div className="container">
                    <div className="row services-row">
                        <h2>Our Services</h2>
                        <hr class="service-line"/>
                        <p class="services-pg">We offer exceptional services and make sure you will leave the hotel in your best mood and wanting more of the same.</p>
                        {
                            !this.state.isLoading ? 
                                this.addServices()
                            :<CircularProgress />
                        }
                        {
                            !this.state.isLoading ? 
                            this.state.services.map((service, i) => {
                                return (
                                    <div className="row service-single-item">
                                        <div className="white-bg" key={i}>
                                            <div className="item">
                                                <figure className="col-lg-5 col-sm-4">
                                                    <img  src={service.url} alt={service.name}/>
                                                </figure>
                                                <div className="featured-box-col2 delay-04s">
                                                    <h3 className="carousel-h3">{service.name}</h3>
                                                    <p>{service.description} </p>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                )})
                            :null
                        }
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Services;