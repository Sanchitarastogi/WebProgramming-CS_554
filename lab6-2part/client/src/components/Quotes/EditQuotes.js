import React, {Component} from 'react';
//Import Query from react-apollo
import { Mutation } from 'react-apollo';
import ReactModal from 'react-modal';

//Import the file where my query constants are defined
import queries from '../../queries';

//For react-Quote
ReactModal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        border: '1px solid #28547a',
        borderRadius: '4px'
    }
};

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class EditQuote extends Component {
    constructor(props) {
        //console.log(this.props.Quote);
        super(props);
        this.state = {
            showEditQuote: this.props.isOpen,
            quote: this.props.Quote
        };
        this.handleCloseEditQuote = this.handleCloseEditQuote.bind(this);
    }

    handleCloseEditQuote() {
        this.setState({showEditQuote: false, quote: null});
        console.log("hi");
        this.props.handleClose();
    }

    render() {
        let quote;
        
        return (
            <div>
                {/*Edit Quote Quote - NOT DONE YET */}
                <ReactModal
                    name='editQuote'
                    isOpen={this.state.showEditQuote}
                    contentLabel='Edit Quote'
                    style={customStyles}>
                    <Mutation mutation={queries.EDIT_QUOTE}>
                        {(editQuote, {data}) => (
                            <form
                                className='form'
                                id='add-Quote'
                                onSubmit={e => {
                                    console.log(quote.value);
                                    
                                    // console.log(this.props.quote.id);
                                    e.preventDefault();
                                    editQuote({
                                        variables: {
                                            id: this.state.quote.id,
                                            quote: quote.value,
                    
                                        }
                                    });
                                    
                                    quote.value = '';
                                   
                                   
                                    this.setState({showEditQuote: false});
                                    alert('Quote Updated');
                                    this.props.handleClose();
                                }}>
                                <div className='form-group'>
                                    <label>
                                        Quote:
                                        <br />
                                        <input
                                            ref={(node) => {
                                                quote = node;
                                            }}
                                            defaultValue={this.props.quote}
                                            autoFocus={true}
                                        />
                                    </label>
                                </div>
                                <br />
                                
                                <br />

                                <br />
                                <br />
                                <button className='button add-button' type='submit'>
                                    Update Quote
                                </button>
                            </form>
                        )}
                    </Mutation>
                    <button className='button cancel-button' onClick={this.handleCloseEditQuote}>
                        Cancel
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default EditQuote;