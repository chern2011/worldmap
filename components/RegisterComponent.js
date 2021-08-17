import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { baseUrl } from '../shared/baseUrl';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/BeachR.jpg'
        };
    }

    static navigationOptions = {
        title: 'Register'
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

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify(
                {username: this.state.username, password: this.state.password}))
                .catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch(
                error => console.log('Could not delete user info', error)
            );
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.row}>
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                            buttonStyle={{backgroundColor: '#6495ed'}}
                        />
                        <Button
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                            buttonStyle={{backgroundColor: '#6495ed'}}
                        />
                    </View>
                    <Input
                        placeholder='Username'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={username => this.setState({username})}
                        value={this.state.username}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={{type: 'font-awesome', name: 'key'}}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='First Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={firstname => this.setState({firstname})}
                        value={this.state.firstname}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={lastname => this.setState({lastname})}
                        value={this.state.lastname}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox}
                    />
                    <View>
                        <Button
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{marginRight: 10}}
                                />
                            }
                            buttonStyle={{backgroundColor: 'darkgreen'}}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginRight: 30,
        marginLeft: 30
    },
    formIcon: {
        marginRight: 10
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    image: {
        width: "100%",
        height: 100
    }
});

export default Register;