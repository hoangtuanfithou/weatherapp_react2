'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Navigator,
  TouchableOpacity
} from 'react-native'

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
  image: {
    width: 100,
    height: 100
  }
});

class SearchResults extends Component {

  renderScene(route, navigator) {
    return (
        <View style = {styles.container}>  
        <Image 
          style={styles.image}
          resizeMode={"contain"}
          source={{uri:this.props.data.weather.weatherIconUrl[0].value}}/>
        
          <Text style = {styles.description}>
            Temperature: {this.props.data.weather.temp_C} °C
         </Text>
         <Text style = {styles.description}>
            Weather description: {this.props.data.weather.weatherDesc[0].value}
         </Text>

        </View>
    );
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

}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          Back
        </Text>
      </TouchableOpacity>
    );
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

module.exports = SearchResults;
