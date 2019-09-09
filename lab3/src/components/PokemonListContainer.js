import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PokemonList from './PokemonList';
import PokemonItem from './PokemonItem';

class PokemonListContainer extends Component {
   render() {
      return (
         <div >
            <Switch>
               <Route path="/pokemon/page/:page" exact component={PokemonList} />
               <Route path="/pokemon/:id" exact component={PokemonItem} />
            </Switch>
         </div>
      );
   }
}

export default PokemonListContainer;