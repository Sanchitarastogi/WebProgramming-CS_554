import React, {Component} from 'react';
//Import Query from react-apollo
import {Mutation} from 'react-apollo';
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
class DeleteQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteQuote: this.props.isOpen,
            quote: this.props.deleteQuote
        };
        this.handleOpenDeleteQuote = this.handleOpenDeleteQuote.bind(this);
        this.handleCloseDeleteQuote = this.handleCloseDeleteQuote.bind(this);
    }

    handleOpenDeleteQuote() {
        this.setState({showDeleteQuote: true});
    }

    handleCloseDeleteQuote() {
        this.setState({showDeleteQuote: false});
        this.props.handleClose(false);
    }
    render() {
        return (
            <div>
                {/*Add Quote Quote */}
                <ReactModal
                    name='deleteQuote'
                    isOpen={this.state.showDeleteQuote}
                    contentLabel='Delete Quote'
                    style={customStyles}>
                    {/*Here we set up the mutation, since I want the data on the page to update
						after I have added someone, I need to update the cache. If not then
						I need to refresh the page to see the data updated 
						See: https://www.apollographql.com/docs/react/essentials/mutations for more
						information on Mutations
					*/}
                    <Mutation
                        mutation={queries.DELETE_QUOTE}
                        update={(cache, {data: {removeQuote}}) => {
                            const {quotes} = cache.readQuery({query: queries.GET_QUOTES});
                            cache.writeQuery({
                                query: queries.GET_QUOTES,
                                data: {quotes: quotes.filter((e) => e.id !== this.state.quote.id)}
                            });
                        }}>
                        {(removeQuote, {data}) => (
                            <div>
                                <p>
                                    Are you sure you want to delete {this.state.quote.quote}{' '}?
                                </p>

                                <form
                                    className='form'
                                    id='delete-Quote'
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        removeQuote({
                                            variables: {
                                                id: this.state.quote.id
                                            }
                                        });
                                        this.setState({showDeleteQuote: false});
                                        alert('Quote Deleted');
                                        this.props.handleClose();
                                    }}>
                                    <br />
                                    <br />
                                    <button className='button add-button' type='submit'>
                                        Delete Quote
                                    </button>
                                </form>
                            </div>
                        )}
                    </Mutation>
                    <br />
                    <br />
                    <button className='button cancel-button' onClick={this.handleCloseDeleteQuote}>
                        Cancel
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default DeleteQuote;