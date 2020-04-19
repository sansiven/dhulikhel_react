import React from 'react';

const FormField = ({id, formData, change}) => {

    const showError = () => {
        let errorMessage = <div className="error_label">
            {
                formData.validation && !formData.valid ? 
                    formData.validationMessage
                :null
            }
        </div>
        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formData.element){
            case('input'):
                formTemplate = (
                    <div>
                        <input 
                            {...formData.config}
                            value={formData.value}
                            onChange={(event) => change({event, id})}
                        />
                        {showError()}
                    </div>
                )
            break;
            case('textarea'):
                formTemplate = (
                    <div>
                        <textarea 
                            {...formData.config}
                            value={formData.value}
                            onChange={(event) => change({event, id})}
                            rows="5"
                        />
                        {showError()}
                    </div>
                )
            break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }

    return(
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField;