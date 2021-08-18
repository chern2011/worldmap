import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Animated, Image } from 'react-native';
import { Tile, Card, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        comments: state.comments
    };
};

class Profile extends Component {
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
                <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
                        <Card style={styles.formRow}>
                        <Tile style={styles.formRow}
                            title={item.name}
                            caption={item.description}
                            featured
                            onPress={() => navigate('ContinentInfo', { placeId: item.id })}
                            imageSrc={styles.image, {uri: baseUrl + item.image}} 
                        />      
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
                            <Text style={{fontSize: 14}}>{`${item.country}`}</Text>
                            <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
                        </Card>
                </Animated.ScrollView>
            );
        };

        if (this.props.comments.isLoading) {
            return <Loading />;
        }
        if (this.props.comments.errMess) {
            return (
                <View>
                    <Text>{this.props.comments.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.comments.comments}
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
        marginLeft: 10,
        marginRight: 10,
        width: "90%"
    },
    image: {
        width: "90%",
    },
});

export default connect(mapStateToProps)(Profile);


// onPress={() => this.props.navigation.navigate('Funfact2')}