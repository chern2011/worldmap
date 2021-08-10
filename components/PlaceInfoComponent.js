import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { PLACES } from '../shared/places';
import { COMMENTS } from '../shared/comments';

function RenderPlace(props) {
    const {place} = props;
    if (place) {
        return (
            <Card 
                featuredTitle={place.name}
                image={require('./image/WorldMap.jpg')}
            >
                <Text style={{margin: 10}}>
                    {place.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
            </Card>
        );
    }
    return <View />;
}


function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class PlaceInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: PLACES,
            comments: COMMENTS,
            favorite: false
        };
    }

    markFavorite() {
        this.setState({favorite: true});
    }

    static navigationOptions = {
        title: 'Continents Information'
    }

    render() {
        const placeId = this.props.navigation.getParam('placeId');
        const place = this.state.places.filter(place => place.id === placeId)[0];
        const comments = this.state.comments.filter(comment => comment.placeId === placeId);
        return (
            <ScrollView>
                <RenderPlace place={place}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default PlaceInfo;




/*
function PlaceInfo(props) {
    return <RenderPlace place={props.place} />;
}

export default PlaceInfo;
*/