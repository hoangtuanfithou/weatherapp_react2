'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

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
  }
});

class SearchResults extends Component {
   
  constructor(props) {
    super(props);
    // var dataSource = new ListView.DataSource(
    //   {rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url});
    // this.state = {
    //   dataSource: dataSource.cloneWithRows(this.props.listings)
    // };
    this.state = {
      observation_time: this.props.weather
    };
  }
 
  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
          underlayColor='#dddddd'>
        <View>
          {/*<Text>{rowData.title}</Text>*/}
          <Text> Test Text </Text>
        </View>
      </TouchableHighlight>
    );
  }
 
  render() {
    return (
      /*<ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>*/
        <View style = {styles.container}>  
          <Text style = {styles.description}>
            Temperature: {this.props.weather.temp_C} C
         </Text>
         <Text style = {styles.description}>
            Weather description: {this.props.weather.weatherDesc[0].value}
         </Text>
        </View>
    );
  }
 
}

module.exports = SearchResults;
