import gql from 'graphql-tag';

const GET_TODOS = gql`
    query {
        todos {
            id
            title
            completed
            user {
                name
                id
                email
                department
                country
            }
        }
    }
`;

const GET_USERS = gql`
    query {
        users {
            name
            id
            email
            department
            country
        }
    }
`;

const GET_USERS_WITH_TODOS = gql`
    query {
        users {
            id
            name
            email
            department
            country
            numOfTodos
            todos {
                id
                title
                completed
            }
        }
    }
`;

const ADD_TODO = gql`
    mutation createTodo(
        $title: String!, 
        $completed: Boolean!, 
        $userId: Int!) {
        addTodo(
            title: $title, 
            completed: $completed, 
            userId: $userId) {
            id
            title
            completed
            user {
                id
                name
                email
                department
                country
            }
        }
    }
`;

const ADD_USER = gql`
    mutation createUser($name: String!) {
        addUser(name: $name, email:  $email, department: $department, country: $country) {
            id
            name
            email
            department
            country
            numOfTodos
            todos {
                id
                title
                completed
            }
        }
    }
`;

const DELETE_TODO = gql`
    mutation deleteTodo($id: String!) {
        removeTodo(id: $id) {
            id
            title
            completed
            user {
                name
                id
                email
                department
                country
            }
        }
    }
`;

const EDIT_TODO = gql`
    mutation changeTodo($id: String!, $title: String, $completed: Boolean, $userId: Int) {
        editTodo(id: $id, userId: $userId, title: $title, completed: $completed) {
            id
            title
            completed
            user {
                id
                name
                email
                department
                country
            }
        }
    }
`;

export default {
    ADD_TODO,
    GET_TODOS,
    GET_USERS,
    DELETE_TODO,
    GET_USERS_WITH_TODOS,
    ADD_USER,
    EDIT_TODO
};