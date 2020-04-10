import React from 'react'; 
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Ionicons } from '@expo/vector-icons'
import NewsListScreen from '../screens/news/NewsListScreen';
import NewsPageScreen from '../screens/news/NewsPageScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import { useDispatch } from 'react-redux';
import { View, SafeAreaView ,Text } from 'react-native';
import * as authActions from '../store/actions/auth'
import { TouchableOpacity } from 'react-native-gesture-handler';
import StartupScreen from '../screens/StartUpScreen';

const defaultOptions ={
    headerStyle:{
        backgroundColor: 'indigo'
    },
    headerTintColor:'white',
    headerTitleStyle:{
        fontFamily:'lobster-bold'
    }

    
}

const NewsStackNav = createStackNavigator({
    NewsList: NewsListScreen,
    NewsPage: NewsPageScreen,
        
    
},
{   navigationOptions:{
    drawerIcon : drawerConfig =>  <Ionicons  name={ 'md-paper'
    } 
    size={23}
    color={drawerConfig.tintColor}
    />
    },
    defaultNavigationOptions:defaultOptions
})
const AuthStackNav = createStackNavigator({
    Auth:LoginScreen
},{
    navigationOptions:{
        drawerIcon : drawerConfig =>  <Ionicons  name={ 'md-log-in'
        } 
        size={23}
        color={drawerConfig.tintColor}
        />
        },
    defaultNavigationOptions:defaultOptions
})
const ProfileStackNav = createStackNavigator({
   Profile:ProfileScreen 
},{
    navigationOptions:{
        drawerIcon : drawerConfig =>  <Ionicons  name={ 'md-happy'
        } 
        size={23}
        color={drawerConfig.tintColor}
        />
        },
        defaultNavigationOptions:defaultOptions
})

const DrawerNavigator = createDrawerNavigator({

    News: NewsStackNav,
    Profile:ProfileStackNav,

},
{  
    contentOptions:{
        activeTintColor: "indigo" ,
        labelStyle:{
            fontFamily:'lobster-bold'
        }
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
    <View
    style={{flex:1,paddingVertical:20}}
    >
    <SafeAreaView forceInset={{
        top:'always',
        horizontal:'never'
    }} >
        <DrawerItems {...props} />
        <TouchableOpacity onPress={()=>{
            dispatch(authActions.logout())
            props.navigation.navigate('Auth')
        }}>
        <View style={{marginLeft:20 , flexDirection:'row'}}>
        <Ionicons   name={ 'md-log-out'
        } 
        size={23}
        color="indigo"
        />
        <Text  style={{marginLeft:30}} >Log out</Text>
        </View>
        </TouchableOpacity>
    </SafeAreaView>
    
    </View>
        )
    }
    
    })

const  MainNav =  createSwitchNavigator({
    Startup:StartupScreen,
    News:DrawerNavigator,
    Auth:AuthStackNav,
    
    
})

export default createAppContainer(MainNav);