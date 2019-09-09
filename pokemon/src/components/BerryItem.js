import React, { Component } from 'react';
import axios from 'axios';


class BerryItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false
      };
   }
   async componentWillMount() {
      await this.getBerry();
   }
   async getBerry() {
      this.setState({
         loading: true
      });
      try {
         const response = await axios.get(
            `https://pokeapi.co/api/v2/berry/${this.props.match.params.id}`
         );
         console.log(response);
         this.setState({
            data: response.data,
            loading: false
         });
      } catch (e) {
         this.setState(() => {
            return {
               error: "404 - Berry Not Found",
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
               <h1>Berry</h1>
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

         body = (
            <div>

               <h3 className="cap-first-letter">
                  {this.state.data && this.state.data.name}
               </h3>
               <p>
                  ID: {this.state.data.id}
                  <br />
                  Growth Time: {this.state.data.growth_time}
                  <br />
                  Size: {this.state.data.size}
                  <br />
               </p>
            </div>
         );
      }
      return body;
   }
}

export default BerryItem;