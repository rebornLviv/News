import React, { useEffect } from 'react';
import {View,ActivityIndicator,StyleSheet,AsyncStorage} from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth'


const StartupScreen = props =>{
    const dispatch = useDispatch( )
useEffect(
    ()=>{

        const tryLogin = async () => {
          const userData = await AsyncStorage.getItem('userData');
          console.log("uDATA",userData)
          if(!userData){
            props.navigation.navigate('Auth')
            return;
          }
          
          const transformedData = JSON.parse(userData)
          console.log("transformed data",transformedData)
          const {token,userId,expiryDate} =  transformedData
          console.log('token',token)
          console.log('uid',userId)
          console.log('expp',expiryDate)
          const expirationDate = new Date(expiryDate);
          if (expiryDate <= new Date() || !token || !userId){
            props.navigation.navigate('Auth')
            return;
          }

          const  expTime = expirationDate.getTime() - new Date().getTime();
          props.navigation.navigate('News');
          dispatch(authActions.authenticate(userId,token,expTime))
        }
        tryLogin();
    },[dispatch]
)
    return (
        <View style={styles.screen} >
            <ActivityIndicator size="large" color="indigo" />
        </View>
    )
};



const styles = StyleSheet.create({
screen:{
flex:1,
justifyContent:'center',
alignItems:'center'
}

})
export default StartupScreen;