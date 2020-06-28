import React from 'react'
import { Header as NBHeader, Body, Title, Left, Right, Icon } from 'native-base'

const Header = ({name, onPress}) => {

    return (
        <NBHeader style={{ backgroundColor: '#7576d9', height: 60 }}>
            <Left/>
            <Body>
                <Title style={{ color: '#ffffff', minWidth: 200 }}>{name}'s To do List</Title>
            </Body>
            <Right>
                <Icon style={{ color: '#ffffff' }} name='remove-circle-outline' onPress={onPress}/>
            </Right>
        </NBHeader>
    )
}

export default Header