var React = require('react')
var ReactNative = require('react-native')
var SearchPage = require('./SearchPage')

class Project extends React.Component {
  render() {
        return (
          <ReactNative.NavigatorIOS style={styles.container}
            initialRoute = {
                {
                  title: 'Weather Search',
                  component: SearchPage,
                }
            }/>
        );
      }
}

var styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});

ReactNative.AppRegistry.registerComponent('Project', () => Project);
