import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        places: state.places,
        favorites: state.favorites
    };
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    onPress={() => navigate('PlaceInfo', {placeId: item.id})}
                />
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
                data={this.props.places.places.filter(
                    place => this.props.favorites.includes(place.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Favorites);