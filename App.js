import React, {Component} from 'react';
import Main from './app/components/Main';
import Newnote from './app/components/Newnote';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Main}
            options={{title: 'Notes'}}
          />

          <Stack.Screen
            name="Newnote"
            component={Newnote}
            options={{title: 'Expanded View'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
