import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useState} from 'react';
import Voice from '@react-native-community/voice';

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
import Note from './Note';
export default class Main extends Component {
  constructor(props) {
    super(props);
    // Voice.onSpeechStart = this.onSpeechStart.bind(this);
    // Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    // Voice.onSpeechResults = this.onSpeechResults.bind(this);
    // Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechResults = res => {
      this.setState({
        noteText: res.value[0].toString(),
      });
    };

    this.addNote = this.addNote.bind(this);
    let keys_vals = [];
    keys_vals = this.getAllKeys();

    if (keys_vals.length > 0) {
    } else {
      this.state = {
        notearray: [],
        noteText: '',
      };
    }
  }
  voicenotes = async () => {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('en-US');

      const speechtxt = this.state.results.toString();
      this.setState({
        noteText: speechtxt,
      });
    } catch (e) {
      console.error(e);
    }
  };

  addNote = async () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    let key =
      date + '' + month + '' + '' + year + '' + hours + '' + min + '' + sec;

    if (this.state.noteText) {
      let val = {
        note: this.state.noteText,
        key: key,
      };
      this.state.notearray.push(val);
      this.setState({notearray: this.state.notearray});
      this.setState({noteText: ''});
    }

    try {
      await AsyncStorage.setItem(key, this.state.noteText);
    } catch (e) {
      alert('add error');
    }
  };

  getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      alert('get key error');
    }
    let arr = [];
    try {
      for (let i = 0; i < keys.length; i++) {
        let keyval = await AsyncStorage.getItem(keys[i]);
        arr.push({note: keyval, key: keys[i]});
      }
      this.setState({
        notearray: arr,
        noteText: '',
      });
    } catch (e) {}
  };

  deleteNote = async key => {
    let index = 0;
    for (let i = 0; i < this.state.notearray.length; i++) {
      if (key == this.state.notearray[i].key) {
        index = i;
        break;
      }
    }
    this.state.notearray.splice(index, 1);
    this.setState({notearray: this.state.notearray});
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }
  };

  render() {
    let notes = this.state.notearray.map(val => {
      return (
        <Note
          key={val.key}
          keyval={val.key}
          val={val}
          deletemethod={() => this.deleteNote(val.key)}
          dataFromParent={this.props.navigation}
        />
      );
    });
    return (
      <View style={styles.container}>
        <View style={styles.scrollcontainer}>
          <ScrollView style={styles.scrollview}>{notes}</ScrollView>
        </View>
        <View style={styles.addnotes}>
          <View style={styles.inputnotes}>
            <TouchableOpacity onPress={() => Voice.start('en-US')}>
              <Icon name="mic" color="white" iconStyle={styles.addbtncircle} />
            </TouchableOpacity>
            <TextInput
              defaultValue=""
              onChangeText={noteText => this.setState({noteText: noteText})}
              value={this.state.noteText}
              style={styles.textinput}
            />
          </View>

          <TouchableOpacity onPress={() => this.addNote()}>
            <Icon
              name="add-circle"
              color="white"
              iconStyle={styles.addbtncircle}
            />
          </TouchableOpacity>
          <View />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addnotes: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  btntxt: {
    fontSize: 60,
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertext: {
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white',
  },

  inputnotes: {
    flexDirection: 'row',
  },
  textinput: {
    flex: 3,
    marginHorizontal: 20,
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 20,
    borderColor: 'black',
  },

  addbtncircle: {
    alignSelf: 'stretch',
    fontSize: 50,
    alignItems: 'center',
    color: 'black',
  },

  scrollcontainer: {
    flex: 6,
  },
  scrollview: {
    backgroundColor: 'white',
    marginVertical: 20,
    borderRadius: 20,
  },
  buttoncontainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
});
