import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'native-base'

const { width } = Dimensions.get('window')

const Item = ({ id, inCompleteTodo, completeTodo, value, deleteTodo, isCompleted }) => {

    toggleItem = () => {
        if (isCompleted) {
            inCompleteTodo(id)
        } else {
            completeTodo(id)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <TouchableOpacity 
                    onPress={this.toggleItem}
                >
                    <Icon
                        name={isCompleted ? 'checkmark-circle' : 'radio-button-off'}
                        style={{ paddingLeft: 10, color: '#7576d9' }}
                    />
                </TouchableOpacity>

                <Text
                    style={[
                        styles.text,
                        {
                            opacity: isCompleted ? 0.5 : 1.0,
                            textDecorationLine: isCompleted ? 'line-through' : 'none',
                            color: isCompleted ? '#7576d9' : '#6262b5'
                        }
                    ]}
                >
                    {value}
                </Text>
            </View>
            <TouchableOpacity onPressOut={() => deleteTodo(id)}>
                <Icon name='md-trash' style={{ color: '#ABADF9', paddingRight: 10 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#7576d9',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: '#7576d9',
        fontSize: 18,
        marginVertical: 20,
        paddingLeft: 10
    },

    rowContainer: {
        flexDirection: 'row',
        width: width / 2,
        alignItems: 'center'
    }
})

export default Item