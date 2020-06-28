import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import { Container, Content, Spinner } from 'native-base';

const dimensions = Dimensions.get('window');

class Splash extends Component {
    constructor() {
        super();
    }

    // Get token from AsyncStorage
    // Go to Landing if no token in AsyncStorage else go to Home
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            this.props.navigation.navigate('Landing');
        } else {
            this.props.navigation.navigate('Main');
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.fullScreen}>
                        <Spinner color='#7576d9' />
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        width: dimensions.width,
        height: dimensions.height * 0.9,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Splash;
