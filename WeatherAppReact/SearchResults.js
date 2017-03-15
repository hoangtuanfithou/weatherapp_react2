'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
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

  render() {
    return (
        <View style = {styles.container}>  
        <Image 
          style={styles.image}
          resizeMode={"contain"}
          source={{uri:this.props.weather.weatherIconUrl[0].value}}/>
        
          <Text style = {styles.description}>
            Temperature: {this.props.weather.temp_C} °C
         </Text>
         <Text style = {styles.description}>
            Weather description: {this.props.weather.weatherDesc[0].value}
         </Text>
        </View>
    );
  }
 
}

module.exports = SearchResults;
