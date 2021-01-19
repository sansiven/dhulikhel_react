import React, { Component } from 'react';
import { firebaseGallery, firebase } from '../../firebase';
import {firebaseLooper} from '../ui/misc'
import {Promise} from 'core-js';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Helmet} from 'react-helmet'

class Gallery extends Component {

    state={
        loading: true,
        gallery: [],
        filteredGallery: [],
        filterThrough: 'All'
    }

    componentDidMount(){
        firebaseGallery.once('value').then((snapshot)=>{
            const gallery = firebaseLooper(snapshot)
            let promises = [];
            for(let key in gallery){
                promises.push(
                    new Promise((resolve,reject) => {
                        firebase.storage().ref('gallery')
                        .child(gallery[key].image).getDownloadURL()
                        .then( url => {
                            gallery[key].url = url
                            resolve();
                        }).catch(e => {
                            console.log(e)
                            reject(e);
                        })
                    })
                )
            }
            Promise.all(promises).then(()=>{
                this.setState({
                    loading: false,
                    gallery: gallery,
                    filteredGallery: gallery
                })
            }).catch(e => console.log(e))
        }).catch((e)=>{
            console.log(e)
        })
    }

    showFiltered = (filter) => {
        const list = this.state.gallery.filter((photo) => {
            return photo.gallery_tag === filter
        })
        this.setState({
            filteredGallery: filter === 'All' ? this.state.gallery : list,
            filterThrough: filter
        })
    }

    addPhotosToPage = (photoObj, i) => {
        console.log(photoObj.url)
        return (<div className="col-md-4 gallery-image-wrapper" key={i}>
            <div className="gallery-single-image-wrapper">
                    <img className="gallery-image-single" 
                        src={photoObj.url} 
                        onLoad={()=> console.log('loadded')} 
                        alt={photoObj.id}
                    />
                </div>
            </div>
        )    
    }

    render() {
        console.log(this.state)
        return (
            <div className="gallery-container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Gallery | Dhulikhel Boutique Hotel | Best Boutique Hotel in Dhulikhel, Nepal</title>
                    <meta name="description" content="Dhulikhel Boutique Hotel situated just a km outside of dhulikhel buspark,provides a unique and beautiful experience of your stay. Contact us to get this experience." />
                    <link rel="icon" href="%PUBLIC_URL%/new-logo.jpg" />
                    <link rel="canonical" href="http://dhulikhelboutiquehotel.com/" />
                </Helmet>
                <div className="container">
                    <div className="row row-first">
                        <h2 className="second-heading">Gallery</h2>
                        <hr className="gallery-line"></hr>
                        <h5 className="third-heading" >"Fresh portfolio of pictures that will keep you looking for more"</h5>
                        <div className="gallery_filters">
                            <div className="filters_container">
                                <div className="portfolioFilter">  
                                    <ul className="Portfolio-nav">
                                        <li 
                                            className={`option ${this.state.filterThrough === 'All' ? 'active' : ''}`} 
                                            onClick={() => this.showFiltered('All')}>All</li>
                                        <li 
                                            className={`option ${this.state.filterThrough === 'rooms' ? 'active' : ''}`} 
                                            onClick={() => this.showFiltered('rooms')}>ROOMS</li>
                                        <li 
                                            className={`option ${this.state.filterThrough === 'food' ? 'active' : ''}`} 
                                            onClick={() => this.showFiltered('food')}>FOOD & DRINKS</li>
                                        <li 
                                            className={`option ${this.state.filterThrough === 'exterior' ? 'active' : ''}`} 
                                            onClick={() => this.showFiltered('exterior')}>EXTERIOR</li>
                                        <li 
                                            className={`option ${this.state.filterThrough === 'interior' ? 'active' : ''}`} 
                                            onClick={() => this.showFiltered('interior')}>INTERIOR</li>
                                    </ul>
                                </div> 
                            </div>
                        </div>
                        <div className="row row-second">
                            {!this.state.loading && this.state.gallery.length?
                                this.state.filteredGallery.map((photoObj, i) => (
                                    this.addPhotosToPage(photoObj, i)
                                ))
                        
                            : <CircularProgress />}
                            
                        </div>
                        
                    </div>    
                </div>
            </div>
        );
    }
}

export default Gallery;