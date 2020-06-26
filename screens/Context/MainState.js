import React,{useReducer,useContext, useState} from 'react'
import {View,Text,ToastAndroid} from 'react-native'
import {Snackbar} from 'react-native-paper'
import {MainContext} from './MainContext'
import MainReducer from './MainReducer'
import {apiUrl} from '../../Constants'
import {AuthContext} from '../context'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
const MainState = props =>{
  const authContext = useContext(AuthContext)
  const {token} = authContext;

  const _storeData = async (key,res) => {
    try {
      await AsyncStorage.setItem(key,JSON.stringify(res))
      console.log(key+' Data successfully saved')

     
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
   
  };
 


    const initialState = {

        'customerlist':[],
        'customerDetails':null,
        'cid':'',
        'error':'',
        'filtered':'',
        'delid':'',
        'isAdded':false,
        'isDelete':false,
        'isEdited':false,


        'packagelist':[],
        'channellist':[],
        'packarray':[],
        'channelarray':[],
        'packagecost':0,
        'channelcost':0,
      
      }
     const showToast = (res) => {

    ToastAndroid.showWithGravityAndOffset(
      res,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      180
    );
  };
    const[state,dispatch] = useReducer(MainReducer,initialState);


    //Reset
    const resetCustomerDetails = () =>{
      dispatch({type:'RESET_CDS'})
    }
    const resetPackDetails = () =>{
      dispatch({type:'RESET_PACK_DETAILS'})
    }

    //Set States
    const setPackages = (res) =>{
      dispatch({type:'GET_PACKAGES',payload:res})
    }
    const setChannels = (res) =>{
      dispatch({type:'GET_CHANNELS',payload:res})
    }
    const setCustomers = (res) =>{
      dispatch({type:'GET_CUSTOMERS',payload:res})
    }
    const setUserId = (res) =>{
      dispatch({type:'SET_USER_ID',payload:res})
    }


    const setPackArray = (pack) =>{
      dispatch({type:'SET_PACK_ARRAY',payload:pack})
    }
    const setChannelArray = (chan) =>{
      dispatch({type:'SET_CHANNEL_ARRAY',payload:chan})
    }
   
     const setIsAdded = (value) =>{
      dispatch({type:'SET_IS_ADDED',payload:value})
    }
    const setIsDeleted = (value,delid="") =>{
      dispatch({type:'SET_IS_DELETED',payload:{"value":value,"id":delid}})
    }
    const setPackageCost = (cost) =>{
      dispatch({type:'SET_PACKAGE_COST',payload:cost})
    }
    const setChannelCost = (cost) =>{
      dispatch({type:'SET_CHANNEL_COST',payload:cost})
    }
    
    //set error

    const setErrorResponse = (err) =>{
      dispatch({type:'ERROR_STATUS',payload:err})
    }

    //On New Customer Added
    const setCustomerDetails= data =>{
      dispatch({type:'SET_CDS',payload:data})
    }

    const setIsEdited = (val) =>{
      dispatch({type:'SET_IS_EDITED',payload:val})
    }
    const onAddCustomer = ()=>{
      
      getCustomerList()
    }

    //On New Customer Added
    const onAddSetupbox = ()=>{
      getCustomerList()
      
    }
    //Get Customers From Server
    async function getCustomerList() {
        try {
          let response = await fetch(apiUrl+"api/customers", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:"Token "+token
            },
          });
          let res = await response.json();
          if (response.ok) {
            _storeData('customers',res)
            dispatch({type:'GET_CUSTOMERS',payload:res})
          }else{
            dispatch({type:'ERROR_STATUS',payload:res})
          }
        } catch (error) {
            dispatch({type:'ERROR_STATUS',payload:error.messages})
      }
    }

  //Get User ID

  async function getCollectorId(){
    try {
      let response = await fetch(apiUrl + "api/getuserid",{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
        
      })
      let res = await response.json()
      if(response.ok){
        
        _storeData('userid',res["userid"])
        setUserId(res["userid"])
      }else{
          showToast(JSON.stringify(res))
      } 
       
      
    }catch (error) {
      showToast(error)
      
    }
      

  }

  
  //Add Customer Request

  async function postCustomer(cusState) {
    console.log("post Called")
 
    try {
      let response = await fetch(apiUrl + 'api/customers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token,
        },
        body: JSON.stringify({
          lco_admin: '1',
          name: cusState.name.toUpperCase(),
          street: cusState.street.toUpperCase(),
          phone: cusState.phone,
          stbno: cusState.stbno.toUpperCase(),
          customer_type:cusState.customer_type,
          payment_date:moment().format(),
          payment_amount: cusState.payment_amount,
          additional_price:cusState.additional_price,
          payment_status:cusState.payment_status == true?'paid':'unpaid',
          packages:state.packarray,
          channels:state.channelarray,
          gst_price:cusState.gst_price,
        }),
      });
      let res = await response.json()
      if (response.ok) {
        resetPackDetails();
        setIsAdded(true)
        showToast("Customer Added Successfully")

      } else if (response.status == 400) {
        showToast(JSON.stringify(res))

      } else if (response.status == 403) {
        showToast(JSON.stringify(res))

      }
       else {
        showToast("Something Went Wrong ! Please Try Again Later .")
      }
    } catch (error) {
      showToast(error.messages)
      
    }
  }
 

    //Packages

    //Get Packages
    async function getPackagesList() {
      console.log('called')
      try {
        let response = await fetch(apiUrl+"api/packages", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:"Token "+token
          },
        });
        let res = await response.json();
        if (response.ok) {
          res = res.map(item =>{
            item.isSelect = false;
            return item
          })

          _storeData('packages',res)
          dispatch({type:'GET_PACKAGES',payload:res})
        }else{
          dispatch({type:'ERROR_STATUS',payload:res})
        }
      } catch (error) {
          dispatch({type:'ERROR_STATUS',payload:error.messages})
    }
  }
  async function getChannelsList() {
    try {
      let response = await fetch(apiUrl+"api/channels", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:"Token "+token
        },
      });
      let res = await response.json();
      if (response.ok) {

        res = res.map(item =>{ 
            item.isSelect=false;
            return item
        })
       
        _storeData('channels',res)
        dispatch({type:'GET_CHANNELS',payload:res})
      }else{
        dispatch({type:'ERROR_STATUS',payload:res})
      }
    } catch (error) {
        dispatch({type:'ERROR_STATUS',payload:error.messages})
  }
}
 

    return(
        <MainContext.Provider value={{
            customerlist:state.customerlist,
            packagelist:state.packagelist,
            channellist:state.channellist,
            packagecost:state.packagecost,
            channelcost:state.channelcost,
            error:state.error,
            customerDetails:state.customerDetails,
            isAdded:state.isAdded,
            isEdited:state.isEdited,
            isDeleted:state.isDeleted,
            delid:state.delid,
            cid:state.cid,
            setUserId,
            setIsAdded,
            setIsDeleted,
            setIsEdited,
            //Customers Functions
            setCustomerDetails,
            getCustomerList,
            getCollectorId,
            onAddCustomer,
            onAddSetupbox,
            postCustomer,


            packarray:state.packarray,
            channelarray:state.channelarray,
            setChannelArray,
            setPackArray,
            getChannelsList,
            getPackagesList,
            setPackageCost,
            setChannelCost,
            resetPackDetails,
            resetCustomerDetails,
            setPackages,
            setChannels,
            setCustomers,
            

        }}>
            {props.children}
        </MainContext.Provider>

    )
}

export default MainState;