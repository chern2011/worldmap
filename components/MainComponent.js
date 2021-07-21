import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { PLACES } from '../shared/places';
import PlaceInfo from './PlaceInfoComponent';
import { View } from 'react-native';

class Main extends Component {
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
                <PlaceInfo
                    place={this.state.places.filter(
                        place => place.id === this.state.selectedPlace)[0]}
                />
            </View>
        )
    }
}

export default Main;