import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        places: state.places
    };
};

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderHomeItem = ({item}) => {
            return (
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <View style={{width: 100, height: 110,}}>
                        <Tile
                            title={item.name}
                            caption={item.description}
                            featured
                            onPress={() => navigate('ContinentInfo', { placeId: item.id })}
                            imageSrc={{uri: baseUrl + item.image}}
                        />
                    </View>
                </Animatable.View>
            );
        };

        if (this.props.places.isLoading) {
            return <Loading />;
        }
        if (this.props.places.errMess) {
            return (
                <View>
                    <Text>{this.props.places.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.places.places}
                renderItem={renderHomeItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Home);

