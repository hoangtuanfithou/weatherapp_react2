'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  ActivityIndicatorIOS,
  Navigator,
  TouchableOpacity
} from 'react-native';

var SearchResults = require('./SearchResults');

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 100,
    height: 100
  }
});

function urlForQueryAndPage(query) {
  var data = {
      key: 'vzkjnx2j5f88vyn5dhvvqkzc',
      fx: '1',
      format: 'json'
  };
  data['q'] = query;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://api.worldweatheronline.com/free/v1/weather.ashx?' + querystring;
};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'Hanoi',
      isLoading: false,
      message: ''
    };
  }

  onSearchTextChanged(event) {
    console.log('onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  }

  _executeQuery(query) {
    console.log(query);
    this.setState({ isLoading: true });

    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error =>
       this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
     }));
  }

  _handleResponse(json) {
    this.setState({ isLoading: false , message: '' });
    if (!json.data.error) {
      this.props.navigator.push({
        id: 'SearchResults',
        title: this.state.searchString,
        component: SearchResults,
        data: {weather: json.data.current_condition[0]},
        passProps: {data: {weather: json.data.current_condition[0]}}
      });
    } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  }

  onSearchPressed() {
    var query = urlForQueryAndPage(this.state.searchString);
    console.log('SearchPage.render ' + query);
    this._executeQuery(query);
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }

  renderScene(route, navigator) {
    console.log('SearchPage.render');

    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
         animating={true}
         size={ 'large' }
         color={ 'black' }
       />) :
      ( <View/>);
   
    return (
      <View style={styles.container}>

        {/*Label title*/}
        <Text style={styles.description}>
          Search weather by city name!
        </Text>

        {/*Search input view*/}
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Search via city name'/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'>
            <Text
              style={styles.buttonText}
              onPress={this.onSearchPressed.bind(this)}>
              Go
            </Text>
          </TouchableHighlight>
        </View>

        <Image source={require('./Resources/weather.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
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
    return null;
  }
};

module.exports = SearchPage;
