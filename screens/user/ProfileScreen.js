import React, { useReducer, useCallback, useState } from 'react';
import { StyleSheet, Text, View,Picker,TextInput} from 'react-native';
import * as profileActions  from '../../store/actions/profile'
import { useDispatch, useSelector } from 'react-redux';
import LoginCard from '../../components/LoginCard';
import {Ionicons} from '@expo/vector-icons'
import DatePicker from 'react-native-datepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient'
import { HeaderButtons ,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
const ProfileScreen = props => {
  let data = useSelector( state => state.profile.profile);
  console.log('ddddddddata',data)
  const [date, setDate] = useState(data.date);
  const [sex, setSex] = useState(data.sex)
  const [name, setName] = useState(data.name)
const [phone, setPhone] = useState(data.phone)
const [editDate, setEditDate] = useState(false)
const [editName,setEditName] = useState(false)
const [editPhone, setEditPhone] = useState(false)
const [editSex,setEditSex] =  useState(false)
var tempDate = '';
var tempSex = '';

  const dispatch = useDispatch();
  return (

    <LinearGradient style={styles.container} colors={['#ffedff','#ffe3ff']}>
     
           <LoginCard style={styles.card}>
                <View style={styles.name}>
                      {editName ? 
                      <View style={styles.cont}>
      <View style={styles.formControl}>
      <Text style = {styles.label}>Name :</Text>
      <TextInput 
      style={styles.input}
      onChangeText={
        
        (text)=>{
        setName(text)
        }
      }
      />
      </View>
<View style={styles.iconCont}>
        <TouchableOpacity onPress={
          ()=>{
            dispatch(profileActions.UpdateProfile({name:name}))
            setEditName(false)
          }
        }>
      <Ionicons name={'md-checkmark'} size={28} />
      </TouchableOpacity>
      <TouchableOpacity onPress={
          ()=>{
            setEditName(false)
            setName(data.name)
          }
        }>
          <Ionicons name={'md-close'} size={28} />
          </TouchableOpacity>
          </View> 
          </View>
          
          
          : [
          
          <Text style={styles.info} >Name: {name}</Text>, <TouchableOpacity onPress={()=>{
            setEditName(true)}}>
              <Ionicons name={'md-create'}   size={28} /></TouchableOpacity>
          
          ]}
      </View>

      <View style={styles.name}>

     { editPhone ? 
     <View style={styles.cont}>
     <View style={styles.formControl}>
      <Text style = {styles.label}>Phone number: </Text>
      <TextInput 
      style={styles.input}
      onChangeText={
        (text)=>{
        setPhone(text)
        }
      }
      />
      </View> 
      <View style={styles.iconCont}>
        <TouchableOpacity onPress={
          ()=>{
            dispatch(profileActions.UpdateProfile({phone:phone}))
            setEditPhone(false)
          }
        }>
      <Ionicons name={'md-checkmark'} size={28} />
      </TouchableOpacity>
      <TouchableOpacity onPress={
          ()=>{
            setPhone(data.phone)
            setEditPhone(false)
            
          }
        }>
          <Ionicons name={'md-close'} size={28} />
          </TouchableOpacity>
          </View>
          </View>
          :


      [<Text  style={styles.info} >Phone: {phone}</Text>, <TouchableOpacity onPress={()=>{
            setEditPhone(true)
          }}><Ionicons name={'md-create'}   size={28} /></TouchableOpacity> ]
      }
      </View>
      <View style={styles.name}>
     { editDate?  [ <DatePicker
      style={{width: 200}}
      mode="date"
      placeholder="select date"
      format="YYYY-MM-DD"
      minDate="1990-05-01"
      maxDate="2008-06-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
     date={date}
     onDateChange={(date)=>{ setDate(date) }}
     
     
     />,
     <View style={styles.iconCont}>
        <TouchableOpacity onPress={
          ()=>{
            dispatch(profileActions.UpdateProfile({date:date}))
            setEditDate(false)
          }
        }>
      <Ionicons name={'md-checkmark'} size={28} />
      </TouchableOpacity>
      <TouchableOpacity onPress={
          ()=>{
            setEditDate(false)
            setDate(data.date)
          }
        }>
          <Ionicons name={'md-close'} size={28} />
          </TouchableOpacity>
          </View>]:
          
          [<Text  style={styles.info} >Birthday: {date}</Text>, <TouchableOpacity onPress={()=>{
            
            setEditDate(true)
          }}><Ionicons name={'md-create'}   size={28} /></TouchableOpacity> ]}
      </View>
      <View style={styles.name}>
      {editSex ? [ <Picker
  selectedValue={sex}
  style={{ height: 50, width: 200 }}
  onValueChange={(itemValue) =>  setSex(itemValue) }>
  <Picker.Item label="Female" value="female" />
  <Picker.Item label="Male" value="male" />
  <Picker.Item label="Else" value="else" />
</Picker>,
<View style={styles.iconCont}>
        <TouchableOpacity onPress={
          ()=>{
            dispatch(profileActions.UpdateProfile({sex:sex}))
            setEditSex(false)
          }
        }>
      <Ionicons name={'md-checkmark'} size={28} />
      </TouchableOpacity>
      <TouchableOpacity onPress={
          ()=>{
            setEditSex(false)
            setSex(data.sex)
          }
        }>
          <Ionicons name={'md-close'} size={28} />
          </TouchableOpacity>
          </View>] :
[<Text  style={styles.info} >Sex: {sex}</Text>,<TouchableOpacity onPress={()=>{
            setEditSex(true)
}}>
  
  <Ionicons name={'md-create'}   size={28} /></TouchableOpacity> ]
}
      </View>
      </LoginCard>
    </LinearGradient>
  );
}


ProfileScreen.navigationOptions = navData =>   {
  return {
  headerTitle:'Profile',
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name:{
    width:200,
    height:100,
    flexDirection:"row",
    justifyContent:"space-between",
    
  },
  card:{
    width:'80%',
    maxWidth:400,
    maxHeight:400,
    padding:20,

  },
  iconCont:{
    width:60,
    flexDirection:"row",
    height:30,
    justifyContent:"space-between"
   
    
  },
  formControl:{
    width:"100%",
    },
    label:{
    marginVertical:9
    },
    input:{
    paddingHorizontal:2,
    paddingVertical:5,
    borderBottomColor:'#ccc',
    borderBottomWidth:1
    },
    cont:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:200
    },
    info:{
      fontFamily:'lobster-ita',
      fontSize:15
    }
});
export default ProfileScreen;