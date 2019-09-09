import React, { Component } from 'react';
import axios from 'axios';


class MachineItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false
      };
   }
   async componentWillMount() {
      await this.getMachine();
   }
   async getMachine() {
      this.setState({
         loading: true
      });
      try {
         const response = await axios.get(
            `https://pokeapi.co/api/v2/machine/${this.props.match.params.id}`
         );
         console.log(response);
         this.setState({
            data: response.data,
            loading: false
         });
      } catch (e) {
         this.setState(() => {
            return {
               error: "404 - Machine Not Found",
               loading: false
            }
         })
      }
   }

   render() {
      let body = null;
      if (this.state.loading) {
         body = (
            <div>
               <h1>Machine</h1>
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
              <br />
               <br />
               <h1 className="cap-first-letter">
                  Machine ID: {this.state.data.id}
               </h1>
               <br />
             
               <p>
                  ID: {this.state.data.id}
                  <br />
                  Item: {this.state.data.item.name}
                  <br />
                  Move: {this.state.data.move && this.state.data.move.name}
                  <br />
                  Version Group: {this.state.data.version_group && this.state.data.version_group.name}
               </p>
            </div>
         );
      }
      return body;
   }
}

export default MachineItem;