import React, { Component } from 'react';
import { View, ScrollView, Button, StyleSheet, 
    Picker, Image } from 'react-native';
import { Input, Rating } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
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
            favorite: false,
            showModal: false,
            continent: 1,
            country: '',
            rating: 10,
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
            rating: 10,
            text: '',
            imageUrl: baseUrl + 'images/Maincontactphoto.jpg'
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
       return (
            <ScrollView>
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
                                this.handleComment(placeId, this.state.rating, this.state.author, this.state.text );
                                this.resetForm();
                            }}
                        />
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