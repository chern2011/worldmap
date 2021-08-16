import React, { Component } from 'react';
import { ScrollView, Text, FlatList, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};

function Mission () {
    return (
        <Card title="Our Mission">
            <Text style={{margin: 10}}>
                Make a friendly web for people to connect and share information and 
                reccommendation where people have gone or planning to visit.
            </Text>
            <ScrollView style={{flex: 1}}>
            <Image style={{width: "100%", height: 250}} source={require('./images/Maincontactphoto.jpg')} />
            </ScrollView>
        </Card>
    )
}

class AboutContact extends Component {

    static navigationOptions = {
        title: 'Contact'
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['chern2011@gmail.com'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        })
    }

    static navigationOptions = {
        title: 'About / Contact'
    }

    render() {
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Mission />
                    </Animatable.View>
                </ScrollView>
            );
        }
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Mission />
                    <Card wrapperStyle={{margin: 20}} title="Contact Information">
                        <Text>1010 Zuffy World</Text>
                        <Text>Gol D. Roger, Raftel 1,500,000,000</Text>
                        <Text style={{marginBottom: 10}}>One Piece</Text>
                        <Text>Phone: 1-704-530-3156</Text>
                        <Text>Email: chern2011@gmail.com</Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: '#5637DD', margin: 40}}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />}
                            onPress={() => this.sendMail()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}


export default connect(mapStateToProps)(AboutContact);