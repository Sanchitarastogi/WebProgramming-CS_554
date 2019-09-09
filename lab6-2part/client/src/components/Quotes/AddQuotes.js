import React, { Component } from 'react';
//Import Query from react-apollo
import {  Mutation } from 'react-apollo';
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

class AddQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddQuote: this.props.isOpen
        };
        this.handleOpenAddQuote = this.handleOpenAddQuote.bind(this);
        this.handleCloseAddQuote = this.handleCloseAddQuote.bind(this);
    }

    handleOpenAddQuote() {
        this.setState({ showAddQuote: true });
    }

    handleCloseAddQuote() {
        this.setState({ showAddQuote: false });
        this.props.handleClose(false);
    }
    render() {
        let body;
        //check which add Quote they are trying to get to and then render the form, mutation/query accordingly
        //if Add Employee
        debugger;
        if (this.props.Quote === 'addQuote') {
            let quote;

            body = (
                <Mutation
                    mutation={queries.ADD_QUOTE}
                    update={(cache, { data: { addQuote } }) => {
                        const { quotes } = cache.readQuery({ query: queries.GET_QUOTES });
                        cache.writeQuery({
                            query: queries.GET_QUOTES,
                            data: { quotes: quotes.concat([addQuote]) }
                        });
                    }}>
                    {(addQuote, { data }) => (
                        <form
                            className='form'
                            id='add-Quote'
                            onSubmit={(e) => {
                                e.preventDefault();
                                addQuote({
                                    variables: {
                                        quote: quote.value,

                                    }
                                });
                                quote.value = '';

                                this.setState({ showAddQuote: false });
                                alert('Quote Added');
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
                                        required
                                        autoFocus={true}
                                    />
                                </label>
                            </div>
                            <br />

                            <button className='button add-button' type='submit'>
                                Add Quote
                            </button>
                        </form>
                    )}
                </Mutation>
            );
        }

        return (
            <div>
                <ReactModal
                    name='addQuote'
                    isOpen={this.state.showAddQuote}
                    contentLabel='Add Quote'
                    style={customStyles}>
                    {body}
                    <button className='button cancel-button' onClick={this.handleCloseAddQuote}>
                        Cancel
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default AddQuote;