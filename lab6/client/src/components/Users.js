import React, {Component} from 'react';
//Import Query from react-apollo
import {Query} from 'react-apollo';

//Import the Todos for Adding and Updating Employee
import AddTodo from './Todos/AddTodos';

//Import the file where my query constants are defined
import queries from '../queries';

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddTodo: false
        };
       
        this.handleOpenAddTodo = this.handleOpenAddTodo.bind(this);
        this.handleCloseTodos = this.handleCloseTodos.bind(this);
    }

    handleCloseTodos() {
        this.setState({showAddTodo: false});
    }

    handleOpenAddTodo() {
        this.setState({showAddTodo: true});
    }

    render() {
        return (
            <div>
                <button className='button' onClick={this.handleOpenAddTodo}>
                    Create User
                </button>
                <br />
                <br />
                <Query query={queries.GET_USERS_WITH_TODOS} fetchPolicy={'cache-and-network'}>
                    {({data}) => {
                        const {users} = data;
                        if (!users) {
                            return null;
                        }
                        return (
                            <div>
                                {users.map((user) => {
                                    return (
                                        <div className='card' key={user.id}>
                                            <div className='card-body'>
                                                <h5 className='card-title'>{user.name}</h5>

                                                <span>Number of Todos:</span> {user.numOfTodos}
                                                <br />
                                                <br />
                                                <span>Todos:</span>
                                                <br />
                                                <ol>
                                                    {user.todos.map((todo) => {
                                                        return (
                                                            <li key={todo.id}>
                                                                {todo.title} {todo.completed}
                                                            </li>
                                                        );
                                                    })}
                                                </ol>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }}
                </Query>

                {/*Add Employer Todo */}
                {this.state &&
                this.state.showAddTodo && (
                    <AddTodo
                        isOpen={this.state.showAddTodo}
                        handleClose={this.handleCloseTodos}
                        Todo='addUser'
                    />
                )}
            </div>
        );
    }
}

export default Users;
