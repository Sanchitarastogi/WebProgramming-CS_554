import React, {Component} from 'react';
//Import Query from react-apollo
import {Mutation} from 'react-apollo';
import ReactModal from 'react-modal';

//Import the file where my query constants are defined
import queries from '../../queries';

//For react-Todo
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
class DeleteTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteTodo: this.props.isOpen,
            todo: this.props.deletetodo
        };
        this.handleOpenDeleteTodo = this.handleOpenDeleteTodo.bind(this);
        this.handleCloseDeleteTodo = this.handleCloseDeleteTodo.bind(this);
        console.log(this.state.Todo);
    }

    handleOpenDeleteTodo() {
        this.setState({showDeleteTodo: true});
    }

    handleCloseDeleteTodo() {
        this.setState({showDeleteTodo: false});
        this.props.handleClose(false);
    }
    
    render()
     {
        debugger;
        return (
            <div>
                {/*Add Todo Todo */}
                <ReactModal
                    name='deleteTodo'
                    isOpen={this.state.showDeleteTodo}
                    contentLabel='Delete Todo'
                    style={customStyles}>
                    {/*Here we set up the mutation, since I want the data on the page to update
						after I have added someone, I need to update the cache. If not then
						I need to refresh the page to see the data updated 
						See: https://www.apollographql.com/docs/react/essentials/mutations for more
						information on Mutations
                    */}
                    
                    <Mutation
                        mutation={queries.DELETE_TODO}
                        update={(cache, {data: {removeTodo}}) => {
                            const {todos} = cache.readQuery({query: queries.GET_TODOS});
                            cache.writeQuery({
                                query: queries.GET_TODOS,
                                data: {todos: todos.filter((e) => e.id !== this.state.todo.id)}
                            });
                        }}>
                        {(removeTodo, {data}) => (
                          
                            <div>
                
                                <p>
                                    Are you sure you want to delete {this.state.todo.title}{' '}
                                    {this.state.todo.completed}?
                                </p>

                                <form
                                    className='form'
                                    id='delete-Todo'
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        removeTodo({
                                            variables: {
                                                id: this.state.todo.id
                                            }
                                        });
                                        this.setState({showDeleteTodo: false});
                                        alert('Todo Deleted');
                                        this.props.handleClose();
                                    }}>
                                    <br />
                                    <br />
                                    <button className='button add-button' type='submit'>
                                        Delete Todo
                                    </button>
                                </form>
                            </div>
                        )}
                    </Mutation>
                    <br />
                    <br />
                    <button className='button cancel-button' onClick={this.handleCloseDeleteTodo}>
                        Cancel
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default DeleteTodo;