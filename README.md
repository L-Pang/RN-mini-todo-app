# React Native Mini To-do List Mobile App

A mini To-Do List mobile app built with React Native that supports adding, removing and filtering Todo items.


## Table of Contents

- [React Native Mini To-do List Mobile App](#react-native-mini-to-do-list-mobile-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
    - [Install](#install)
    - [Run](#run)
  - [Demo](#demo)
    - [Landing Sreen](#landing-sreen)
    - [Home Screen](#home-screen)
    - [Add To-do Screen](#add-to-do-screen)
    - [Data removal](#data-removal)
  - [License](#license)


## Features

* Using Expo client to build the native app that can be run on both Android & iOS
* Using AsyncStorage for local data persistence
* Using NativeBase to create React Native UI component

## Project Structure

```md
├── components
│   └── FloatingButton.js
│   ├── Header.js
│   └── Item.js
│   └── NavBar.js
├── screens
│   ├── AddTodoScreen.js
│   └── HomeScreen.js
│   └── Landing.js
│   └── Splash.js
└── app.js
```


## Usage

### Install

Install Node.js and then run the commend below to install all dependencies by 

```sh
$ npm install
```

### Run

Use the command below to run the app with Expo client

```sh
$ npm start
```


## Demo

Splash Screen is the initial screen of the app. If no date in local storage (implemented with AsyncStorage), users will be directed to Landing screen, or to Home screen otherwise.

### Landing Sreen

Users need to put in their name on Landing screen to be able to create their To-do list. When all data is removed from local storage, they will also be redirected to Landing screen.

![Landing Screen](https://github.com/L-Pang/RN-mini-todo-app/blob/master/assets/screenshots/landing.JPEG)

### Home Screen

Press the button at the bottom right to add new To-do item and button on the top right to remove all data from local storage. For added items, press the icon at the beginning of each item to mark it as complete/incomplete or press trash icon to delete the item. Segment tabs allow users to see filtered items under each category.

![Home Screen](https://github.com/L-Pang/RN-mini-todo-app/blob/master/assets/screenshots/home.JPEG)

### Add To-do Screen

This is where users enter new To-do items. After entering a new item and pressing the button, they will be redirected to the Home screen where all added items are displayed.

![Add Todo Screen](https://github.com/L-Pang/RN-mini-todo-app/blob/master/assets/screenshots/addtodo.JPG)

### Data removal

When the clearing button is pressed, a Pop-up messagebox is displayed to confirm the action. All data is cleared when OK is pressed.

![Clearing Screen](https://github.com/L-Pang/RN-mini-todo-app/blob/master/assets/screenshots/clear.JPEG)


## License

[MIT](LICENSE)
