import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import newsReducer from './store/reducers/news';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import profileReducer from './store/reducers/profile'
import NavigationContainer from './navigation/NavigationContainer';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
const rootReducer = combineReducers({
  news:newsReducer,
  auth:authReducer,
  profile:profileReducer
})
const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'lobster-bold': require('./assets/fonts/LobsterTwo-BoldItalic.ttf'),
    'lobster-ita'  : require('./assets/fonts/LobsterTwo-Italic.ttf')
  });
}
export default function App() {

  const [fontLoaded,setFontLoaded] = useState(false);
  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>{
    setFontLoaded(true);
    }} />
  } 
  return (
    <Provider store={store}>
    <NavigationContainer/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
