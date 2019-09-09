import React, { Component } from 'react';
import axios from 'axios';
import noImage from '../img/download.jpeg';

class PokemonItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false
      };
   }
   async componentWillMount() {
      await this.getPokemon();
   }
   async getPokemon() {
      this.setState({
         loading: true
      });
      try {
         const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`
         );
         console.log(response);
         this.setState({
            data: response.data,
            loading: false
         });
      } catch (e) {
         this.setState(() => {
            return {
               error: "404 - Pokemon Not Found",
               Loading: false
            }
         })
      }
   }

   render() {
      let body = null;
      if (this.state.loading) {
         body = (
            <div>
               <h1>Pokemon</h1>
               <br />
               Loading...
          </div>
         );
      } else if (this.state.error) {
         body = (
            <div>
               <h1>{this.state.error}</h1>
            </div>
         );
      }
      else {
         let img = null;
         if (this.state.data.sprites.front_default) {
            img = <img alt="Pokemon" height="150" width="150"
               src={this.state.data.sprites.front_default} />;
         }
         else {
            img = <img alt="Pokemon" height="150" width="150" src={noImage} />;
         }
         body = (
            <div>
               {img}
               <br />
               <br />
               <h3 className="cap-first-letter">
                  {this.state.data && this.state.data.name}
               </h3>
               <p>
                  ID: {this.state.data.id}
                  <br />
                  Height: {this.state.data.height}
                  <br />
                  Weight: {this.state.data.weight}
                  <br />
               </p>
            </div>
         );
      }
      return body;
   }
}

export default PokemonItem;