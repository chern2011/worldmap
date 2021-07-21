import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
/* import { PLACES } from '../shared/places'; */
import PlaceInfo from './PlaceInfoComponent';
import Constants from 'expo-constants';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';


const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        PlaceInfo: { screen: PlaceInfo }
    }, 
    {
        initialRouteName: 'Directory',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

const AppNavigator = createAppContainer(MainNavigator)

class Main extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}>
                <AppNavigator />
            </View>
        );
    }
}

export default Main;



/*
const AppNavigator = createAppContainer(DirectoryNavigator);

class Main extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}>
                <AppNavigator />
            </View>
        );
    }
}

export default Main;
*/


/*class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: PLACES,
            selectedPlace: null
        };
    }

    onPlaceSelect(placeId) {
        this.setState({selectedPlace: placeId});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Directory
                    places={this.state.places}
                    onPress={placeId => this.onPlaceSelect(placeId)}
                />
                <Placeinfo
                    place={this.state.places.filter(
                        place => place.id === this.state.selectedPlace)[0]}
                />
            </View>
    }
}

export default Main; */