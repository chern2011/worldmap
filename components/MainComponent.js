import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { PLACES } from '../shared/places';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: PLACES
        };
    }

    render() {
        return <Directory places={this.state.places} />;
    }
}

export default Main;