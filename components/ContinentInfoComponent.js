import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet, Picker,
    Alert, PanResponder, Share, Image } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { PLACES } from '../shared/places';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
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
    postComment: (placeId, image, rating, continent, country, author, text) => (postComment(placeId, image, rating, continent, country, author, text))
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
                    ratingCount={10}
                    imageSize={10}
                    style={{alignItems:'flex-start', paddingVertical:'5%'}}
                    type={'rocket'}
                    fractions={1}
                />
                <Text style={{fontSize: 14}}>{`Continent: ${item.continent}`}, {`Country: ${item.country}`}</Text>
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
            favorite: false,
            showModal: false,
            imageUrl: baseUrl + 'images/Maincontactphoto.jpg',
            rating: '',
            continent: '',
            country: '',
            author: '',
            text: '',
            
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    
    handleComment(placeId, image, rating, continent, country, author, text) { 
        this.props.postComment(placeId, image, rating, continent, country, author, text)
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            showModal: false,
            imageUrl: baseUrl + 'images/Maincontactphoto.jpg',
            rating: '',
            continent: '',
            country: '',
            author: '',
            text: '',
            
        })
    }

    static navigationOptions = {
        title: 'Continents Information'
    }

    markFavorite(placeId) {
        this.props.postFavorite(placeId);
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }

    processImage = async (imgUri) => {
        const processedImage = await ImageManipulator.manipulateAsync(imgUri, [ {resize: {width: 400} } ],
            { format: ImageManipulator.SaveFormat.PNG }
        );
            console.log(processedImage);
            this.setState({imageUrl: processedImage.uri});
            MediaLibrary.saveToLibraryAsync(processedImage);
        
    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
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
                <RenderComments comments={comments} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/Maincontactphoto.jpg')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.row}>
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                        <Button
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                        />
                    </View>
                    <View style={styles.modal}>
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
                            value={this.state.text}
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
                                name: 'comment-o'}}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={(country)=>this.setState({country: country})}
                            value={this.state.country}
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
                                this.handleComment( placeId, this.state.image,this.state.rating, this.state.continent, this.state.country, this.state.author, this.state.text );
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
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContinentInfo);

