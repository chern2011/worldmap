import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet,
    Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { PLACES } from '../shared/places';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        places: state.places,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: placeId => (postFavorite(placeId)),
    postComment: (placeId, rating, author, text) => (postComment(placeId, rating, author, text))
};

function RenderPlace(props) {

    const {place} = props;

    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;
    const recognizeComment = ({dx}) => (dx > 200) ? true : false;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + place.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
            else if(recognizeComment(gestureState)) {
                props.onShowModal();
            }
            return true;
        }
    });

    const sharePlace = (title, message, url) => {
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        },{
            dialogTitle: 'Share ' + title
        });
    };

    if (place) {
        return (
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={place.name}
                    image={{uri: baseUrl + place.image}}
                    >
                    <Text style={{margin: 10}}>
                        {place.description}
                    </Text>
                    <View style={styles.cardRow}>
                    <Icon
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        raised
                        reverse
                        onPress={() => props.favorite ? 
                            console.log('Already set as a favorite') : props.markFavorite()}
                    />
                    <Icon
                        name='pencil'
                        type='font-awesome'
                        color='#5637DD'
                        raised
                        reverse
                        onPress={() => props.onShowModal()}
                    />
                    <Icon
                        name={'share'}
                        type='font-awesome'
                        color='#5637DD'
                        raised
                        reverse
                        onPress={() => sharePlace(place.name, place.description, baseUrl + place.image)} 
                    />
                </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Rating
                    startingValue={item.rating}
                    imageSize={10}
                    style={{alignItems:'flex-start', paddingVertical:'5%'}}
                    readonly
                />
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class ContinentInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // places: PLACES,
            // comments: COMMENTS,
            favorite: false,
            showModal: false,
            rating: 5,
            author: "",
            text: ""
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    
    handleComment(placeId, rating, author, text) { 
        this.props.postComment(placeId, rating, author, text)
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        })
    }

    static navigationOptions = {
        title: 'Continents Information'
    }

    markFavorite(placeId) {
        this.props.postFavorite(placeId);
    }

    render() {
        const placeId = this.props.navigation.getParam('placeId');
        const place = this.props.places.places.filter(place => place.id === placeId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.placeId === placeId);
        return (
            <ScrollView>
                <RenderPlace place={place}
                    favorite={this.props.favorites.includes(placeId)}
                    markFavorite={() => this.markFavorite(placeId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue = {5}
                            imageSize = {40}
                            onFinishRating={rating => this.setState({rating: rating})} 
                            style={{paddingVertical: 10}}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ 
                                type: 'font-awesome', 
                                name: 'user-o'}}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={(author)=>this.setState({author: author})}
                            value={this.state.author}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{
                                type: 'font-awesome', 
                                name: 'comment-o'}}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={(text)=>this.setState({text: text})}
                            value={this.state.text}
                        />
                        <Button
                            title = 'Submit'
                            color = '#5637DD'
                            onPress={() => {
                                this.handleComment(placeId, this.state.rating, this.state.author, this.state.text );
                                this.resetForm();
                            }}
                        />
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContinentInfo);




/*
function PlaceInfo(props) {
    return <RenderPlace place={props.place} />;
}

export default PlaceInfo;
*/