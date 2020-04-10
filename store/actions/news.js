import News from "../../models/news"

export const FETCH_NEWS ='FETCH_NEWS'
export const SET_NEWS ='SET_NEWS'


export  const FetchNews =  () => {

    return async dispatch => {
         try{
             const response = await  fetch(`https://rn-news-app-2cfb6.firebaseio.com/news.json`,
             {
                method:'GET',
             });
             if(!response.ok){
                 console.log('not ok')
              throw new Error('something went wrong');     
             }
     const resData = await response.json();
     console.log('resData',resData)
     const loadedNews = [];
 
     for ( const key in resData ) {
 
         loadedNews.push(new News(key,
            resData[key].title,resData[key].imgSrc,
            resData[key].description,
            resData[key].published))
     }
      dispatch({
          type: SET_NEWS,
          news:loadedNews,
    
      })
         }
         catch (error){
           throw error;  
         }
        
 
 
     }
 
 }
 