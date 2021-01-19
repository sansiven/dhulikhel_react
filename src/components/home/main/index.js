import React from 'react';
import Carousel from './Carousel';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button' 
import {Bounce} from 'react-reveal'; 
import {Helmet} from 'react-helmet';

const Main = () => {
    return (
        <div style={{position:"relative"}}>
            <Carousel/>
            {/* <p className="main_text_subtitle">We are a hotel that loves crafting beautiful foods and environment for you to relax.</p> */}
            

            <div className="main-container">
                <Helmet>
                    <meta charset="utf-8" />
                    <link rel="icon" href="%PUBLIC_URL%/new-logo.jpg" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#ffffff" />
                    <meta name="robots" content="index,follow"/>
                    <meta name="Googlebot" content="index, follow"/>
                    <meta name="distribution" content="Global"/>
                    <meta name="revisit-after" content="6 Days" />
                    <meta name="classification" content="Hotel, Hotels in Nepal" />
                    <meta name="category" content="Hotel, Hotels in Nepal" />
                    <meta name="language" content="en-us" />
                    <link rel="canonical" href="http://www.dhulikhelboutiquehotel.com/" />
                    <base url="http://www.dhulikhelboutiquehotel.com/"/>
                    <meta name="description" content="Dhulikhel Boutique Hotel situated just a km outside of dhulikhel buspark,provides a unique and beautiful experience of your stay. Contact us to get this experience." />
                    <meta name="keywords" content="Dhulikhel Boutique Hotel, Himalayas,best hotel in dhulikhel, luxury,good food,Reservation, Travel Nepal,Travel Dhulikhel, Accommodation Nepal, Accommodation Dhulikhel, affordable hotel, best place to have night out near kathmandu, hotels near kathmandu" />
                    <title>Dhulikhel Boutique Hotel | Best Boutique Hotel in Dhulikhel, Nepal</title>
                </Helmet>
                <Bounce bottom>
                    <div className="main_text">
                        <div className="wrapper">
                            <h1 >
                                <p>Welcome</p>
                                <p>To</p>
                                <p className="welcomeHead">DhuliKhel Boutique</p>
                                </h1>
                        </div>
                    </div>
                    <p className="main_text_subtitle">We are a hotel that loves crafting beautiful foods and environment for you to relax.</p>
                </Bounce>                
                <Link className="book_now_btn" to="/accomodation">
                    <Button variant="contained" size="large">Book Now</Button>
                </Link>
            </div>
            
        </div>
    );
};

export default Main;