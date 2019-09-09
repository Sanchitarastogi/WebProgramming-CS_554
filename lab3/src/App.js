import React, { Component } from 'react';
import logo from '../src/img/logo.svg';
import './App.css';
import Common from './components/Common'
import PokemonListContainer from './components/PokemonListContainer';
import BerryListContainer from './components/BerryListContainer';
import MachineListContainer from './components/MachineListContainer';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Pokedex</h1>
               <div>
               <Link className="showlink" to="/pokemon/page/0" >
                     Pokemon
                  </Link>
             
   
                  <Link className="showlink" to="/berries/page/0">
                     Berries
                  </Link>
              
                 
                  <Link className="showlink" to="/machines/page/0">
                     Machines
                  </Link>
                  </div>   
               </header>
               <br />
               <br />
               <div className="App-body">
              
               
        
              
                  <Route path="/" exact component={Common} />
                  <Route path="/pokemon/" component={PokemonListContainer} />
                  <Route path="/berries/" component={BerryListContainer} />
                  <Route path="/machines/" component={MachineListContainer} />
             
               </div>
            </div>

         </Router>
      );
   }
}

export default App;