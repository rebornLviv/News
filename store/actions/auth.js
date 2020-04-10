import { AsyncStorage } from "react-native"
import * as profileActions from '../actions/profile'
export const SIGNUP ='SIGNUP'
export const LOGIN ='LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT ='LOGOUT'
let timer;
export const authenticate = (userId,token,expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({
            type:AUTHENTICATE,
            userId,
            token
        })
    }


}
export const signup = (email,password) => {

    return async dispatch => {

  const response = await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXZ-CH9JGS1EeqOHQXJYftYhU5G2C9LA4',{
method:'POST',
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify({
email:email,
password:password,
returnSecureToken:true
})
    })    
    if(!response.ok){
        let  errorRes =await response.json()
        let errId = errorRes.error.message;
          throw new Error( errId )
      }
const resData =  await response.json();
console.log("UserResData",resData);

dispatch(authenticate(resData.localId,resData.idToken, +resData.expiresIn*1000))
dispatch(profileActions.CreateProfile(resData.localId))
const expirationDate =new   Date ( new Date().getTime() + +resData.expiresIn*1000)
saveDataToStorage(resData.idToken,resData.localId,expirationDate)
    }

}
export const login = (email,password) => {

    return async dispatch => {

  const response = await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXZ-CH9JGS1EeqOHQXJYftYhU5G2C9LA4',{
method:'POST',
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify({
email:email,
password:password,
returnSecureToken:true

})

    })    
if(!response.ok){
  let  errorRes =await response.json()
  let errId = errorRes.error.message;
    throw new Error( errId )
}

const resData =  await response.json();
console.log('r',resData);

dispatch(authenticate(resData.localId,resData.idToken, +resData.expiresIn*1000))
dispatch(profileActions.FetchProfile(resData.localId))
const expirationDate =new   Date ( new Date().getTime() + +resData.expiresIn*1000)
saveDataToStorage(resData.idToken,resData.localId,expirationDate)


    }
}
const clearTimer = () => {
    if(timer){
    clearTimeout(timer)
    }
}
export const logout =  () => {


    clearTimer();
    AsyncStorage.removeItem('userData')
    return {
        type:LOGOUT
    }



}

const setLogoutTimer =   expirationTime => {
    return dispatch => {
   timer =  setTimeout(
            ()=>{
    dispatch(logout());
            }
            ,expirationTime)
    }
  
}

const saveDataToStorage = (token,userId,expirationDate)=>{
    console.log('recieved uid',userId)
    AsyncStorage.setItem('userData',JSON.stringify({
        token:token,
        userId:userId,
        expiryDate: expirationDate.toISOString()
    }))
}