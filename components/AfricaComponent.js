import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
//import { PARTNERS } from '../shared/partners';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

    // static navigationOptions = {
    //     title: 'About / Contact'
    // }


