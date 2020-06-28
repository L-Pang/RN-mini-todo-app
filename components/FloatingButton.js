import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Fab } from 'native-base'

const FloatingButton = ({ onPress }) => (
    <Fab direction='up' style={styles.button} position='bottomRight' onPress={onPress}>
        <Icon name='ios-add' />
    </Fab>
)

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#7576d9'
    }
})

export default FloatingButton