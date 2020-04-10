import React from 'react'
import {View,StyleSheet,Image,Text,TouchableOpacity} from 'react-native'


const Card = props =>{
    
 return(
     <TouchableOpacity onPress={props.onPress}>
     <View style={{...styles.card,...props.style}} >
<View style={styles.imageContainer}>
<Image style={styles.image} source={{uri:props.imgSrc}} resizeMode="cover"  />
</View>
<View style={styles.textContainer}>
   <View style={styles.textM} >

   <Text style = {styles.title}
    numberOfLines={3}
    >
    Title :
    </Text>
    <Text style = {styles.title}
    numberOfLines={3}
    >
        {props.title}
    </Text>
   </View>
 
<View style={styles.textM}>
<Text style = {styles.author}>Published:</Text>
 <Text style = {styles.author}> {props.published}</Text>
</View>
 
</View>

 </View>
 </TouchableOpacity>)

}

const styles = StyleSheet.create({
card:{
    shadowColor:'black',
    shadowOpacity:0.26,
    shadowOffset:{width:0 , height: 2},
    shadowRadius:8,
    elevation:5,
    borderRadius:10,
    backgroundColor:'white',
    marginVertical:10,
    overflow:'hidden',
    width:'100%',
    height:150, 
    flexDirection:'row'
   
},
image:{
  width:'100%',
  height:'100%'
},
textContainer:{
    width:'45%',
    height:'100%',
    padding:10,
    
},
imageContainer:{
  width:'55%',
  height:'100%',
 
},
title:{
    fontSize:12,
    textAlign:'center',
    fontFamily:'lobster-bold'

    
},
author:{
    fontSize:12,
    textAlign:'center',
    fontFamily:'lobster-ita'

},
textM:{
    marginVertical:3
}


})

export default Card;