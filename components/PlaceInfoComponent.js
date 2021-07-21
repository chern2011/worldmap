import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { PLACES } from '../shared/places';

function RenderPlace({place}) {
    if (place) {
        return (
            <Card 
                featuredTitle={place.name}
                image={require('./image/WorldMap.jpg')}
            >
                <Text style={{margin: 10}}>
                    {place.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class PlaceInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: PLACES
        };
    }

    static navigationOptions = {
        title: 'Continents Information'
    }

    render() {
        const placeId = this.props.navigation.getParam('placeId');
        const place = this.state.places.filter(place => place.id === placeId)[0];
        return <RenderPlace place={place} />;
    }
}

export default PlaceInfo;




/*
function PlaceInfo(props) {
    return <RenderPlace place={props.place} />;
}

export default PlaceInfo;
*/