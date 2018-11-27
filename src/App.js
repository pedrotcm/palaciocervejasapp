import React from "react";
import { Root, StatusBar } from "native-base";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import Home from "./screens/home";
import Login from "./screens/login";
import Register from "./screens/register";
import SideBar from "./screens/sidebar";
import Categories from "./screens/category";
import Category from "./screens/category/category";
import Products from "./screens/product";
import Product from "./screens/product/product";
import Order from "./screens/order";
import Report from "./screens/report";

import { Provider, connect } from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './store/modules';


const DrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login },
    Register: { screen: Register },
    Categories: { screen: Categories },
    Products: { screen: Products },
    Order: { screen: Order },
    Report: { screen: Report }
  },
  {

    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#DEB704"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: DrawerNavigator },
    Category: { screen: Category },
    Product: { screen: Product }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const navReducer = createNavigationReducer(AppNavigator);
const drawerReducer = createNavigationReducer(DrawerNavigator);
const appReducers = combineReducers({
  ...reducers, nav: navReducer, drawer: drawerReducer
});



// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const reduxMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => { state.nav, state.drawer }
);
const middleware = [thunk, reduxMiddleware]

const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
  appReducers,
  applyMiddleware(...middleware),
);

export default () =>
  <Root>
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  </Root>
