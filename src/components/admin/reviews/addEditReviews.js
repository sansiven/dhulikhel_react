import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';

import FormField from "../../ui/formFields";
import {validate} from '../../ui/misc';
import { withRouter } from 'react-router-dom'

import {firebaseReviews, firebaseDB} from '../../../firebase';
import instructionImage from '../../../resources/images/instructions.png';

class AddEditReviews extends Component {

    state = {
        reviewId : '',
        formType: '',
        formError: false,
        formSuccess: '',
        formdata: {
            name:{
                element:'input',
                value:'',
                config:{
                    name:'name_input',
                    type:'text',
                    label: 'Link of Review',
                    class: 'form-control'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            }
        }
    }

    updateFields = (review, reviewId, type) => {
        const newFormData = {...this.state.formdata}
        console.log(review)
        console.log(newFormData)
        for(let key in newFormData){
            newFormData[key].value = review[key];
            newFormData[key].valid = true;
        }
        //as key and value are same
        this.setState({
            reviewId,
            formType: type,
            formdata: newFormData
        })
    }

    componentDidMount(){
        const reviewId = this.props.match.params.id;
        if(!reviewId){
            this.setState({
                formType : 'Add Review'
            })
        }else{
            firebaseDB.ref(`reviews/${reviewId}`).once('value').then((snapshot) => {
                const review = snapshot.val();
                console.log(review)
            }).catch( e => {
                console.log(e)
            })
        }
    }

    updateForm(element, content=""){
        //not good to mutate the state so copy the state and work on this
        const newFormData = { ...this.state.formdata};
        //get the email state
        const newElement = {...newFormData[element.id]}
    
        if(content === ''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content;
        }
        

        let validData = validate(newElement)
        
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormData[element.id] = newElement;
        this.setState({
            formError: false,
            formdata: newFormData
        })
        console.log(this.state.formdata)
    }

    submitForm(event){
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            //as formisValid is changing for each element
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if(formIsValid){
            if(this.state.formType === 'Edit Review'){
                firebaseDB.ref(`reviews/${this.state.reviewId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Updated Successfully')
                }).catch((e)=>{
                    this.setState({formError: true})
                    console.log('error', e)
                })
            }else{
                firebaseReviews.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_reviews')
                }).catch((error)=>{
                    console.log('Error occured', error);
                    this.setState({formError: true})
                })
            }
        }else{
            this.setState({
                formError: true
            })
        }
    }

    successForm = (message) => {
        this.setState({
            formSuccess: message
        })
        setTimeout(()=>{
            this.setState({formSuccess: ''})
        }, 2000)
    }

    render() {
        return (
            <AdminLayout>
                <div className="container">
                    <div className="row admin_reviews">
                        <h2>
                            {this.state.formType}
                        </h2>
                        <div className="add_review_form" style={{width: "100%"}}>
                            <form onSubmit={(event) => this.submitForm(event)}>

                            <FormField 
                                id={'name'}
                                formData = {this.state.formdata.name}
                                change={(element)=>this.updateForm(element)}
                            />

                            <div className="success_label">{this.state.formSuccess}</div>
                                {this.state.formError ? 
                                <div className="error_label">
                                    Something is wrong
                                </div>
                                :null}
                                <div className="admin_submit">
                                    <button className="btn btn-secondary" onClick={(event)=>this.submitForm(event)}>
                                        {this.state.formType}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <p>Follow the following steps for adding reviews:</p>
                        <ul>
                            <li>Go to facebook page and then into reviews tab</li>
                            <li>Then go the review you want to add click on three dots on right of the review</li>
                            <li>Then click on <strong>embed</strong></li>
                            <li>It takes yo to next page then again click on <strong>"Get Code"</strong> button</li>
                            <li>Then a dialog box appears and click on IFrame tab at the top of dialog box</li>
                            <li>Then copy only "src" part as shown below and enter into the above form</li>
                            <div 
                                className="adding_review_instructions"
                                style={{
                                    background: `url(${instructionImage}) no-repeat`,
                                    width: "815px",
                                    height: "500px",
                                    margin: "10px"
                                }}
                            >
                                
                            </div>
                        </ul>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default withRouter(AddEditReviews);