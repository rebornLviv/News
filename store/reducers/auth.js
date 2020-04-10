import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT } from "../actions/auth"
AUTHENTICATE
const inittialState = {

    token:null,
    userId:null
}

export default (state =inittialState , action) => {

    switch(action.type){

        case AUTHENTICATE:
        console.log("aCTION USER id",action.userId)
        return {

            token: action.token,
            userId: action.userId
        }
        case LOGOUT:{
            return inittialState
        }
        default:
            return state;    
    }
}