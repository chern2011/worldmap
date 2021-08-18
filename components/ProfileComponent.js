import React, { Component } from 'react';
import Favorites from './FavoritesComponent';
import Constants from 'expo-constants';
import { View, Text, Platform, StyleSheet, ScrollView, 
    Image, } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        places: state.places,
        promotions: state.promotions,
        partners: state.partners
    };
};

class Profile extends Component {

    static navigationOptions = {
        title: 'Profile'
    }

    render() {
        return (
            <Animatable.View animation='fadeInRightBig' duration={2000}>
            <ScrollView>   
                <Card>
                <Image style={styles.Image} source={require('./images/Maincontactphoto.jpg')} />
                <Text style={styles.PicText}>Hello</Text>
                </Card>
                <Card>
                <Image style={styles.Image} source={require('./images/Maincontactphoto.jpg')} />
                <Text style={styles.PicText}>Hello</Text>
                </Card>
                <Card>
                <Image style={styles.Image} source={require('./images/Maincontactphoto.jpg')} />
                <Text style={styles.PicText}>Hello</Text>
                </Card>
            </ScrollView>
         </Animatable.View>
    );
    }
}

const ProfileNavigator = createStackNavigator(
    {
        Profile: { screen: Profile }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#1c7506'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerRight: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    },
);

    const FavoritesNavigator = createStackNavigator(
        {
            Favorites: { screen: Favorites }
        },
        {
            defaultNavigationOptions: ({navigation}) => ({
                headerStyle: {
                    backgroundColor: '#1c7506'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                },
                headerRight: <Icon
                    name='heart'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        }
    );

    const CustomDrawer = props => (
        <ScrollView>
            <SafeAreaView 
                style={styles.container}
                forceInset={{top: 'always', horizontal: 'never'}}>
                <View style={styles.drawerHeader}>
                    <View style={{flex: 1}}>
                        <Image source={require('./images/WorldMap.jpg')} style={styles.drawerImage} />
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.drawerHeaderText}>NuCamp</Text>
                    </View>
                </View>
                <DrawerItems {...props} />
            </SafeAreaView>
        </ScrollView>
    ); 

    const RightsideNavigator = createDrawerNavigator(
        {
            Profile: {
                screen: ProfileNavigator,
                navigationOptions: {
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }
            },
        Favorite: {
                screen: FavoritesNavigator,
                navigationOptions: {
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
        },
        {
            initialRouteName: 'Profile',
            drawerBackgroundColor: '#CEC8FF',
            drawerPosition: "right",
            contentComponent: CustomDrawer
        }
    );

const Apps3Navigator = createAppContainer(RightsideNavigator)
class Profile2 extends Component {

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}>
                <Apps3Navigator />
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
        PicText: {
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            margin: 10,
        },
        drawerImage: {
            margin: 10,
            height: 65,
            width: "100%"
        },
        stackIcon: {
            marginRight: 10,
            color: '#fff',
            fontSize: 24
        },
        Image: {
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            height: 200,
            width: "100%",
        },
    });
    
export default connect(mapStateToProps)(Profile2);