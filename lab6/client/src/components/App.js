import React, {Component} from 'react';
import {NavLink, BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import Todos from './Todos';
import Users from './Users';
import "./App.css";
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <header className='App-header'>
                        <h1 className='App-title'>React/ Todo application</h1>
                        <nav>
                            <NavLink className='navlink' to='/'>
                                Home
                            </NavLink>
                            <NavLink className='navlink' to='/todos'>
                                Todos
                            </NavLink>

                            <NavLink className='navlink' to='/users'>
                                Users
                            </NavLink>
                        </nav>
                    </header>
                    <Route exact path='/' component={Home} />
                    <Route path='/todos/' component={Todos} />
                    <Route path='/users/' component={Users} />
                </div>
            </Router>
        );
    }
}

export default App;