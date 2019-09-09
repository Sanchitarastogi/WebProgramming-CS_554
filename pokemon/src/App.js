import React, { Component } from 'react';
import logo from '../src/img/logo.svg';
import './App.css';
import PokemonListContainer from './components/PokemonListContainer';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Pokedex</h1>
                  
               </header>
               <br />
               <br />
               <div className="App-body">
               <p>
                  For this lab I have to create pokemon, berries, machines. I don't have any idea what they really are.
               </p>
               <p>Welcome to Pokemon example</p>
               <Link className="showlink" to="/pokemon/page/0">
                     Pokemon
                  </Link>
                  <Link className="showlink" to="/berries/page/0">
                     Berries
                  </Link>
                  <Link className="showlink" to="/machines/page/0">
                     Machines
                  </Link>
              <switch>
                  <Route path="/pokemon/" component={PokemonListContainer} />
                  {/* <Route path="/pokemon/" component={PokemonListContainer} />
                  <Route path="/pokemon/" component={PokemonListContainer} /> */}
               </switch>
               </div>
            </div>

         </Router>
      );
   }
}

export default App;