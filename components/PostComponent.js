import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet, Picker,
    Alert, PanResponder, Share, Image } from 'react-native';
import { Card, Icon, Input, Rating, Tile } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment, } from '../redux/ActionCreators';
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
    postComment: (placeId, text, rating, author, country, image, continent) => (postComment(placeId, text, rating, author, country, image, continent))
};

const sharePlace = (title, message, url) => {
    Share.share({
        title: title,
        message: `${title}: ${message} ${url}`,
        url: url
    },{
        dialogTitle: 'Share ' + title
    });
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
                        name={props.favorite ? 'gratipay' : 'heart-o'}
                        type='font-awesome'
                        color='red'
                        raised
                        reverse
                        onPress={() => props.favorite ? 
                            console.log('Already set as a favorite') : props.markFavorite()}
                    />
                    <Icon
                        name='edit'
                        type='font-awesome'
                        color='green'
                        raised
                        reverse
                        onPress={() => props.onShowModal()}
                    />
                    <Icon
                        name={'share-alt-square'}
                        type='font-awesome'
                        color='blue'
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
                    <Image source={require('./images/Maincontactphoto.jpg')}
                        style={{width: "100%", height: 150}} />
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
                    <Text style={{fontSize: 14}}>{`${item.continent}, ${item.country}`}</Text>
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

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            showModal: false,
            continent: 1,
            country: '',
            rating: 10,
            author: '',
            text: "",
            imageUrl: baseUrl + 'images/Maincontactphoto.jpg',
            continent: ''
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    
    handleComment(placeId, text, rating, author, country, image) { 
        this.props.postComment(placeId, text, rating, author, country, image)
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            showModal: false,
            continent: 1,
            country: '',
            rating: 10,
            author: '',
            text: '',
            imageUrl: baseUrl + 'images/Maincontactphoto.jpg',
            continent: ''
        })
    }

    static navigationOptions = {
        title: 'Post Your Experience'
    }

    markFavorite(placeId) {
        this.props.postFavorite(placeId);
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.setState({imageUrl: capturedImage.uri});
            }
        }
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
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/Maincontactphoto.jpg')}
                            style={styles.image}
                        />
                    </View>
                    <View>
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                        <Button
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                        />
                    </View>
                    <View style={styles.row}>
                        <Rating
                            showRating
                            ratingCount={10}
                            startingValue = {5}
                            imageSize = {30}
                            type={'rocket'}
                            fractions={1}
                            onFinishRating={rating => this.setState({rating: rating})} 
                            style={{paddingVertical: 10}}
                        />
                        <Picker
                            style={styles.formItem2}
                            selectedValue={this.state.continent}
                            onValueChange={itemValue => this.setState({continent: itemValue})}
                            value={this.state.continent}
                        >
                            <Picker.Item label='Africa' value='Africa' />
                            <Picker.Item label='Asia' value='Asia' />
                            <Picker.Item label='Australia' value='Australia' />
                            <Picker.Item label='Europe' value='Europe' />
                            <Picker.Item label='North America' value='North America' />
                            <Picker.Item label='South America' value='South America' />
                        </Picker>
                        <Input
                            placeholder='Country'
                            leftIcon={{
                                type: 'font-awesome', 
                                name: 'flag'}}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={(country)=>this.setState({country: country})}
                            value={this.state.country}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ 
                                type: 'font-awesome', 
                                name: 'address-card'}}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={(author)=>this.setState({author: author})}
                            value={this.state.author}
                        />
                        <Input
                            placeholder='Comments'
                            leftIcon={{
                                type: 'font-awesome', 
                                name: 'comments'}}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={(text)=>this.setState({text: text})}
                            value={this.state.text}
                        />
                        <Button
                            title = 'Post'
                            color = '#5637DD'
                            onPress={() => {
                                this.handleComment( placeId, this.state.rating, this.state.author, this.state.text, this.state.country, {uri: this.state.imageUrl}, this.state.continent);
                                this.resetForm();
                            }}
                        />
                        <RenderComments comments={comments} />
                    </View>
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
        marginRight: 20,
        marginLeft: 20
    },
    row: {
        marginRight: 20,
        marginLeft: 20
    },
    formItem2: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 80,
        marginLeft: 80
    },
        image: {
        width: "100%",
        height: 100
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);