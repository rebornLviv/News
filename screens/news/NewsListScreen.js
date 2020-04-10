import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as  newsActions from '../../store/actions/news';
import {LinearGradient} from 'expo-linear-gradient'
import Card from '../../components/Card';
import { HeaderButtons ,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
const NewsListScreen = props => {
let news = useSelector( state => state.news.news);
console.log(news)
const [loading, setLoading] = useState(false)
let dispatch = useDispatch();
const fetchData =useCallback( async () => {

    setLoading(true)
    await dispatch(newsActions.FetchNews())
    console.log('news2',news);
    setLoading(false) 


},[dispatch,setLoading])

useEffect( () => {
   fetchData()
}, [dispatch,fetchData])
 
  return (
<LinearGradient style={styles.screen} colors={['#ffedff','#ffe3ff']}>
        {loading ? <ActivityIndicator  size="large" color="blue" style={styles.indicator} /> : <FlatList style={styles.list}  data={news}  renderItem={ 
            itemData => {
               return <Card imgSrc={itemData.item.imgSrc}
                            title={itemData.item.title} 
                            published={itemData.item.published}
                            onPress={ ()=> { 
                                 props.navigation.navigate('NewsPage',{
                                    pid: itemData.item.id,
                                    title: itemData.item.title
                                 })
                            } }   
               />
            }
        }  /> }
        </LinearGradient>
        
        
    
  );


}


NewsListScreen.navigationOptions =  navData =>   {
  return {
  headerTitle:'News List',
  headerLeft: () => {
      return   (<HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Menu" iconName={'md-menu'} 
          onPress = {()=>{
              navData.navigation.toggleDrawer();
          }}
          />
          
              </HeaderButtons>) 
  }
  }
}
const styles = StyleSheet.create({
  list:{
    width:'85%',

},
indicator:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}
});
export default NewsListScreen;