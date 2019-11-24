import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import App from './App';
import ProductPage from './Product';
import CheckOut from './checkout';
import FrontPage from './FrontPage';


class MainRouter extends Component {
  render() {
    return (
    <BrowserRouter>
        <Switch>
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/checkout" component={CheckOut} />
          <Route path="/" component={FrontPage} />
        </Switch>
    </BrowserRouter>
    )
  }
}
export default MainRouter;
