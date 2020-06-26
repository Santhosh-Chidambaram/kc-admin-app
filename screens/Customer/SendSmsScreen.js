import React, { useState,useEffect, useMemo, useContext, useCallback } from 'react'
import {View,Text,StyleSheet,TouchableOpacity,TextInput,r} from 'react-native'
import {Button,Title} from 'react-native-paper'
import SendSMS from 'react-native-sms'
import {Picker} from '@react-native-community/picker'
function SendSmsScreen({route,navigation}) {
    const {customer} = route.params;
    const [state,setState] = useState({
        tousers:'unpaid',
        msgbody:'',
        street:'ALL',
        distinctstreet:['ALL'],
        contactlist:[]

    })


    const setContactList = (val) =>{
        var resdata;    
        if(val === 'ALL'){
            resdata = customer.map(item =>{
                return(item.phone != null && typeof item.phone !== 'undefined' ?item.phone:null)
            })

        }else{
            resdata = customer.map(item =>{
                if (val === item.street) return(item.phone != null && typeof item.phone !== 'undefined' ?item.phone:null)
            
            })
   
        }

        setState(prevState =>{
            return{
                ...prevState,
                street:val,
                contactlist:resdata.filter(item =>{
                    if(item != null && typeof item !== 'undefined' && item != '0') return item
    
                })
            }
           
        })
       

    }

   

    const  sendSMSToCustomers = () => {
        console.log(state.contactlist)
        SendSMS.send({
            //Message body
            body: state.msgbody != '' ? state.msgbody : 'Dear Customer, Your Cable Tv Payment is pending Please Pay it before 20th of this month,otherwise your STB will be deactivated',
            //Recipients Number
            recipients: state.contactlist,
            //An array of types that would trigger a "completed" response when using android
            successTypes: ['sent', 'queued']
        }, (completed, cancelled, error) => {
            if(completed){
              console.log('SMS Sent Completed');
            }else if(cancelled){
              console.log('SMS Sent Cancelled');
            }else if(error){
              console.log('Some error occured');
            }
        });
        
         
       }
  
   useMemo(() =>{
        setContactList(state.street)
        console.log(state.street)
   },[state.street])    
       
  useEffect(() =>{

     setState({
        ...state,
        distinctstreet:['ALL',...customer.map(item => item.street)
                    .filter((value, index, self) => self.indexOf(value) === index)]
     }
    )

  },[])
  
    return (
        <View style={styles.container}>
            <Title style={{fontSize:21,color:"#8e2de2",paddingLeft:10}}>To : </Title>
            <View>
            <Picker
            selectedValue={state.tousers}
            mode="dropdown"
            style={{ 

              marginLeft:38,
              color:'black',
              fontSize:22,
              fontWeight:'bold',

            }}
            onValueChange={(itemValue, itemIndex) => {
                setState({...state,tousers:itemValue})
            
            }}
          >
        <Picker.Item label="Paid Customers" value="paid" />
        <Picker.Item label="Unpaid Customers" value="unpaid" />
        </Picker>

            </View>
            

        <Title style={{fontSize:21,color:"#8e2de2",paddingLeft:10}}>Street : </Title>    
        <View>
        <Picker
            selectedValue={state.street}
            mode="dropdown"
            style={{ 
             
              marginLeft:38,
              color:'black',
              fontSize:22,
              fontWeight:'bold',

            }}
            onValueChange={(itemValue, itemIndex) => {
                
                setState({
                    ...state,
                    street:itemValue,
                })
                
            }}
          >
        {
            state.distinctstreet.map((obj,id) =>(
                <Picker.Item label={obj} value={obj} key={id}/>
            ))
        }
        </Picker>
        </View>
        

        
        <Title style={{fontSize:20,color:"#8e2de2",paddingLeft:10}}>SMS Body : </Title>
 
            <TextInput
            multiline
            numberOfLines={4}
            placeholder="SMS Text" 
            value={state.msgbody}
            editable
            maxLength={100}
            onChangeText={txt => setState({...state,msgbody:txt})}
            style={{
                marginTop:0,
                borderBottomColor:'#8e2de2',
                borderBottomWidth:2,
                fontSize:19,
                paddingLeft:9,
                
            }}
            />
           
            <TouchableOpacity
            style={styles.sendBtn}
            onPress={sendSMSToCustomers}
            >
                <Text style={{color:'white',fontSize:20}}>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SendSmsScreen
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        backgroundColor:'white',
    },
    sendBtn:{
        marginTop:20,
        backgroundColor:'#8e2de2',
        justifyContent:'center',
        alignItems:'center',
        height:40,
    }
})