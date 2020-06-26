import React, { useState,useRef, useContext, useMemo, useEffect } from 'react';
import {View, Text, StyleSheet,ScrollView, TouchableOpacity,ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FIcon from 'react-native-vector-icons/FontAwesome'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import {Appbar,Divider,Button,TextInput,Switch,Colors,Snackbar,Provider,FAB} from 'react-native-paper'
import moment from 'moment'
import * as Animatable from 'react-native-animatable'
import { MainContext } from '../Context/MainContext';
import { AuthContext} from '../context';
import {apiUrl} from '../../Constants'
import {Picker} from '@react-native-community/picker'
function EditCustomerScreen({route,navigation}) {
    const {cusDetail} = route.params;
  //Context
  const mainContext = useContext(MainContext)
  const {resetPackDetails,packagecost,channelcost,setCustomerDetails,packarray,channelarray} = mainContext;


  
  const authContext = useContext(AuthContext)
  const {token} = authContext;

    //var end_date = moment().add(4,'M').utcOffset("+05:30").format("YYYY-MM-DD");
    var sp = cusDetail.name.indexOf(' ') || cusDetail.name.indexOf('.');
    const [hideedit,setHideEdit] = useState(false)
    const [cusDetails,setCusDetails] = useState({
        name:cusDetail.name,
        stbno:cusDetail.stbno,
        street:cusDetail.street,
        gst_price:cusDetail.gst_price,
        phone:cusDetail.phone != null ?cusDetail.phone.toString():'',
        payment_amount:'180',
        payment_status:cusDetail.payment_status =='paid' ?true:false,
        box_status:cusDetail.box_status == 'active'?true:false,
        additional_price:(cusDetail.additional_price).toString(),
        customer_type:cusDetail.customer_type,
        deactivate_reason:cusDetail.deactivate_reason,
        

    })


    useMemo(() =>{
      if(channelcost != 0 || packagecost !=0){
        setCusDetails({
          ...cusDetails,
          additional_price:(packagecost+channelcost).toFixed(0)
        })
      }
      
  },[packagecost,channelcost])

     //Toast for All responses
  const showToast = res => {
    ToastAndroid.showWithGravityAndOffset(
      res,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      200,
    );
  };

    //Send Update Details To Server
  async function updateCustomerDetails() {
    var ph = /^\d+$/.test(cusDetails.phone);
   
    try 
      { 
            let response = await fetch(apiUrl+'api/customers/'+cusDetail.id, {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Token ' + token,
                },
                body: JSON.stringify({
                  name: cusDetails.name,
                  street: cusDetails.street,
                  phone: ph ? cusDetails.phone : '0',
      
                  customer_type:cusDetails.customer_type,
                  additional_price:cusDetails.additional_price,
  
                  
                  stbno: cusDetails.stbno,
                  gst_price:cusDetails.gst_price,
                  packages:packarray,
                  channels:channelarray,
                }),
              })
            let res = await response.json()

            if (response.ok) {
                
                setCustomerDetails(res)
                resetPackDetails()
                navigation.pop()
                showToast("Customer Details Updated Successfully")
                
      } else if (response.status == 400) {
       
  
          showToast(JSON.stringify(res));
        }
        else {

            showToast('No response from the server');
    
          }
      } 
    
       catch (error) {

      showToast(error.message);

    }
  }


    function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}){
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
   }
   
   
   
   function isCloseToTop({layoutMeasurement, contentOffset, contentSize}){
      return contentOffset.y == 0;
   }

    return(
      <View style={{flex:1,}}>
        
        <View style={styles.float}>
        
      <FAB
        style={styles.fab}
        large
        label={hideedit == false ? 'Save Customer':null}
        icon='account-check'
        onPress={() => updateCustomerDetails()}
      />
      
          
      </View> 

      
     
        <ScrollView  
        onScroll={({nativeEvent})=>{
          if(isCloseToTop(nativeEvent)){
              setHideEdit(false)
          }
          if(isCloseToBottom(nativeEvent)){
            setHideEdit(true)
          }
          }}>
         <Appbar.Header>
            <Appbar.BackAction 
            onPress={() => {
              navigation.pop()
              resetPackDetails()
              }} size={25} />
            <Appbar.Content title={"Edit Customer"}  style={{paddingLeft:55}}  />
           
             
        </Appbar.Header>
          
    <View style={styles.container}>
    <View style={{justifyContent:'center',alignItems:'center'}}>
      
          
    <View style={{
           justifyContent:'center',
           alignItems:'center',
           height:60,
           width:60,
           borderRadius:50,
           marginTop:5,
           marginBottom:8,
           backgroundColor:'#8e2de2'
           
           }}>
           <Text style={{color: 'white', fontSize: 28}}>
                {cusDetails.name.charAt(0)}
                {sp > 1 ? cusDetails.name.charAt(sp + 1) : null}
              </Text>
         </View>
         
    </View>
    
      <Divider/>
     
       
      <View style={{marginTop:15}}>
      
      <View style={styles.item}>
        <FIcon name="user" color="black" size={35} style={{paddingRight:20,paddingTop:20}}/>
        <TextInput 
            
            underlineColor="#8e2de2"
            label="Customer Name"
            value={cusDetails.name}
            onChangeText={txt => setCusDetails({...cusDetails,name:txt})}
            style={styles.textInput}
            />     

      </View>

      <View style={styles.item}>
      <Icon name="set-top-box" color="black" size={35} style={styles.icon}/>
      <TextInput 
        underlineColor="#8e2de2"
        label="STB Number"
        value={cusDetails.stbno}
        onChangeText={txt => setCusDetails({...cusDetails,stbno:txt})}
        style={styles.textInput}
         />     

      </View>

      <View style={styles.item}>
      <Icon name="home-city-outline" color="black" size={30} style={styles.icon}/>
      <TextInput 
      underlineColor="#8e2de2"
        label="Street"
        value={cusDetails.street}
        onChangeText={txt => setCusDetails({...cusDetails,street:txt})}
        style={styles.textInput}
         />

      </View>
      <View style={styles.item}>
      <Icon name="cellphone" color="black" size={30} style={styles.icon}/>
      <TextInput 
      underlineColor="#8e2de2"
        label="Phone"
        value={cusDetails.phone}
        onChangeText={txt => setCusDetails({...cusDetails,phone:txt})}
        style={styles.textInput}
         />
           
      </View>
      <View style={styles.item}>
      <FIcon name="rupee" color="black" size={30} style={styles.icon}/>
      <TextInput 
      keyboardType="numeric"
      underlineColor="#8e2de2"
        label="Payment Amount"
        value={cusDetails.payment_amount}
        onChangeText={txt => setCusDetails({...cusDetails,payment_amount:txt})}
        style={styles.textInput}
         />
           
      </View>
       

      
      
     
     <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:18,color:'black'}}> Customer Type </Text>
         <Picker
            selectedValue={cusDetails.customer_type}
            mode="dropdown"
            style={{ 
              height: 50, 
              width: 280,
              marginBottom:10,
              color:'black',
              fontSize:22,
              fontWeight:'bold',


            
            }}
            onValueChange={(itemValue, itemIndex) => setCusDetails({...cusDetails,customer_type:itemValue})}
          >
        <Picker.Item label="Normal" value="normal" />
        <Picker.Item label="Internet" value="internet" />
      </Picker>
      </View>     
     
     <View>
     <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingLeft:50,marginTop:20,}}>
           <View style={{flexDirection:'column'}}>
           <Text style={styles.key}>
            Packages :{'            '}
                
            </Text>
          <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />{packagecost}/-</Text>
           </View>
           <View style={{flexDirection:'column'}}>
           <Text style={styles.key}>
            Channels :{'             '}
               
            </Text>
          <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />{channelcost}/-</Text>
           </View>
            
            
      </View>
      
      <Button  
        mode="contained" 
        icon="cart"
        onPress={() => navigation.navigate('Add Packages')}
        style={{
            borderRadius:20,
            height:45,
            alignItems:'center',
            justifyContent:'center',
            marginBottom:15,
            marginTop:20,
            
            }}>
            Select Channels & Packs
     </Button>
     </View>

     <View style={styles.item}>
      <MIcon name="add-shopping-cart" color="black" size={30} style={styles.icon}/>
      <TextInput 

        underlineColor="#8e2de2"
        label="Additional Price"
        value={cusDetails.additional_price}
        onChangeText={txt => setCusDetails({...cusDetails,additional_price:txt})}
        style={styles.textInput}
         />

      </View>  

       <View style={styles.item}>
      <FIcon name="dollar" color="black" size={30} style={styles.icon}/>
      <TextInput 
      underlineColor="#8e2de2"
        label="GST Price"
        value={cusDetails.gst_price.toString()}
        onChangeText={txt => setCusDetails({...cusDetails,gst_price:txt})}
        style={styles.textInput}
         />

      </View>



      <View style={{justifyContent:'center',alignItems:'center',marginBottom:20}}>
          <Text style={styles.key}>FTA + Packages + Channels</Text>
          <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />{parseInt(cusDetails.payment_amount)+parseInt(cusDetails.additional_price != ''?cusDetails.additional_price:'0')+parseInt(cusDetails.gst_price)}/-</Text>
      </View>

       <View style={{
           backgroundColor:cusDetails.payment_status == true?Colors.greenA700:Colors.redA400,
           flexDirection:'row',
           justifyContent:'center',
           alignItems:'center',
           height:40,
           borderRadius:20,
           
           
           }}>
                <Text style={{color:'white',fontSize:21}}>{cusDetails.payment_status == true ?'Paid':'Not Paid'}</Text>
            <Switch
                    value={cusDetails.payment_status}
                    color='white'
                    style={{marginLeft:20,}}
                    // onValueChange={() => {
                    //     setCusDetails(prevState =>{
                    //         return{
                    //             ...prevState,
                    //             payment_status : !prevState.payment_status
                    //         }
                    //     })
                    // }}
                />
           
        </View> 
        <View style={{
           backgroundColor:cusDetails.box_status == true?'#00b09b':'red',
           flexDirection:'row',
           justifyContent:'center',
           alignItems:'center',
           height:40,
           borderRadius:20,
           marginTop:20,
           
           
           }}>
                <Text style={{color:'white',fontSize:21}}>{cusDetails.box_status == true ?'Activated':'Deactivated'}</Text>
            <Switch
                    value={cusDetails.box_status}
                    color='white'
                    style={{marginLeft:20,}}
                    onValueChange={() => {
                        setCusDetails(prevState =>{
                            return{
                                ...prevState,
                                box_status : !prevState.box_status
                            }
                        })
                    }}
                />
           
        </View> 
        {
          cusDetails.box_status
          ?
          null
          :
          <View style={styles.item}>
          <MIcon name="report-problem" color="black" size={30} style={styles.icon}/>
          <TextInput 

            underlineColor="#8e2de2"
            label="Deactivate Reason"
            value={cusDetails.deactivate_reason}
            onChangeText={txt => setCusDetails({...cusDetails,deactivate_reason:txt})}
            style={styles.textInput}
            />

          </View>  
        }
        
      
    
              
        {/* <Button  
        mode="contained" 
        icon="content-save"
        style={{
            borderRadius:20,
            height:45,
            alignItems:'center',
            justifyContent:'center',
            marginBottom:15,
            marginTop:20,
            backgroundColor:Colors.pinkA200,
            
            }}
          onPress={()=> {
            
            postCustomer(cusDetails)
          
          }}
          >
            Save Customer
     </Button> */}
    
        </View>
        
                    
    </View>
    </ScrollView>
    </View>
 
    )
    
 }

export default EditCustomerScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding:10,
  },
  key:{
  
      fontSize:20,
      color:'#8e2de2',
      letterSpacing:1,
      paddingBottom:13,
      
  },
  cusText:{
    color:'black',
    fontSize:20,
    
    
  },
  item:{
      
      flexDirection:'row',
      justifyContent:'flex-start',
      marginBottom:15,
  },
  textInput:{
      height:60,
      width:320,
      fontSize:20,
      backgroundColor:'transparent',
      
      

  },
  icon:{
      paddingTop:20,
      paddingRight:10,
  },
  saveBtn: {
 
    backgroundColor:'#8e2de2',
    borderRadius:30,
    padding:12,
    borderColor:'#8e2de2',
    borderWidth:2,
    

  },
  float:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    position: 'absolute',
    zIndex:200,
    margin: 16,
    right: 0,
    bottom: 0,

  },
  fab: {
    backgroundColor:'#8e2de2'
  },
  
});