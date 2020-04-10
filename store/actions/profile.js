
export const FETCH_PROFILE ='FETCH_PROFILE'
export const SET_PROFILE ='SET_PROFILE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

export  const FetchProfile =  (id) => {

    return async dispatch => {
         try{
             const response = await  fetch(`https://rn-news-app-2cfb6.firebaseio.com/user/${id}.json`,
             {
                method:'GET',
             });
             if(!response.ok){
                 console.log('not ok')
              throw new Error('something went wrong');     
             }
     const resData = await response.json();
     console.log('resDataFetch',resData)
    let profile ={
    }
    for(const key in resData){
        console.log(key)
        profile.name = resData[key].name,
        profile.sex = resData[key].sex,
        profile.phone = resData[key].phone,
        profile.date = resData[key].date
        profile.prId = key
    }

 console.log('profile',profile)
   
     dispatch({
          type: SET_PROFILE,
           profile:profile
    
       })
         }
         catch (error){
           throw error;  
         }
        
 
 
     }
 
 }
 export  const UpdateProfile =  (profileInfo) => {

    return async (dispatch,getState) => {
       let  id = getState().auth.userId;
       let prId = getState().profile.profile.prId;
         try{
             const response = await  fetch(`https://rn-news-app-2cfb6.firebaseio.com/user/${id}/${prId}.json`,
             {
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                   },
                   body:JSON.stringify(profileInfo)
             });
             if(!response.ok){
                 console.log('not ok')
              throw new Error('something went wrong');     
             }
     const resData = await response.json();
     console.log('resData',resData)

 
             dispatch( FetchProfile(id))
    //   dispatch({
    //       type: SET_PROFILE,
    //       profile:profileInfo,
    
    //   })
         }
         catch (error){
           throw error;  
         }
        
 
 
     }
 
 }


 export  const CreateProfile =  (id)=> {
     console.log("createProfile")
    let profile = {
        name : '' , sex: "" , phone: "" , date: ''
    }
    return async dispatch => {
         try{
             const response = await  fetch(`https://rn-news-app-2cfb6.firebaseio.com/user/${id}.json`,
             {
                method:'POST',
                headers:{
                 'Content-Type':'application/json'
                },
                body:JSON.stringify(profile)
             });
             if(!response.ok){
                 console.log('not ok')
              throw new Error('something went wrong');     
             }
     const resData = await response.json();
     console.log('resData',resData)


 
   
      dispatch({
          type: SET_PROFILE,
          profile:{name : '' , sex: "" , phone: "" , date: '',prId:resData.name},
    
      })
         }
         catch (error){
           throw error;  
         }
        
 
 
     }
 
 }
 