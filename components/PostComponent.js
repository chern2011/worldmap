import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet, Picker,
    Alert, PanResponder, Share, Image } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AndroidNotificationPriority } from 'expo-notifications';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        places: state.places,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postComment: (placeId, rating, author, text) => (postComment(placeId, rating, author, text))
};

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // places: PLACES,
            // comments: COMMENTS,
            favorite: false,
            showModal: false,
            continent: 1,
            country: '',
            rating: 5,
            text: "",
            imageUrl: baseUrl + 'images/Maincontactphoto.jpg'
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
            continent: 1,
            country: '',
            rating: 5,
            text: '',
            imageUrl: baseUrl + 'images/Maincontactphoto.jpg'
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
       return (
            <ScrollView>
                    <View style={styles.modal}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{uri: this.state.imageUrl}}
                                loadingIndicatorSource={require('./images/Maincontactphoto.jpg')}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.imageContainer}>
                            <Button
                                title='Camera'
                                onPress={this.getImageFromCamera}
                            />
                        </View>
                        <Rating
                            showRating 
                            ratingCount={10}
                            startingValue = {5}
                            imageSize = {20}
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
                                name: 'building-o'}}
                            leftIconContainerStyle={{paddingRight:10}}
                            onChangeText={(country)=>this.setState({country: country})}
                            value={this.state.country}
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
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
                            <Button
                                style = {{paddingLeft: 10}}
                                title = 'Post'
                                color = '#5637DD'
                                onPress={() => {
                                    this.handleComment(placeId, this.state.rating, this.state.author, this.state.text );
                                    this.resetForm();
                                }}
                            />
                            <Button
                                title = 'Reset'
                                color = 'red'
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);