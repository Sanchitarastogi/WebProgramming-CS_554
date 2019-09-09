import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BerryList from './BerryList';
import BerryItem from './BerryItem';

class BerryListContainer extends Component {
   render() {
      return (
         <div>
            <Switch>
               <Route path="/berries/page/0" exact component={BerryList} />
               <Route path="/berries/:id" exact component={BerryItem} />
            </Switch>
         </div>
      );
   }
}

export default BerryListContainer;