import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class PokemonList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false,
      };
   }

  
   async getPokemon() {
      try {
      this.setState(() => {
         return {
            loading: true
         }
      })
         if (this.props.match.params.page === "0") {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20");
            this.setState({ pokemon: response.data });
            console.log(response.data);
         }
         else {

            let myoffset = parseInt(this.props.match.params.page) * 20;
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + myoffset);
            this.setState({ pokemon: response.data });
         }
      }catch (e) {
         console.log(e);
      }
   }


   componentDidMount() {
      this.getPokemon();

   }

   onSubmit(e) {
      e.preventDefault();
   }

   render() {

      let body = null;
      let li = null;
      if (this.state.pokemon) {
         let currPage = parseInt(this.props.match.params.page);
         console.log(currPage);
         let limit = Math.ceil(this.state.pokemon.count/20);
         if (currPage < 0 || currPage > limit) {
            body = (<div>
               <h1> 404 - Pokemon List not found</h1>
            </div>
            )
         }
         else {
            li =
               this.state.pokemon &&
               this.state.pokemon.results.map(pokemon => (
                  <li key={pokemon.url}>
                     <Link to={`/pokemon/${pokemon.url.split('/')[6]}`}>{pokemon.name}</Link>
                  </li>
               ));

            body = (
               <div>
                  <ul className="list-unstyled"> {li}</ul>

               </div>

            );
         }
      }

      else {
         body = null;
      }

      return body;
   }


}

export default PokemonList;

