import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './app/components/Main';
const AppNavigator = createStackNavigator({
  Home: {screen: Main},
});
