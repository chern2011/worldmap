import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Animated, Image, Alert } from 'react-native';
import { Tile, Card, Rating, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        comments: state.comments,
        places: state.places,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    deleteFavorite: placeId => deleteFavorite(placeId)
};

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0)
        };
    }

    animate() {
        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            }
        ).start();
    }

    componentDidMount() {
        this.animate();
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderHomeItem = ({item}) => {
            return (
                <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
                                   <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
                    <View style={styles.deleteView}>
                    <TouchableOpacity
                            style={styles.deleteTouchable}
                            onPress={() =>
                                Alert.alert(
                                    'Delete Favorite?',
                                    'Are you sure you wish to delete the favorite campsite ' +
                                        item.name +
                                        '?',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log(item.name + 'Not Deleted'),
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'OK',
                                            onPress: () => this.props.deleteFavorite(item.id)
                                        },
                                    ],
                                    { cancelable: false }
                                )
                            }
                        >
                        <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            leftAvatar={{source: {uri: baseUrl + item.image}}}
                            onPress={() => navigate('ContinentInfo', {placeId: item.id})}
                        />
                    </View>
                </SwipeRow>
                        <Card style={styles.formRow}>
                        <Tile style={styles.formRow}
                            title={item.name}
                            caption={item.description}
                            featured
                            onPress={() => navigate('ContinentInfo', { placeId: item.id })}
                            imageSrc={styles.image, {uri: baseUrl + item.image}} 
                        />      
                            <Rating
                                startingValue={item.rating}
                                ratingCount={10}
                                imageSize={30}
                                type={'rocket'}
                                fractions={1}
                                showRating
                                style={{paddingVertical: 10}}
                                readonly
                            />    
                            <Text style={{fontSize: 14}}>{item.text}</Text>
                            <Text style={{fontSize: 14}}>{`${item.country}`}</Text>
                            <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
                        </Card>
                </Animated.ScrollView>
            );
        };

        if (this.props.comments.isLoading, this.props.places.isLoading) {
            return <Loading />;
        }
        if (this.props.comments.errMess, this.props.places.errMess) {
            return (
                <View>
                    <Text>{this.props.comments.errMess, this.props.places.errMess}</Text>
                </View>
            );
        }
        return (
            <Animatable.View animation="fadeInRightBig" duration={2000}>
                <FlatList
                data={this.props.comments.comments}
                renderItem={renderHomeItem}
                keyExtractor={item => item.id.toString()}
                data={this.props.places.places.filter(
                    place => this.props.favorites.includes(place.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
                />
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        width: "90%"
    },
    image: {
        width: "90%",
    },
});

export default connect(mapStateToProps)(Profile);


// onPress={() => this.props.navigation.navigate('Funfact2')}