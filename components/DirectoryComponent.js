import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
// import { ListItem } from 'react-native-elements';
// import { PLACES } from '../shared/places';
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

class Directory extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         places: PLACES
    //     };
    // }

    static navigationOptions = {
        title: 'Directory'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
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
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Directory);


/*
import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { PLACES } from '../shared/places';

function Directory(props) {

    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                onPress={() => props.onPress(item.id)}
                leftAvatar={{ source: require('./Desktop/React Native Profile Project/React Native Assignment/image/WorldMap.jpg')}}
            />
        );
    };

    return (
        <FlatList
            data={props.places}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Directory;
*/