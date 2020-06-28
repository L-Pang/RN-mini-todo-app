import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen'
import AddToDoScreen from '../screens/AddTodoScreen'
import Landing from '../screens/Landing'
import Splash from '../screens/Splash'

const StackNav = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    AddTodo: {
        screen: AddToDoScreen,
        navigationOptions: { title: 'Add New Todo' }
    }
}, {
    mode: 'modal',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#7576d9',
            height: 100
        },
        headerTintColor: '#ffffff',
        headerTitleContainerStyle: {
            paddingBottom: 1,
        },
        cardStyle: {
            backgroundColor: '#ffffff'
        }
    },

})

const SwitchNavigator = createSwitchNavigator({
    Main: StackNav,
    Landing,
    Splash
}, {
    initialRouteName: 'Splash',
}, );

export default createAppContainer(SwitchNavigator)