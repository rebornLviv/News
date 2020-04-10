
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const NewsPageScreen = props => {
  const id = props.navigation.getParam('pid')
  const news = useSelector( state => state.news.news.find( el => el.id == id));
  return (
    <ScrollView style={styles.container}>

      <Image style={styles.image} source={{uri:news.imgSrc}} />
      <View style={styles.txtContainer}>
  <Text style={styles.description}>{news.description}</Text>
  <Text style={styles.publ}> {news.published}</Text>
  </View>
    </ScrollView>
  );
}
NewsPageScreen.navigationOptions = navData => {
  return{

    headerTitle: navData.navigation.getParam('title')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image:{
    width:'100%',
    height:400
  },
  description:{
    textAlign:'center',
    fontWeight:"200",
    fontSize:13,
    fontFamily:'lobster-ita'
  },
  publ:{
    textAlign:"right",
    fontSize:12,
    fontFamily:'lobster-ita',
    paddingRight:3
  },
  txtContainer:{
    marginTop:19
  }
});
export default NewsPageScreen;