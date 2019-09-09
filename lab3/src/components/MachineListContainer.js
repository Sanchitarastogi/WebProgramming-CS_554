import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MachineList from './MachineList';
import MachineItem from './MachineItem';

class BerryListContainer extends Component {
   render() {
      return (
         <div>
            <Switch>
               <Route path="/machines/page/:page" exact component={MachineList} />
               <Route path="/machines/:id" exact component={MachineItem} />
            </Switch>
         </div>
      );
   }
}

export default BerryListContainer;