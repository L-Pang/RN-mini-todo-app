import React, { Component } from 'react'
import { FlatList, View, StatusBar, StyleSheet, AsyncStorage, Alert } from 'react-native'
import { v1 as uuidv1 } from 'uuid'
import _values from 'lodash.values'
import { AppLoading } from 'expo'
import Header from '../components/Header'
import Item from '../components/Item'
import FloatingButton from '../components/FloatingButton'
import SegmentedControlTab from "react-native-segmented-control-tab";

export class HomeScreen extends Component {
    state = {
        // todos: {},
        todos: [],
        name: '',
        isDataReady: false,
        filter: 'Todo',
        selectedIndex: 0
    }

    componentDidMount = () => {
        this.loadData()
    }

    // Load data from AsyncStorage
    loadData = async () => {
        try {
            const getTodos = await AsyncStorage.getItem('todos')
            const getName = await AsyncStorage.getItem('name')
            const loadedTodos = JSON.parse(getTodos)
            this.setState({ todos: loadedTodos || [], name: getName, isDataReady: true })
        } catch (err) {
            alert('Oops...failed to load data.')
        }

    }

    // Save Todo items to AsyncStorage
    saveTodos = newToDos => {
        AsyncStorage.setItem('todos', JSON.stringify(newToDos))
    }
    

    // Create new Todo item with an unique id, update state and then save it to AsyncStorage
    addTodo = newTodo => {
        const newTodoItem = newTodo
        if (newTodoItem ) {
            this.setState(prevState => {
                const ID = uuidv1()
                const newToDoObject = {
                    id: ID,
                    isCompleted: false,
                    value: newTodoItem
                }
                const newState = {
                    ...prevState,
                    todos: [
                        ...prevState.todos,
                        newToDoObject
                    ]
                }
                this.saveTodos(newState.todos)
                return { ...newState }
            })
        }
    }

    // Delete Todo item, update state and then remove it from AsyncStorage
    deleteTodo = id => {
        this.setState(prevState => {
            let todos = prevState.todos.filter(item => item.id != id);
            const newState = {
                ...prevState,
                todos
            }
            this.saveTodos(newState.todos)
            return { ...newState }
        })
    }

    // Set item as incomplete
    inCompleteTodo = id => {
        this.setState(prevState => {
            const index = prevState.todos.findIndex(item => item.id == id);
            let todos = prevState.todos[index];
            let inTodos = {
                ...todos,
                isCompleted: false
            }
            prevState.todos[index] = inTodos;
            const newState = {
                ...prevState,
                todos: [
                    ...prevState.todos
                ]
            }
            this.saveTodos(newState.todos)
            return { ...newState }
        })
    }

    // Set item as complete
    completeTodo = id => {
        this.setState(prevState => {
            const index = prevState.todos.findIndex(item => item.id == id);
            let todos = prevState.todos[index];
            let inTodos = {
                ...todos,
                isCompleted: true
            }
            prevState.todos[index] = inTodos;
            const newState = {
                ...prevState,
                todos: [
                    ...prevState.todos
                ]
            }
            this.saveTodos(newState.todos)
            return { ...newState }
        })
    }

    // Go to AddToDo screen to add new item
    onPressFab = () => {
        this.props.navigation.navigate('AddTodo', {
            saveItem: this.addTodo
        })
    }


    // Filter todo items according to filter
    filteredItems = () => {
        if (this.state.filter === 'Todo') {
            return this.state.todos.filter(item => {
                return !item.isCompleted
            })
        }
        if (this.state.filter === 'Complete') {
            return this.state.todos.filter(item => {
                return item.isCompleted
            })
        }
        return this.state.todos
    }

    // Press to see filtered items
    handleTabPress = index => {
        if (index === 0) {
            this.setState({
                ...this.state,
                filter: 'Todo',
                selectedIndex: index
            });
        }
        else {
            this.setState({
                ...this.state,
                filter: 'Complete',
                selectedIndex: index
            });
        }
    }

    // Show option to clear all data
    onPressRemove = () =>
        Alert.alert(
            "Clear all data?",
            "",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: this.removeEverything }
            ],
            { cancelable: false }
        );

    // Remove all data from storage
    removeEverything = async () => {
        try {
            await AsyncStorage.clear()
            alert('All data successfully cleared!')
            this.props.navigation.navigate('Landing');
        } catch (err) {
            alert('Failed to clear data.')
        }
    }

    render() {
        const { isDataReady } = this.state

        if (!isDataReady) {
            return <AppLoading />
        }
        return (
            <View style={styles.container}>
                <Header name={this.state.name} onPress={this.onPressRemove} />
                <StatusBar barStyle='light-content' />
                <View>
                    <SegmentedControlTab
                        values={["Todo", "Complete"]}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleTabPress}
                        borderRadius={2}
                        tabsContainerStyle={styles.tabContainer}
                        tabStyle={styles.commonStyle}
                        activeTabStyle={{ ...styles.commonStyle, ...styles.activeStyle }}
                        tabTextStyle={styles.text}
                        activeTabTextStyle={styles.text}
                    />
                </View>
                <FlatList
                    data={_values(this.filteredItems())}
                    contentContainerStyle={styles.content}
                    keyExtractor={item => item.id}
                    renderItem={row => {
                        return <Item
                            id={row.item.id}
                            isCompleted={row.item.isCompleted}
                            value={row.item.value}
                            deleteTodo={this.deleteTodo}
                            completeTodo={this.completeTodo}
                            inCompleteTodo={this.inCompleteTodo}
                        />
                    }}
                />
                <FloatingButton onPress={this.onPressFab} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentHeader: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabContainer: {
        height: 36,
        borderColor: '#eeeef0',
        backgroundColor: '#eeeef0',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    commonStyle: {
        backgroundColor: '#eeeef0',
        height: 30,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 2,
        margin: 5,
        borderColor: 'transparent',
        borderWidth: 0
    },
    activeStyle: {
        backgroundColor: '#fff',
        shadowOffset: { width: 0.95, height: 0.95 },
        shadowColor: '#a2a2a2',
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    text: {
        color: '#444444',
        fontWeight: 'bold'
    }
})

export default HomeScreen