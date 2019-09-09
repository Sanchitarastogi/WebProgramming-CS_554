import React, {Component} from 'react';
//Import Query from react-apollo
import {Query} from 'react-apollo';

//Import the Quotes for Adding and Updating Quote
import AddQuote from './Quotes/AddQuotes';
import EditQuote from './Quotes/EditQuotes';
import DeleteQuote from './Quotes/DeleteQuotes';

//Import the file where my query constants are defined
import queries from '../queries';

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class Quotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditQuote: false,
            showAddQuote: false,
            showDeleteQuote: false,
            editQuote: null,
            deleteQuote: null
        };
        this.handleOpenEditQuote = this.handleOpenEditQuote.bind(this);
        this.handleOpenAddQuote = this.handleOpenAddQuote.bind(this);
        this.handleCloseQuotes = this.handleCloseQuotes.bind(this);
    }
    handleOpenEditQuote(Quote) {
        this.setState({
            showEditQuote: true,
            editQuote: Quote
        });
    }

    handleOpenDeleteQuote(Quote) {
        this.setState({
            showDeleteQuote: true,
            deleteQuote: Quote
        });
    }
    handleCloseQuotes() {
        this.setState({showAddQuote: false, showEditQuote: false, showDeleteQuote: false});
    }

    handleOpenAddQuote() {
        this.setState({showAddQuote: true});
    }
    render() {
        return (
            <div>
                <button className='button' onClick={this.handleOpenAddQuote}>
                    Create Quote
                </button>
                <br />
                <br />
             <Query query={queries.GET_QUOTES}>   
                    {({data}) => {
                        const {quotes} = data;
                        if (!quotes) {
                            return null;
                        }
                        return (
                            <div>
                                {quotes.map((quote) => {
                                    return (
                                        <div className='card' key={quote.id}>
                                            <div className='card-body'>
                                                <h5 className='card-title'>
                                                    {quote.quote} 
                                                </h5>
                                               
                                                <br />
                                                <button
                                                    className='button'
                                                    onClick={() => {
                                                        this.handleOpenEditQuote(quote);
                                                    }}>
                                                    Edit
                                                </button>
                                                <button
                                                    className='button'
                                                    onClick={() => {
                                                        this.handleOpenDeleteQuote(quote);
                                                    }}>
                                                    Delete
                                                </button>
                                                <br />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }}
                </Query>

                {/*Edit Quote Quote - NOT DONE YET */}
                {this.state &&
                this.state.showEditQuote && (
                    <EditQuote
                        isOpen={this.state.showEditQuote}
                        Quote={this.state.editQuote}
                        handleClose={this.handleCloseQuotes}
                    />
                )}

                {/*Add Quote Quote */}
                {this.state &&
                this.state.showAddQuote && (
                    <AddQuote
                        isOpen={this.state.showAddQuote}
                        handleClose={this.handleCloseQuotes}
                        Quote='addQuote'
                    />
                )}

                {/*Delete Quote Quote */}
                {this.state &&
                this.state.showDeleteQuote && (
                    <DeleteQuote
                        isOpen={this.state.showDeleteQuote}
                        handleClose={this.handleCloseQuotes}
                        deleteQuote={this.state.deleteQuote}
                    />
                )}
            </div>
        );
    }
}

export default Quotes;