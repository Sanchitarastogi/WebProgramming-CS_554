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

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class EditTodo extends Component {
    constructor(props) {
        //console.log(this.props.todo);
        super(props);

        this.state = {
            showEditTodo: this.props.isOpen,
            todo: this.props.todo
        };
        this.handleCloseEditTodo = this.handleCloseEditTodo.bind(this);
    }

    handleCloseEditTodo() {
        this.setState({showEditTodo: false, todo: null});
        this.props.handleClose();
    }

    render() {
        let title;
        let completed;
        let userId;
        return (
            <div>
                {/*Edit todo Todo - NOT DONE YET */}
                <ReactModal
                    name='editTodo'
                    isOpen={this.state.showEditTodo}
                    contentLabel='Edit todo'
                    style={customStyles}>
                    <Mutation mutation={queries.EDIT_TODO}>
                        {(editTodo, {data}) => (
                            <form
                                className='form'
                                id='add-todo'
                                onSubmit={(e) => {
                                    console.log(title.value);
                                    console.log(completed.value);
                                    console.log(parseInt(userId.value));
                                    e.preventDefault();
                                    var compval = completed.value==="true"?true:false;
                                    editTodo({
                                        variables: {
                                            id: this.props.todo.id,
                                            title: title.value,
                                            completed: compval,
                                            userId: parseInt(userId.value)
                                        }
                                    });
                                    title.value = '';
                                    completed.value = '';
                                    userId.value = '1';
                                    this.setState({showEditTodo: false});
                                    alert('Todo Updated');
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
                                            defaultValue={this.props.todo.title}
                                            autoFocus={true}
                                        />
                                    </label>
                                </div>
                                <br />
                                <div className='form-group'>
                                    <label>
                                        Completed:
                                        <br />
                                        <input
                                            ref={(node) => {
                                                completed = node;
                                            }}
                                            defaultValue={this.props.todo.completed}
                                        />
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
                                                    user:
                                                    <select
                                                        defaultValue={this.props.todo.user.id}
                                                        className='form-control'
                                                        ref={(node) => {
                                                            userId = node;
                                                        }}>
                                                        {users.map((user) => {
                                                            return (
                                                                <option key={user.id} value={user.id} selected={user.id}>
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
                                    Update todo
                                </button>
                            </form>
                        )}
                    </Mutation>
                    <button className='button cancel-button' onClick={this.handleCloseEditTodo}>
                        Cancel
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default EditTodo;