import React, { useState,useRef, useContext, useMemo } from 'react';
import {View, Text, StyleSheet,ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FIcon from 'react-native-vector-icons/FontAwesome'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import EIcon from 'react-native-vector-icons/Entypo'
import {Appbar,Divider,Button,TextInput,Switch,Colors,Snackbar,Provider,FAB} from 'react-native-paper'
import moment from 'moment'
import * as Animatable from 'react-native-animatable'
import { MainContext } from './Context/MainContext';

function AddCustomerScreen({navigation}) {
    
  //Context
  const mainContext = useContext(MainContext)
  const {postCustomer,snackVisible,snackText,resetSnackDetails,snackColor} = mainContext;


    var end_date = moment().add(4,'M').utcOffset("+05:30").format("YYYY-MM-DD");
    const floatRef = useRef()
    const [cusDetails,setCusDetails] = useState({
        name:'',
        stbno:'',
        street:'',
        phone:'',
        payment_amount:'180',
        payment_status:true,

    })

    const showSnackBar = useMemo(() =>{
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:70}}>
        <Snackbar
                duration={3000}
                visible={snackVisible}
                onDismiss={() => resetSnackDetails()}
                style={{backgroundColor: snackColor == true?'#00b09b':'red'}}>
                {snackText}
              </Snackbar>
      </View>
      )
    },[snackVisible])
    return(
      <Provider>
        <ScrollView  contentContainerStyle={{height:'100%'}}>
         <Appbar.Header>
            <Appbar.BackAction 
            onPress={() => navigation.pop()} size={25} />
            <Appbar.Content title={"Add Customer"}  style={{paddingLeft:55}}  />
           
             
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
        value={cusDetails.payment_amount}
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

      </View>
      <View style={styles.item}>
      <MIcon name="add-shopping-cart" color="black" size={30} style={styles.icon}/>
      <TextInput 
        underlineColor="#8e2de2"
        label="Additional Price"
        value={cusDetails.add_price}
        onChangeText={txt => setCusDetails({...cusDetails,add_price:txt})}
        style={styles.textInput}
         />

      </View>     
     
     <View>
     <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingLeft:50,marginTop:20,}}>
           <View style={{flexDirection:'column'}}>
           <Text style={styles.key}>
            Packages :{'            '}
                
            </Text>
            <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />0/-</Text>
           </View>
           <View style={{flexDirection:'column'}}>
           <Text style={styles.key}>
            Channels :{'             '}
               
            </Text>
            <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />0/-</Text>
           </View>
            
            
      </View>
      
      <Button  
        mode="contained" 
        icon="cart"
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

     
      <View style={{justifyContent:'center',alignItems:'center',marginBottom:20}}>
          <Text style={styles.key}>FTA + Packages + Channels</Text>
          <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />0/-</Text>
      </View> */}

       <View style={{
           backgroundColor:cusDetails.payment_status == true?Colors.greenA700:Colors.redA400,
           flexDirection:'row',
           justifyContent:'center',
           alignItems:'center',
           height:45,
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
          

      
        <FAB
          style={styles.fab}
          color="white"
          label="Save Customer"
          large
          icon="content-save"
          onPress={() =>postCustomer(cusDetails)}
        />
              
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
     {showSnackBar}
        </View>
        
                    
    </View>
    </ScrollView>
    </Provider>

    )
    
 }

export default AddCustomerScreen;
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: -8,
    backgroundColor:'#8e2de2'
  },
  
});