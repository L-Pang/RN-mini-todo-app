import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native'

const token = '@token'

export default class Landing extends Component {
    state = {
        text: ''
    }

    // Save token and name entered to AsyncStorage
    handleSubmit = async text => {

        try {

            await AsyncStorage.setItem('token', token.toString());
            await AsyncStorage.setItem('name', text.toString());

        } catch (err) {
            alert('Failed to save your name! \nPlease try again!');
        }
    }

    // Update text while entering
    onChangeText = text => this.setState({ text })

    // Reset text and redirect to Home
    onSubmitEditing = () => {

        if (this.state.text) {
            this.handleSubmit(this.state.text)
            this.setState({ text: '' })
            this.props.navigation.navigate('Main');
        }
    }

    render() {
        const { text } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hi {text}!</Text>
                <TextInput
                    style={styles.input}
                    value={text}
                    maxLength={10}
                    placeholder='Please enter your name...'
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                />
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold'
    },
    input: {
        padding: 15,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        margin: 10
    }
})
