import React from 'react'



const MainReducer = (state,action) =>{
    switch (action.type) {
      case 'GET_CUSTOMERS':
        return {
          ...state,
          customerlist:action.payload
        };
      case 'GET_STBS':
        return {
          ...state,
          stblist:action.payload
        };
      case 'ON_ADD_STB':
        return {
          
          onAddStb:action.payload,
  
        }
      case 'ON_ADD_CUS':
          return {
            
            onAddCus:action.payload,
    
          }
      case 'ERROR_STATUS':
            return {
              ...state,
              error:action.payload,
      
            }
      case 'SET_SNACK':
        
        return{
          ...state,
          snackVisible:action.payload.snackVisible,
          snackText:action.payload.snackText,
          snackColor:action.payload.snackColor
        };
      case 'RESET_SNACK':
        return{
          
          snackVisible:false,
          snackText:'',
          snackColor:true,
        }
       
      default:
        state
    }
  }

export default MainReducer
  