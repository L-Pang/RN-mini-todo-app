import React, { Component } from 'react'
import { View } from 'react-native'
import { Form, Item, Input, Button, Text as NBText } from 'native-base'

export class AddTodoScreen extends Component {
    state = {
        text: ''
    }

    // Update text while editing
    onChangeText = event => {
        this.setState({ text: event.nativeEvent.text })
    }

    // Save text to AsyncStorage using the method passed in from Home
    onAddTodo = () => {
        this.props.navigation.state.params.saveItem(this.state.text)
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{ marginTop: 20 }}>
                <View style={{ marginRight: 10 }}>
                    <Form>
                        <Item>
                            <Input
                                value={this.state.text}
                                placeholder='Enter a new Todo item...'                                
                                autoFocus
                                clearButtonMode='always'
                                autoCorrect={false}
                                onChange={this.onChangeText}
                                onSubmitEditing={this.onAddTodo}
                                returnKeyType={'done'}
                            />
                        </Item>
                    </Form>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        style={{ backgroundColor: '#7576d9', marginVertical: 25, marginHorizontal: 65, justifyContent: 'center', width: 250, borderRadius: 10 }}
                        onPress={this.onAddTodo}
                    >
                        <NBText style={{ fontWeight: 'bold' }}>Add Todo</NBText>
                    </Button>
                </View>
            </View>
        )
    }
}

export default AddTodoScreen
