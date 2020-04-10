import React, { useEffect,useRef } from 'react';

import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import NewsNavigator from './NewsNavigator';

const NavigationContainer = props => {
    const navRef = useRef()
const isAuth = useSelector( state => !! state.auth.token)
console.log("isAuth",isAuth)
useEffect(() => {
    if(!isAuth){
        navRef.current.dispatch(
            NavigationActions.navigate('Auth')
        )
    }
   
}, [isAuth])
return <NewsNavigator ref={navRef} />
     
}



export default NavigationContainer;