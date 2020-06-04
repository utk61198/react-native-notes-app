import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ColorPropType,
} from 'react-native';
import React, {Component} from 'react';
import Main from './Main';
import Note from './Note';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
export default class Newnote extends Component {
  constructor({route, navigation}) {
    super();
    this.note = route.params.note;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.note}>
          <ScrollView>
            <Text style={styles.textinput}>{this.note}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    color: 'black',
    fontSize: 30,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  note: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 50,
    backgroundColor: 'yellow',
    borderRadius: 20,
  },
});
