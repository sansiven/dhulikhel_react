import React from 'react';
import Carousel from './Carousel';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button' 

const Main = () => {
    return (
        <div style={{position:"relative"}}>
            <Carousel/>
            {/* <p className="main_text_subtitle">We are a hotel that loves crafting beautiful foods and environment for you to relax.</p> */}
            

            <div className="main-container">
                <div className="main_text">
                    <div className="wrapper">
                        Welcome to DhuliKhel Boutique
                    </div>
                    
                </div>
                <p className="main_text_subtitle">We are a hotel that loves crafting beautiful foods and environment for you to relax.</p>
                <Link className="book_now_btn" to="/book_now">
                    <Button variant="contained" size="large">Book Now</Button>
                </Link>
            </div>
            
        </div>
    );
};

export default Main;