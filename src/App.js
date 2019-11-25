import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'; 
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}></Route>    
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>
      </Switch>    
    );

    if (this.props.isAthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}></Route>
          <Route path="/orders" component={asyncOrders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/auth" component={asyncAuth}></Route>  
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      )
    }
    return (
      <div> 
        <Layout>                    
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAthenticated: state.auth.token !== null
  };
};

const mapDispathToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispathToProps)(App));
