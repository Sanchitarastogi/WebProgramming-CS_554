import React, {Component} from 'react';
//Import Query from react-apollo
import {Query, Mutation} from 'react-apollo';
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

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddTodo: this.props.isOpen
        };
        this.handleOpenAddTodo = this.handleOpenAddTodo.bind(this);
        this.handleCloseAddTodo = this.handleCloseAddTodo.bind(this);
    }

    handleOpenAddTodo() {
        this.setState({showAddTodo: true});
    }

    handleCloseAddTodo() {
        this.setState({showAddTodo: false});
        this.props.handleClose(false);
    }
    render() {
        let body;
        //check which add Todo they are trying to get to and then render the form, mutation/query accordingly
        //if Add Employee
        if (this.props.Todo === 'addtodo') {
            let title;
            let completed;
            let userId;
            body = (
                <Mutation
                    mutation={queries.ADD_TODO}
                    update={(cache, {data: {addTodo}}) => {
                        const {todos} = cache.readQuery({query: queries.GET_TODOS});
                        cache.writeQuery({
                            query: queries.GET_TODOS,
                            data: {todos: todos.concat([addTodo])}
                        });
                    }}>
                    {(addTodo, {data}) => (
                        <form
                            className='form'
                            id='add-todo'
                            onSubmit={(e) => {
                                e.preventDefault();
                                var compval = completed.value==="true"?true:false;
                                addTodo({
                                    variables: {
                                        title: title.value,
                                        completed: compval,
                                        userId: parseInt(userId.value)
                                    }
                                });
                                title.value = '';
                                completed.value = '';
                                userId.value = '1';
                                this.setState({showAddTodo: false});
                                alert('Todo Added');
                                this.props.handleClose();
                            }}>
                            <div className='form-group'>
                                <label>
                                    Title:
                                    <br />
                                    <input
                                        ref={(node) => {
                                            title = node;
                                        }}
                                        required
                                        autoFocus={true}
                                    />
                                </label>
                            </div>
                            <br />
                            <div className='form-group'>
                                <label>
                                    Completed:false
                                    <br />
                                    {/* <input
                                        ref={(node) => {
                                            completed = node;
                                        }}
                                        required
                                    /> */}
                                </label>
                            </div>
                            <br />

                            <Query query={queries.GET_USERS}>
                                {({data}) => {
                                    const {users} = data;
                                    if (!users) {
                                        return null;
                                    }
                                    return (
                                        <div className='form-group'>
                                            <label>
                                                User:
                                                <select
                                                    className='form-control'
                                                    ref={(node) => {
                                                        userId = node;
                                                    }}>
                                                    {users.map((user) => {
                                                        debugger;
                                                        return (
                                                            <option key={user.id} value={user.id}>
                                                                {user.name}
                                                                
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </label>
                                        </div>
                                    );
                                }}
                            </Query>
                            <br />
                            <br />
                            <button className='button add-button' type='submit'>
                                Add Todo
                            </button>
                        </form>
                    )}
                </Mutation>
            );
            //If add Employer
        } else if (this.props.Todo === 'addUser') {
            let name;
            let email;
            let department;
            let country;
            body = (
                <Mutation
                    mutation={queries.ADD_USER}
                    update={(cache, {data: {addUser}}) => {
                        const {users} = cache.readQuery({query: queries.GET_USERS_WITH_TODOS});
                        cache.writeQuery({
                            query: queries.GET_USERS_WITH_TODOS,
                            data: {users: users.concat([addUser])}
                        });
                    }}>
                    {(addUser, {data}) => (
                        <form
                            className='form'
                            id='add-User'
                            onSubmit={(e) => {
                                e.preventDefault();
                                addUser({
                                    variables: {
                                        name: name.value,
                                        email: email.value,
                                        department: department.value,
                                        country: country.value
                                    
                                    }
                                });
                                name.value = '';
                                email.value = '';
                                department.value = '';
                                country.value = '';
                                this.setState({showAddTodo: false});
                                alert('User Added');
                                this.props.handleClose();
                            }}>
                            <div className='form-group'>
                                <label>
                                    User Name:
                                    <br />
                                    <input
                                        ref={(node) => {
                                            name = node;
                                        }}
                                        required
                                        autoFocus={true}
                                    />
                                </label>
                                
                            </div>
                            <br />

                            <br />
                            <br />
                            <button className='button add-button' type='submit'>
                                Add User
                            </button>
                        </form>
                    )}
                </Mutation>
            );
        }

        return (
            <div>
                <ReactModal
                    name='addTodo'
                    isOpen={this.state.showAddTodo}
                    contentLabel='Add Todo'
                    style={customStyles}>
                    {body}
                    <button className='button cancel-button' onClick={this.handleCloseAddTodo}>
                        Cancel
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default AddTodo;