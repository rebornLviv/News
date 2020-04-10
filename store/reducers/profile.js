import { SET_PROFILE, UPDATE_PROFILE } from "../actions/profile";

const inittialState = {
    profile:{
    name:'',
    phone:'',
    date:'',
    sex:'',
    prId:''
    }
}

export default (state =inittialState , action) => {

    switch(action.type){
     case   SET_PROFILE:
         console.log('aprof',action.profile)
         return{
             ...state,
             profile: action.profile
         }    
        default:
            return state;    
    }
}