import React, { useState,useRef, useContext, useMemo, useEffect } from 'react';
import {View, Text, StyleSheet,ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FIcon from 'react-native-vector-icons/FontAwesome'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import EIcon from 'react-native-vector-icons/Entypo'
import {Appbar,Divider,Button,TextInput,Switch,Colors,Snackbar,Provider,FAB} from 'react-native-paper'
import moment from 'moment'
import {Picker} from '@react-native-community/picker'
import { MainContext } from '../Context/MainContext';

function AddCustomerScreen({navigation}) {
    
  //Context
  const mainContext = useContext(MainContext)
  const {postCustomer,packagecost,channelcost,
    resetPackDetails,isAdded,setIsAdded
  } = mainContext;

    const [hideedit,setHideEdit] = useState(false)
    const [cusDetails,setCusDetails] = useState({
        name:'',
        stbno:'',
        street:'',
        phone:'',
        payment_amount:180,
        payment_status:true,
        additional_price:0,
        customer_type:'normal',
        gst_price:0,

    })

    useEffect(() =>{
        if(isAdded){
          setCusDetails({
            name:'',
            stbno:'',
            street:'',
            phone:'',
            payment_amount:180,
            payment_status:true,
            additional_price:0,
            customer_type:'normal',
            gst_price:0,
          })

          setIsAdded(false)

        }
    },[isAdded])

    useMemo(() =>{
        setCusDetails({
          ...cusDetails,
          additional_price:(packagecost+channelcost).toFixed(0)
        })
    },[packagecost,channelcost])

  

    function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}){
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
   }
   
   
   
   function isCloseToTop({layoutMeasurement, contentOffset, contentSize}){
      return contentOffset.y == 0;
   }

    return(
      <View style={{flex:1,backgroundColor: 'white',}}>
        
        <View style={styles.float}>
        
      <FAB
        style={styles.fab}
        large
        label={hideedit == false ? 'Save Customer':null}
        icon='account-check'
        onPress={() => postCustomer(cusDetails)}
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
            <Appbar.Content title={"Add Customer"}  style={{paddingLeft:55,}}  />
           
             
        </Appbar.Header>
          
    <View style={styles.container}>
    <View style={{justifyContent:'center',alignItems:'center'}}>
      
          
    <View style={{
           justifyContent:'center',
           alignItems:'center',
           height:90,
           width:90,
           borderRadius:50,
           marginTop:5,
           marginBottom:8,
           backgroundColor:'#8e2de2'
           
           }}>
           <EIcon name="add-user" color="white" size={50}/>
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
        value={cusDetails.payment_amount.toString()}
        onChangeText={txt => setCusDetails({...cusDetails,payment_amount:txt})}
        style={styles.textInput}
         />
           
      </View>
       

      
      
      {/* <View style={styles.item}>
      <FIcon name="money" color="black" size={30} style={styles.icon}/>
      <TextInput 
      underlineColor="#8e2de2"
        label="Base Price"
        value={cusDetails.base_price}
        onChangeText={txt => setCusDetails({...cusDetails,base_price:txt})}
        style={styles.textInput}
         />

      </View> */}
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
        value={cusDetails.additional_price.toString()}
        onChangeText={txt => setCusDetails({...cusDetails,additional_price:txt})}
        style={styles.textInput}
         />

      </View>  

     <View style={styles.item}>
      <MIcon name="add-shopping-cart" color="black" size={30} style={styles.icon}/>
      <TextInput 
        keyboardType="numeric"
        underlineColor="#8e2de2"
        label="GST Price"
        value={cusDetails.gst_price.toString()}
        onChangeText={txt => setCusDetails({...cusDetails,gst_price:txt})}
        style={styles.textInput}
         />

      </View> 
      
      <View style={{justifyContent:'center',alignItems:'center',marginBottom:20}}>
          <Text style={styles.key}>FTA + Packages + Channels</Text>
          <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />{parseInt(cusDetails.payment_amount)+parseInt(cusDetails.additional_price)+parseInt(cusDetails.gst_price)}/-</Text>
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
                    onValueChange={() => {
                        setCusDetails(prevState =>{
                            return{
                                ...prevState,
                                payment_status : !prevState.payment_status
                            }
                        })
                    }}
                />
           
        </View> 
        <View style={{
           backgroundColor:cusDetails.payment_status == true?'#00b09b':'red',
           flexDirection:'row',
           justifyContent:'center',
           alignItems:'center',
           height:40,
           borderRadius:20,
           marginTop:20,
           
           
           }}>
                <Text style={{color:'white',fontSize:21}}>{cusDetails.payment_status == true ?'Activated':'Deactivated'}</Text>
            <Switch
                    value={cusDetails.payment_status}
                    color='white'
                    style={{marginLeft:20,}}
                    onValueChange={() => {
                        setCusDetails(prevState =>{
                            return{
                                ...prevState,
                                payment_status : !prevState.payment_status
                            }
                        })
                    }}
                />
           
        </View> 

   
        </View>
        
                    
    </View>
    </ScrollView>
    </View>
 
    )
    
 }

export default AddCustomerScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
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