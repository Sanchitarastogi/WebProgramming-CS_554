import React, {Component} from 'react';


class Home extends Component {
    render() {
        return (
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'> React/Todo Application</h5>
                    <p className='cap-first-letter:first-letter'>
                        This is a demo of GraphQL using Apollo Server, Apollo Client and React
                    </p>
                    <p>
                        We are creating, updating and deleting todos
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;