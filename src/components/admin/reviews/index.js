import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';
import { Link } from 'react-router-dom';
import { firebaseReviews } from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../ui/misc';
import CircularProgress from '@material-ui/core/CircularProgress'



class AdminReviews extends Component {

    state= {
        isLoading: true,
        reviews: []
    }

    componentDidMount(){
        firebaseReviews.once('value').then((snapshot) => {
            const reviews = firebaseLooper(snapshot);
            console.log(reviews);
            this.setState({
                isLoading: false,
                reviews: reverseArray(reviews)
            })
        }).catch((error) => {
            console.log('firebase reviews error', error);
        })
    }

    handleDelete = (e, reviewId) => {
        console.log('id to be deleted', reviewId);
        firebaseReviews.child(reviewId).remove().then(()=>{
            console.log(this.state.reviews)
            let reviews = [...this.state.reviews];
            reviews.map((value, index)=>{
                if(value.id === reviewId){
                    return reviews.splice(index,1)
                }
            })
            this.setState({
                reviews
            })
        })
    }

    addReviews(review, i){        
        return(
            <div className="col-md-6" key={i}>
                <div className="card mb-4 box-shadow">
                    <div style={{alignItems: "center"}}>
                    <iframe className="card-img-top" style={{width: "500px", height: "auto"}} src={review.name} title={i} alt={review.name}></iframe>
                    </div>
                    
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                
                                <button 
                                    type="button" 
                                    className="btn btn-sm btn-outline-secondary" 
                                    onClick={(e) => this.handleDelete(e, review.id)}
                                >Delete</button>
                            
                                <Link to={`admin_reviews/add_reviews/${review.id}`}>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                </Link>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        
        return (
            <AdminLayout>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            {this.state.isLoading ? 
                                <CircularProgress />
                                :null
                            }
                            {!this.state.isLoading ?
                                this.state.reviews ?
                                    this.state.reviews.map((review, i)=>(
                                        this.addReviews(review, i)
                                    ))
                                    :<p>Nothing on Reviews</p>
                            :null
                            }
                        </div>
                        <div className="add_service">
                            <Link to="/admin_reviews/add_review">
                                <button className="btn btn-primary">Add A Review</button>
                            </Link>
                        </div>
                    </div>    
                </div>

            </AdminLayout>
        );
    }
}

export default AdminReviews;