// import React, { Component } from 'react';
// import Home from './HomeComponent';
// import ContinentInfo from './ContinentInfoComponent';
// import AboutContact from './AboutContactComponent';
// import Profile from './ProfileComponent';
// import Constants from 'expo-constants';
// import Reservation from './ReservationComponent';
// import Favorites from './FavoritesComponent';
// import Login from './LoginComponent';
// import NetInfo from '@react-native-community/netinfo';
// import Post from './PostComponent';
// import { View, Platform, StyleSheet, Text, ScrollView, Image,
//     Alert, ToastAndroid } from 'react-native';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
// import { createAppContainer } from 'react-navigation';
// import { Icon } from 'react-native-elements';
// import SafeAreaView from 'react-native-safe-area-view';
// import { connect } from 'react-redux';

// const ProfileStack = createStackNavigator(
//     {
//         Profile: { 
//             screen: Profile,
//             navigationOptions: ({navigation}) => ({
//                 headerRight: <Icon
//                     name='list'
//                     type='font-awesome'
//                     iconStyle={styles.stackIcon}
//                     onPress={() => navigation.toggleDrawer()}
//                 />
//             })
//         },
//         Favorites: { screen: Favorites}
//         },
//         {
//             initialRouteName: 'Profile',
//             defaultNavigationOptions: {
//                 headerStyle: {
//                     backgroundColor: '#5637DD'
//                 },
//                 headerTintColor: '#fff',
//                 headerTitleStyle: {
//                     color: '#fff'
//                 }
//             }
//         }
//     );

// const FavoritesStack = createStackNavigator(
//     {
//         Favorites: { screen: Favorites }
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
//             headerRight: <Icon
//                 name='sign-in'
//                 type='font-awesome'
//                 iconStyle={styles.stackIcon}
//                 onPress={() => navigation.toggleDrawer()}
//             />
//         })
//     }
// );

// const CustomDrawer = props => (
//     <ScrollView>
//         <SafeAreaView 
//             style={styles.container}
//             forceInset={{top: 'always', horizontal: 'never'}}>
//             <View style={styles.drawerHeader}>
//                 <View style={{flex: 1}}>
//                     <Image source={require('./images/WorldMap.jpg')} style={styles.drawerImage} />
//                 </View>
//                 <View style={{flex: 2}}>
//                     <Text style={styles.drawerHeaderText}>Travel the World</Text>
//                 </View>
//             </View>
//             <DrawerItems {...props} />
//         </SafeAreaView>
//     </ScrollView>
// );

// const RightsidetabNavigator = createStackNavigator(
//     {
//         Profile: {
//             screen: ProfileStack,
//             navigationOptions: {
//                 drawerIcon: ({tintColor}) => (
//                     <Icon
//                         name='sign-in'
//                         type='font-awesome'
//                         size={24}
//                         color={tintColor}
//                     />
//                 )
//             }
//         },
//         Favorites: {
//             screen: FavoritesStack,
//             navigationOptions: {
//                 drawerLabel: 'About and Contact Us',
//                 drawerIcon: ({tintColor}) => (
//                     <Icon
//                         name='info-circle'
//                         type='font-awesome'
//                         size={24}
//                         color={tintColor}
//                     />
//                 )
//             }
//         }
//     },
//     {
//         initialRouteName: 'Profile',
//         drawerBackgroundColor: '#CEC8FF',
//         contentComponent: CustomDrawer
//     }
// );


//     const Profiledrawer = createAppContainer(RightsidetabNavigator)

// class Rightsidetab extends Component {

//     render() {
//         return (
//             <View style={{
//                 flex: 1,
//                 paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
//             }}>
//                 <Profiledrawer />
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     drawerHeader: {
//         backgroundColor: '#00ffff',
//         height: 140,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1,
//         flexDirection: 'row'
//     },
//     drawerHeaderText: {
//         color: '#fff',
//         margin: 40,
//         fontSize: 24,
//         fontWeight: 'bold'
//     },
//     drawerImage: {
//         margin: 10,
//         height: 65,
//         width: "100%"
//     },
//     stackIcon: {
//         marginLeft: 10,
//         color: '#fff',
//         fontSize: 24
//     }
// });

// export default Rightsidetab;

