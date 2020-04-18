import React, { Component } from 'react';
import Main from './main';
import Contact from './contact';
import About from "./about";
import Reviews from "./reviews";

class Home extends Component {
    render() {
        return (
            
            <div className="hey">
                {/* <React.Fragment> */}
                <Main />
                <About/>
                <Reviews />
                <h3 className="contact-header">Find Us Here and Feel free to contact us:</h3>
                <Contact />
                {/* </React.Fragment>  */} 
            </div>
            
        );
    }
}

export default Home;