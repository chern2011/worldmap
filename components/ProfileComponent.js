import React, { Component } from 'react';
import Favorites from './FavoritesComponent';
import { View, Text, StyleSheet} from 'react-native';
import { Card } from 'react-native-elements';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Rightsidetab from './RightsidetabComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        places: state.places,
        promotions: state.promotions,
        partners: state.partners
    };
};

function RenderPlace(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}
            >
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Profile extends Component {

    static navigationOptions = {
        title: 'Profile'
    }

    render() {
        return (
            <Animatable.View animation='fadeInRightBig' duration={2000}>
                <View>

                </View>
                <RenderPlace
                    item={this.props.places.places.filter(place => place.featured)[0]}
                    isLoading={this.props.places.isLoading}
                    errMess={this.props.places.errMess}
                />
                <RenderPlace
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderPlace
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess}
                />
            </Animatable.View>
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
            marginRight: 10,
            color: '#fff',
            fontSize: 24
        }
    });
    
export default connect(mapStateToProps)(Profile);
