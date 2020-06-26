import React from 'react'



const MainReducer = (state,action) =>{

    switch (action.type) {
      case 'GET_CUSTOMERS':
        return {
          ...state,
          customerlist:action.payload
        };
      case 'SET_CDS':
        
          return {
            ...state,
            customerDetails:action.payload,
            customerlist: state.customerlist && state.customerlist.map(t => t.id === action.payload.id ? action.payload : t)
          };
      case 'RESET_CDS':
        return{
          ...state,
          customerDetails:null
        }
      case 'GET_STBS':
        return {
          ...state,
          stblist:action.payload
        };
      case 'GET_PACKAGES':
        return {
          ...state,
          packagelist:action.payload
        };
      case 'GET_CHANNELS':
        return {
          ...state,
          channellist:action.payload
        };
      case 'ON_ADD_STB':
        return {
          ...state,
          onAddStb:action.payload,
  
        }
      case 'ON_ADD_CUS':
          return {
            ...state,
            onAddCus:action.payload,
    
          }
      case 'ERROR_STATUS':
            return {
              ...state,
              error:action.payload,
      
            }
      case 'SET_USER_ID':
        return{
          ...state,
          cid:action.payload
        }
      case 'SET_IS_ADDED':
        return{
          ...state,
          isAdded:action.payload
        }
      case 'SET_IS_EDITED':
          return{
            ...state,
            isEdited:action.payload
          }
      case 'SET_IS_DELETED':
          return{
            ...state,
            isDeleted:action.payload.value,
            delid:action.payload.id,
            customerlist:state.customerlist.filter(cl => cl.id != action.payload.id)
          }
      case 'SET_PACKAGE_COST':
            return{
              ...state,
              packagecost:action.payload
            }
      case 'SET_CHANNEL_COST':
        return{
          ...state,
          channelcost:action.payload
        }
      case 'SET_PACK_ARRAY':
          return{
            ...state,
            packarray:action.payload
          }
      case 'SET_CHANNEL_ARRAY':
            return{
              ...state,
              channelarray:action.payload
            }
      case 'RESET_PACK_DETAILS':
            return{
                ...state,
                packarray:[],
                channelarray:[],
                packagecost:0,
                channelcost:0,
                packagelist:state.packagelist.map(item =>{
                  item.isSelect = false;
                  return item
                }),
                channellist:state.channellist.map(item =>{
                  item.isSelect = false;
                  return item
                })

              }

      default:
        state
    }
  }

export default MainReducer
  