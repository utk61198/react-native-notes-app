import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import Tts from 'react-native-tts';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

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
} from 'react-native';

export default class Note extends Component {
  constructor() {
    super();
    this.state = {
      clicked: 0,
      iname: 'star-border',
    };
    this.speak = this.speak.bind(this);
    this.markimp = this.markimp.bind(this);
  }
  speak() {
    Tts.speak(this.props.val.note);
  }
  markimp() {
    if (this.state.clicked == 0)
      this.setState({
        clicked: 1,
        iname: 'star',
      });
    else {
      this.setState({
        clicked: 0,
        iname: 'star-border',
      });
    }
  }
  render() {
    return (
      <View
        key={this.props.keyval}
        style={this.state.clicked ? styles2.note : styles.note}>
        <TouchableOpacity style={styles.delbtn} onPress={this.markimp}>
          <Icon name={this.state.iname} color="green" />
        </TouchableOpacity>
        <Text style={styles.notetext}>{this.props.val.note}</Text>
        <TouchableOpacity
          onPress={this.props.deletemethod}
          style={styles.delbtn}>
          <Icon name="delete" color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.speak} style={styles.delbtn}>
          <Icon name="record-voice-over" color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.dataFromParent.navigate('Newnote', {
              note: this.props.val.note,
            })
          }
          style={styles.delbtn}
          dataFromParent={this.props.val.note}>
          <Icon name="zoom-out-map" color="blue" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    padding: 10,
    backgroundColor: 'lightyellow',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    height: 50,

    flexDirection: 'row',
  },
  delbtn: {
    flex: 1,
  },

  notetext: {
    flex: 4,
    fontSize: 20,
  },
  iconStyle: {},
});

const styles2 = StyleSheet.create({
  note: {
    padding: 10,
    backgroundColor: 'yellow',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,

    flexDirection: 'row',
    height: 50,
  },
  delbtn: {
    flex: 1,
  },

  notetext: {
    flex: 4,
    fontSize: 20,
  },
});
