import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet,
    Picker, Switch, Button, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import { AndroidNotificationPriority } from 'expo-notifications';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Continents: 1,
            visitors: 1,
            TourGuide: false,
            date: new Date(),
            showCalendar: false,
            showModal: false
        };
    }

    static navigationOptions = {
        title: 'Reserve Flight'
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Begin Search?',
            'Continents: ' + this.state.continents +
            '\nNumber of Visitors: ' + this.state.visitors + 
            '\nTourGuide ' + this.state.TourGuide +
            '\nDate ' + this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK', 
                    onPress: () => {
                        this.presentLocalNotification(this.state.date.toLocaleDateString('en-US'));
                        this.resetForm();
                    }
                }
            ],
            { cancelable: false }
        )
    }

    resetForm() {
        this.setState({
            continents: 1,
            visitors: 1,
            TourGuide: false,
            date: new Date(),
            showCalendar: false,
            showModal: false
        });
    }

    async presentLocalNotification(date) {
        function sendNotification() {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true
                })
            });

            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Flight Reservation Search',
                    body: `Search for ${date} requested`
                },
                trigger: null
            });
        }

        let permissions = await Notifications.getPermissionsAsync();
        if (!permissions.granted) {
            permissions = await Notifications.requestPermissionsAsync();
        }
        if (permissions.granted) {
            sendNotification();
        }
    }

    render() {
        return (  
            <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
                <ScrollView>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Continents</Text>
                        <Picker
                            style={styles.formItem2}
                            selectedValue={this.state.continents}
                            onValueChange={itemValue => this.setState({continents: itemValue})}
                        >
                            <Picker.Item label='Africa' value='Africa' />
                            <Picker.Item label='Asia' value='Asia' />
                            <Picker.Item label='Australia' value='Australia' />
                            <Picker.Item label='Europe' value='Europe' />
                            <Picker.Item label='North America' value='North America' />
                            <Picker.Item label='South America' value='South America' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Visitors</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.visitors}
                            onValueChange={itemValue => this.setState({visitors: itemValue})}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                            <Picker.Item label='7' value='7' />
                            <Picker.Item label='8' value='8' />
                            <Picker.Item label='9' value='9' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Tour Guide?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.TourGuide}
                            trackColor={{true: '#5637DD', false: null}}
                            onValueChange={value => this.setState({TourGuide: value})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date</Text>
                        <Button
                            onPress={() =>
                                this.setState({showCalendar: !this.state.showCalendar})
                            }
                            title={this.state.date.toLocaleDateString('en-US')}
                            color='#5637DD'
                            accessibilityLabel='Tap me to select a reservation date'
                        />
                    </View>
                    {this.state.showCalendar && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            display='default'
                            onChange={(event, selectedDate) => {
                                selectedDate && this.setState({date: selectedDate, showCalendar: false});
                            }}
                            style={styles.formItem}
                        />
                    )}
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title='Search'
                            color='#5637DD'
                            accessibilityLabel='Tap me to search for available flight to reserve'
                        />
                    </View>
                </ScrollView>
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
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    formItem2: {
        flex: 2
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;