/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

var SearchPage = require('./SearchPage');
var SearchResults = require('./SearchResults');

class Project extends Component {
  render() {
    return (
        <Navigator
          initialRoute={{id: 'SearchPage', name: 'Weather Search'}}
          renderScene={this.renderScene.bind(this)}
            navigationBar={
              <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                  routeMapper={NavigationBarRouteMapper} />
            } />
      );
  }
  
   renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'SearchPage') {
     return (
        <SearchPage navigator = {navigator} />
      );
    }
    if (routeId === 'SearchResults') {
      return (
        <SearchResults navigator = {navigator} data={route.data}/>
      );
    }
  }

}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          Weather Search
        </Text>
      </TouchableOpacity>
    );
  }
};

AppRegistry.registerComponent('Project', () => Project);
