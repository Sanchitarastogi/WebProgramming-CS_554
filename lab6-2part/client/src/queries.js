import gql from 'graphql-tag';

const GET_QUOTES = gql`
    query {
        quotes {
            id
            quote
        }
    }
`;


const ADD_QUOTE = gql`
    mutation createQuote($quote: String! )
    {
        addQuote(quote: $quote) {
            id
            quote
        }
    }
`;


const DELETE_QUOTE = gql`
    mutation deleteQuote($id: String!) {
        removeQuote(id: $id) {
            id
            quote
        }
    }
`;

const EDIT_QUOTE = gql`
    mutation changeQuote($id: String!, $quote: String!) {
        editQuote(id: $id, quote: $quote) {
            id
            quote
        }
    }
`;

export default {
    ADD_QUOTE,
    GET_QUOTES,
    DELETE_QUOTE,
    EDIT_QUOTE
};