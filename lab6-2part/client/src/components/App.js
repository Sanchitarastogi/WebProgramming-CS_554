import React, {Component} from 'react';
import {NavLink, BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import Quotes from './Quotes';
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <header className='App-header'>
                        <h1 className='App-title'>Chuck Norris Application</h1>
                        <nav>
                            <NavLink className='navlink' to='/'>
                                Home
                            </NavLink>
                            <NavLink className='navlink' to='/quotes'>
                                Quotes
                                </NavLink>
                        </nav>
                    </header>
                    <Route exact path='/' component={Home} />
                    <Route path='/quotes' component={Quotes} />
                   
                </div>
            </Router>
        );
    }
}

export default App;