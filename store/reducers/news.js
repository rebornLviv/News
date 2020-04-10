import { SET_NEWS } from "../actions/news";

const inittialState = {

    news:[],
}

export default (state =inittialState , action) => {

    switch(action.type){
        case SET_NEWS:
            
            return {
                ...state,
                news: action.news,
                loading:false
            }
        default:
            return state;    
    }
}