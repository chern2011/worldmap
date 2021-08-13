import React, { Component } from 'react';
import Home from './HomeComponent';
// import Directory from './DirectoryComponent';
import ContinentInfo from './ContinentInfoComponent';
import AboutContact from './AboutContactComponent';
// import Contact from './ContactComponent';
import Constants from 'expo-constants';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';
import NetInfo from '@react-native-community/netinfo';
import Post from './PostComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image,
    Alert, ToastAndroid } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { fetchPlaces, fetchComments, fetchPromotions,
    fetchPartners } from '../redux/ActionCreators';
    import { createBottomTabNavigator } from 'react-navigation-tabs';
const mapDispatchToProps = {
    fetchPlaces,
    fetchComments,
    fetchPromotions,
    fetchPartners
};

const HomeNavigator = createBottomTabNavigator(
    {
        Home: { 
            screen: Home,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        ContinentInfo: { screen: ContinentInfo}
        },
        {
            initialRouteName: 'Home',
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

// const PostNavigator = createBottomTabNavigator(
//     {
//         Post: { 
//             screen: Post,
//             navigationOptions: ({navigation}) => ({
//                 headerLeft: <Icon
//                     name='list'
//                     type='font-awesome'
//                     iconStyle={styles.stackIcon}
//                     onPress={() => navigation.toggleDrawer()}
//                 />
//             })
//         },
//         ContinentInfo: { screen: ContinentInfo}
//     },
//     {
//         initialRouteName: 'Post',
//         defaultNavigationOptions: {
//             headerStyle: {
//                 backgroundColor: '#5637DD'
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//                 color: '#fff'
//             }
//         }
//     }
// );

// const HomeNavigator = createStackNavigator(
//     {
//         Home: { screen: Home }
//     },
//     {
//         defaultNavigationOptions: ({navigation}) => ({
//             headerStyle: {
//                 backgroundColor: '#5637DD'
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//                 color: '#fff'
//             },
//             headerLeft: <Icon
//                 name='home'
//                 type='font-awesome'
//                 iconStyle={styles.stackIcon}
//                 onPress={() => navigation.toggleDrawer()}
//             />
//         })
//     }
// );

// const AboutContactNavigator = createBottomTabNavigator(
//     {
//         AboutContact: { screen: AboutContact }
//     },
//     {
//         defaultNavigationOptions: ({navigation}) => ({
//             headerStyle: {
//                 backgroundColor: '#5637DD'
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//                 color: '#fff'
//             },
//             headerLeft: <Icon
//                 name='info-circle'
//                 type='font-awesome'
//                 iconStyle={styles.stackIcon}
//                 onPress={() => navigation.toggleDrawer()}
//             />
//         })
//     }
// );

// const ContactNavigator = createStackNavigator(
//     {
//         Contact: { screen: Contact }
//     },
//     {
//         defaultNavigationOptions: ({navigation}) => ({
//             headerStyle: {
//                 backgroundColor: '#5637DD'
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//                 color: '#fff'
//             },
//             headerLeft: <Icon
//                 name='address-card'
//                 type='font-awesome'
//                 iconStyle={styles.stackIcon}
//                 onPress={() => navigation.toggleDrawer()}
//             />
//         })
//     }
// );

// const ReservationNavigator = createStackNavigator(
//     {
//         Reservation: { screen: Reservation }
//     },
//     {
//         defaultNavigationOptions: ({navigation}) => ({
//             headerStyle: {
//                 backgroundColor: '#5637DD'
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//                 color: '#fff'
//             },
//             headerLeft: <Icon
//                 name='plane'
//                 type='font-awesome'
//                 iconStyle={styles.stackIcon}
//                 onPress={() => navigation.toggleDrawer()}
//             />
//         })
//     }
// );

const FavoritesNavigator = createBottomTabNavigator(
    {
        Favorites: { screen: Favorites }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='heart'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const LoginNavigator = createBottomTabNavigator(
    {
        Login: { screen: Login }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView 
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/WorldMap.jpg')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Travel the World</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createBottomTabNavigator(
    {
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
    Home: {
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        // Directory: {
        //     screen: DirectoryNavigator,
        //     navigationOptions: {
        //         drawerIcon: ({tintColor}) => (
        //             <Icon
        //                 name='list'
        //                 type='font-awesome'
        //                 size={24}
        //                 color={tintColor}
        //             />
        //         )
        //     }
        // },
        // Reservation: {
        //     screen: ReservationNavigator,
        //     navigationOptions: {
        //         drawerLabel: 'Reserve Flight',
        //         drawerIcon: ({tintColor}) => (
        //             <Icon
        //                 name='plane'
        //                 type='font-awesome'
        //                 size={24}
        //                 color={tintColor}
        //             />
        //         )
        //     }
        // },
        Favorites: {
            screen: FavoritesNavigator,
            navigationOptions: {
                drawerLabel: 'My Favorites',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='heart'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        // AboutContact: {
        //     screen: AboutContactNavigator,
        //     navigationOptions: {
        //         drawerLabel: 'About and Contact Us',
        //         drawerIcon: ({tintColor}) => (
        //             <Icon
        //                 name='info-circle'
        //                 type='font-awesome'
        //                 size={24}
        //                 color={tintColor}
        //             />
        //         )
        //     }
        // },
        // Post: {
        //     screen: PostNavigator,
        //     navigationOptions: {
        //         drawerLabel: 'Post Your Experience',
        //         drawerIcon: ({tintColor}) => (
        //             <Icon
        //                 name='camera'
        //                 type='font-awesome'
        //                 size={24}
        //                 color={tintColor}
        //             />
        //         )
        //     }
        // }
        // Contact: {
        //     screen: ContactNavigator,
        //     navigationOptions: {
        //         drawerLabel: 'Contact Us',
        //         drawerIcon: ({tintColor}) => (
        //             <Icon
        //                 name='address-card'
        //                 type='font-awesome'
        //                 size={24}
        //                 color={tintColor}
        //             />
        //         )
        //     }
        // }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#5637DD',
            inactiveBackgroundColor: '#CEC8FF',
            activeTintColor: '#fff',
            inactiveTintColor: '#808080',
            labelStyle: {fontSize: 16}
        }
    },
    {
        initialRouteName: 'Home',
        drawerBackgroundColor: '#00bfff',
        contentComponent: CustomDrawerContentComponent
    }
);


const AppNavigator = createAppContainer(MainNavigator)

class Main extends Component {

    componentDidMount() {
        this.props.fetchPlaces();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();

        NetInfo.fetch().then(connectionInfo => {
            (Platform.OS === 'ios')
                ? Alert.alert('Initial Network Connectivity Type:', connectionInfo.type)
                : ToastAndroid.show('Initial Network Connectivity Type: ' +
                    connectionInfo.type, ToastAndroid.LONG);
        });

        this.unsubscribeNetInfo = NetInfo.addEventListener(connectionInfo => {
            this.handleConnectivityChange(connectionInfo);
        });
    }

    componentWillUnmount() {
        this.unsubscribeNetInfo();
    }
    
    handleConnectivityChange = connectionInfo => {
        let connectionMsg = 'You are now connected to an active network.';
        switch (connectionInfo.type) {
            case 'none':
                connectionMsg = 'No network connection is active.';
                break;
            case 'unknown':
                connectionMsg = 'The network connection state is now unknown.';
                break;
            case 'cellular':
                connectionMsg = 'You are now connected to a cellular network.';
                break;
            case 'wifi':
                connectionMsg = 'You are now connected to a WiFi network.';
                break;
        }
        (Platform.OS === 'ios')
            ? Alert.alert('Connection change:', connectionMsg)
            : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#00ffff',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        margin: 40,
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 65,
        width: "100%"
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default connect(null, mapDispatchToProps)(Main);



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