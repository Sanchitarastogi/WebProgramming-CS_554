import React, {Component} from 'react';
//Import Query from react-apollo
import {Query} from 'react-apollo';

//Import the Todos for Adding and Updating todo
import AddTodo from './Todos/AddTodos';
import EditTodo from './Todos/EditTodos';
import DeleteTodo from './Todos/DeleteTodos';

//Import the file where my query constants are defined
import queries from '../queries';

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditTodo: false,
            showAddTodo: false,
            showDeleteTodo: false,
            editTodo: null,
            deleteTodo: null
        };
        this.handleOpenEditTodo = this.handleOpenEditTodo.bind(this);
        this.handleOpenAddTodo = this.handleOpenAddTodo.bind(this);
        this.handleCloseTodos = this.handleCloseTodos.bind(this);
    }
    handleOpenEditTodo(todo) {
        this.setState({
            showEditTodo: true,
            editTodo: todo
        });
    }

    handleOpenDeleteTodo(todo) {
        this.setState({
            showDeleteTodo: true,
            deleteTodo: todo
        });
    }
    handleCloseTodos() {
        this.setState({showAddTodo: false, showEditTodo: false, showDeleteTodo: false});
    }

    handleOpenAddTodo() {
        this.setState({showAddTodo: true});
    }
    render() {
        return (
            <div>
                <button className='button' onClick={this.handleOpenAddTodo}>
                    Create todo
                </button>
                <br />
                <br />
                <Query query={queries.GET_TODOS}>
                    {({data}) => {
                        const {todos} = data;
                        if (!todos) {
                            return null;
                        }
                        return (
                            <div>
                                {todos.map((todo) => {
                                    return (
                                        <div className='card' key={todo.id}>
                                            <div className='card-body'>
                                                <h5 className='card-title'>
                                                    {todo.title} {todo.completed}
                                                </h5>
                                                user: {todo.user.name}
                                                <br />
                                                <button
                                                    className='button'
                                                    onClick={() => {
                                                        this.handleOpenEditTodo(todo);
                                                    }}>
                                                    Edit
                                                </button>
                                                <button
                                                    className='button'
                                                    onClick={() => {
                                                        this.handleOpenDeleteTodo(todo);
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

                {/*Edit todo Todo - NOT DONE YET */}
                {this.state &&
                this.state.showEditTodo && (
                    <EditTodo
                        isOpen={this.state.showEditTodo}
                        todo={this.state.editTodo}
                        handleClose={this.handleCloseTodos}
                    />
                )}

                {/*Add todo Todo */}
                {this.state &&
                this.state.showAddTodo && (
                    <AddTodo
                        isOpen={this.state.showAddTodo}
                        handleClose={this.handleCloseTodos}
                        Todo='addtodo'
                    />
                )}

                {/*Delete todo Todo */}
                {this.state &&
                this.state.showDeleteTodo && (
                    <DeleteTodo
                        isOpen={this.state.showDeleteTodo}
                        handleClose={this.handleCloseTodos}
                        deletetodo={this.state.deleteTodo}
                    />
                )}
            </div>
        );
    }
}

export default Todos;