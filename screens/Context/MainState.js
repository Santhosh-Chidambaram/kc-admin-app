import React,{useReducer,useContext} from 'react'
import {MainContext} from './MainContext'
import MainReducer from './MainReducer'
import {apiUrl} from '../../Constants'
import {AuthContext} from '../context'
const MainState = props =>{
  const authContext = useContext(AuthContext)
  const {token} = authContext;

    const initialState = {
        
        'stblist':[],
        'customerlist':[],
        'error':'',
        'filtered':'',
        'snackVisible':false,
        'snackText':'',
        'snackColor':true,
      
      }
    
    const[state,dispatch] = useReducer(MainReducer,initialState);
    //Snack
     const setSnackDetails = (snack) =>{
        dispatch({type:'SET_SNACK',payload:snack})
     }

     const resetSnackDetails = () =>{
       dispatch({type:'RESET_SNACK'})
     }
    
    //set error

    const setErrorResponse = (err) =>{
      dispatch({type:'ERROR_STATUS',payload:err})
    }

    //On New Customer Added
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
            
            dispatch({type:'GET_CUSTOMERS',payload:res.results})
          }else{
            dispatch({type:'ERROR_STATUS',payload:res.results})
          }
        } catch (error) {
            dispatch({type:'ERROR_STATUS',payload:error.messages})
      }
    }

    //Delete customer Request
  async function deleteCustomerDetails(delid) {
    try {
      let response = await fetch(apiUrl + 'api/customers/' + delid, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token,
        },
      });

      if (response.ok) {
        setSnackText('Customer Deleted Successfully');
        setVisible(true);
      } else if (response.status == 400) {
        setSnackText('Something went wrong');
        setVisible(true);
      }
    } catch (error) {
      showToast(error.message);
    }
  }
  //Send Update Details To Server
  async function updateCustomerDetails(cusState) {
    var isnum = /^\d+$/.test(cusState.stbno);
    var ph = /^\d+$/.test(cusState.phone);
    let response;
    try {
      {
        isnum
          ? (response = await fetch(apiUrl + 'api/customers/' + cusState.id, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token,
              },
              body: JSON.stringify({
                name: cusState.name,
                street: cusState.street,
                phone: ph ? cusState.phone : '0',
                payment_amount: cusState.payment_amount,
                setupbox: stbno,
              }),
            }))
          : (response = await fetch(apiUrl + 'api/customers/' + id, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token,
              },
              body: JSON.stringify({
                name: cusState.name,
                street: cusState.street,
                payment_amount: cusState.payment_amount,
                phone: ph ? cusState.phone : '0',
              }),
            }));
      }

      if (response.ok) {
        setOnAddCus(true);
        setOnEdit(false);
        editfilter();
        setSnackText('Customer Detail Update Successfully');
        setVisible(true);
      } else if (response.status == 400) {
        let res = await response.json();
        setModalVisible(!modalVisible);
        setOnEdit(false);
        if (res.setupbox) {
          showToast('This Setupbox is already assigned');
        } else {
          showToast(JSON.stringify(res));
        }
        CustomerResetFunction(); //Reset Customer State
      } else {
        setModalVisible(!modalVisible);
        setOnEdit(false);
        showToast('No response from the server');
        CustomerResetFunction(); //Reset Customer State
      }
    } catch (error) {
      setModalVisible(!modalVisible);
      setOnEdit(false);
      showToast(error.message);
      CustomerResetFunction(); //Reset Customer State
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
          setupbox: cusState.stbno,
          payment_amount: cusState.payment_amount,
          payment_status:cusState.payment_status == true?'paid':'unpaid'
        }),
      });
      let res = await response.json()
      if (response.ok) {
          var snack = {
            "snackVisible":true,
            "snackText":'Customer Added Successfully',
            'snackColor':true,

          }
          setSnackDetails(snack)
      } else if (response.status == 400) {
        var snack = {
          "snackVisible":true,
          "snackText":JSON.stringify(res),
          'snackColor':false,
        }
        setSnackDetails(snack)
        setErrorResponse(res)
      } else {
        setErrorResponse("Something Went Wrong ! Please Try Again Later .")
      }
    } catch (error) {
      setErrorResponse(error.messages)
      
    }
  }
    return(
        <MainContext.Provider value={{
            customerlist:state.customerlist,
            stblist:state.stblist,
            error:state.error,
            snackVisible:state.snackVisible,
            snackText:state.snackText,
            snackColor:state.snackColor,
            setSnackDetails,
            resetSnackDetails, 
            getCustomerList,
            deleteCustomerDetails,
            onAddCustomer,
            onAddSetupbox,
            postCustomer

        }}>
            {props.children}
        </MainContext.Provider>

    )
}

export default MainState;