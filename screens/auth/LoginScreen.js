import React, {useState, useReducer, useCallback ,
  useEffect} from 'react'
  import {ScrollView,StyleSheet,View,KeyboardAvoidingView,
  Button,
  ActivityIndicator
  ,
  Alert} from 'react-native'
  
  import {LinearGradient} from 'expo-linear-gradient'
  import * as authActions from '../../store/actions/auth'
  import { useDispatch } from 'react-redux';
import Input from '../../components/Input'
import LoginCard from '../../components/LoginCard';
  const FORM_UPDATE = 'UPDATE';
  
  const formReducer = (state,action) => {
      if(action.type  === 'UPDATE' ){
      const updatedValues = {
      ...state.inputValues,
      [action.input]:action.value
      
      };
      const updateValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
           
      }
      let formIsValid = true;
      for( const key in updateValidities){
          formIsValid = formIsValid && updateValidities[key];
      }
      return {
      formIsValid:formIsValid,
      inputValues:updatedValues,
      inputValidities:updateValidities
      
      };
      
      
      
      
      }
      return state;
      
      
      }
  
  
  
  const LoginScreen = props => {
      const [isLoading,setIsLoading] = useState(false);
      const [error,setError] =useState()
      const [isSignUp,setIsSignUp] = useState(false);
      const dispatch = useDispatch();
      const  [formState,dispatchFormState]  =   useReducer(formReducer,{
          inputValues:{
              email:'',
              password:''
     
          },
          inputValidities:{
              email:false,
              password:false
          },
          formIsValid: false
      })
      const inputChangeHandler = useCallback( (inputIdentifier,inputValue,inputValidity) => {
  
  
          dispatchFormState({
              type:FORM_UPDATE,
              value:inputValue,
              isValid: inputValidity,
              input:inputIdentifier
          }, 
           
          )
      
      
      },[dispatchFormState]
      )
  
      useEffect(()=>{
  if(error){
      Alert.alert('An error occured',error,[{
          text:'Okay'
      }])
  }
  
      },[error])
      const authHandler = async () => {
          let action;
         if (isSignUp) {
           action = authActions.signup(formState.inputValues.email,
              formState.inputValues.password)
  
         }
         else {
             action = authActions.login(formState.inputValues.email,
              formState.inputValues.password)
         }
         setError(null)
         setIsLoading(true)
         try{
          await   dispatch(action)
          props.navigation.navigate('News')
          
  
         }
         catch(e){
             setError(e.message)
             setIsLoading(false)
         }
      
          
          
  
          
      }
      return (
         <KeyboardAvoidingView behavior="height" 
          style= {styles.screen}> 
          <LinearGradient colors={['#ffedff','#ffe3ff']}
          style={styles.gradient}
          >
          <LoginCard style = {styles.authContainer}>
  <ScrollView>
          <Input id = 'email'
           label='E-mail'
           keyboardType = "email-address"
           required
           email
           autoCapitalize = "none"
           errorText="Please enter a valid email address"
           onInputChange = { inputChangeHandler}
           initialValue = ''
           />
           <Input id = 'password'
           label='Password'
           secureTextEntry
           keyboardType = "default"
           required
           minLength={5}
           password
           autoCapitalize = "none"
           errorText="Please enter a valid password"
           initialValue = ''
           onInputChange = { inputChangeHandler}
           />
           <View style={styles.buttonContainer}>
  {isLoading ? <ActivityIndicator size='small' color="indigo"/> :  <Button title={!isSignUp ?"Login" : 'Sign Up'} color="indigo"  
  onPress={authHandler}/>}
  </View>
  <View style={styles.buttonContainer}>
  <Button title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`} color="indigo" 
  onPress={()=>{
  
      setIsSignUp( prevState=> !prevState)
  }}/>
  </View>
  
  
  </ScrollView>
  
          </LoginCard>
          </LinearGradient>
          </KeyboardAvoidingView>
      )
  }
  
  LoginScreen.navigationOptions = {
  headerTitle: 'Authenticate'
      
  }
  const styles = StyleSheet.create({
  screen:{
  flex:1, 
  
  
  },
  authContainer:{
   width:'80%',
   maxWidth:400,
   maxHeight:400,
   padding:20
  },
  gradient:{
    flex:1,
      justifyContent:'center',
  alignItems:'center'
  },
  buttonContainer:{
      marginTop:10
  }
  
  
  })
  
  export default LoginScreen;