import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useState} from 'react';
import Voice from '@react-native-community/voice';
import PouchDB from 'pouchdb-react-native'


import SQLite from 'react-native-sqlite-2'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'
import {rdbaddress,dbaddress} from "../../database.js"



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
    const rdb = new PouchDB(rdbaddress);
    const db = new PouchDB(dbaddress, {adapter: 'react-native-sqlite'});
   
    
  

    this.addNote = this.addNote.bind(this);
    this.getAllNotes=this.getAllNotes.bind(this);
    Voice.onSpeechResults = res => {
      this.setState({
        noteText: res.value[0].toString(),
      });
    }
    this.state = {
      notearray: [],
      noteText: '',
    };
    
    const amount=this.getAllNotes();

    if (amount > 0) {
    } else {
      this.state = {
        notearray: [],
        noteText: '',
      };
      
    }
    
    

  
  }






  addNote = async () => {
    if(this.state.noteText)
    {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    let key =
      date + '' + month + '' + '' + year + '' + hours + '' + min + '' + sec;
      const rdb = new PouchDB(rdbaddress);
      const db = new PouchDB(dbaddress, {adapter: 'react-native-sqlite'});
     rdb.put({
        _id:key,
        note: this.state.noteText
      }).then(function (response) {
      }).catch(function (err) {
   });
    db.put({
      _id:key,
      note: this.state.noteText
    }).then(function (response) {
    }).catch(function (err) {
  alert(err) });
  

    if (this.state.noteText) {
      let val = {
        note: this.state.noteText,
        key: key,
      };
      this.state.notearray.push(val);
      this.setState({notearray: this.state.notearray});
      this.setState({noteText: ''});
    }
  }
  };








 //synchrnizing the database copying local changes to server when the user comes online
 //we can click on the sync button to make it happen
  synchroniseDB=()=>{
    const rdb = new PouchDB(rdbaddress);
    const db = new PouchDB(dbaddress, {adapter: 'react-native-sqlite'});
   
    db.replicate.to(rdb, {
      live: true,
      retry: true
    }).on('change', function (info) {
    }).on('paused', function (err) {
    }).on('active', function () {
    }).on('denied', function (err) {
    }).on('complete', function (info) {
    }).on('error', function (err) {
    });


  }





//getting all the notes from local database
  getAllNotes=()=>
  {  const rdb = new PouchDB(rdbaddress);
    const db = new PouchDB(dbaddress, {adapter: 'react-native-sqlite'});
     let arr=[]

     
     let amount=0;
     db.allDocs({include_docs: true}, (err, docs)=> {
      if (err) {
         return console.log(err);
      } else {
         for(let i=0;i<docs.total_rows;i++)
         {
           arr.push({note:docs.rows[i].doc.note,key:docs.rows[i].doc._id});
         }
         this.setState({
          notearray:arr,
          noteText:''
        })
       
      }
   });

   
    


    return amount

  }



  // getAllKeys = async () => {

  //   let keys = [];
  //   try {
  //     keys = await AsyncStorage.getAllKeys();
  //   } catch (e) {
  //     alert('get key error');
  //   }
  //   let arr = [];
  //   try {
  //     for (let i = 0; i < keys.length; i++) {
  //       let keyval = await AsyncStorage.getItem(keys[i]);
  //       arr.push({note: keyval, key: keys[i]});
  //     }
  //     this.setState({
  //       notearray: arr,
  //       noteText: '',
  //     });
  //   } catch (e) {}
  // };
//deletion from local as well as remote database
  deleteNote = key => {
    const rdb = new PouchDB(rdbaddress);
    const db = new PouchDB(dbaddress, {adapter: 'react-native-sqlite'});
    let index = 0;
    for (let i = 0; i < this.state.notearray.length; i++) {
      if (key == this.state.notearray[i].key) {
        index = i;
        break;
      }
    }
    this.state.notearray.splice(index, 1);
    this.setState({notearray: this.state.notearray});
   

    rdb.get(key).then(function (doc) {
      rdb.remove(doc)
    }).catch(function (err) {
    });
    
    db.get(key).then(function (doc) {
      db.remove(doc)
    }).catch(function (err) {
      console.log(err);
    });


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
      <TouchableOpacity onPress={() => this.synchroniseDB()} style={styles.syncbutton}>
            <Icon
              name="sync"
              color="white"
              iconStyle={styles.addbtncircle}
            />
          </TouchableOpacity>
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

  syncbutton:{
    alignSelf:'flex-end',
    marginVertical:10,

  }
});
