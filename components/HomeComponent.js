import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Animated } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        places: state.places
    };
};

class Home extends Component {
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
                // <Animatable.View animation='fadeInRightBig' duration={2000}>
                <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
                    <View style={styles.formRow}>
                        <Tile
                            title={item.name}
                            caption={item.description}
                            featured
                            onPress={() => navigate('ContinentInfo', { placeId: item.id })}
                            imageSrc={{uri: baseUrl + item.image}}
                        />
                    </View>
                </Animated.ScrollView>
            );
        };

        if (this.props.places.isLoading) {
            return <Loading />;
        }
        if (this.props.places.errMess) {
            return (
                <View>
                    <Text>{this.props.places.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.places.places}
                renderItem={renderHomeItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        height: 200,
    }
});

export default connect(mapStateToProps)(Home);

