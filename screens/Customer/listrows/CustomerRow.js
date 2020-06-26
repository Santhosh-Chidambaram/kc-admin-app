import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,

} from "react-native";

import * as Animatable from 'react-native-animatable'




export default function CustomerRow({ item,navigation }){
    const paid = "#00b09b";
    const unpaid = "#F11712";

    return (
     
      <Animatable.View  animation="fadeInLeftBig">
        <TouchableOpacity 
        style={styles.cus}
        onPress={() =>{
       navigation.push('CustomerDetailScreen',{item:item})
     }}>
           <View style={{
             justifyContent:'center',
             alignItems:'center',
             backgroundColor:item.payment_status =='paid'?paid:unpaid,
             height:60,
             width:60,
             borderRadius:50,
             marginLeft:20,
             
             }}>
             <Text style={{color:'white',fontSize:20,}}>{item.id}</Text>
           </View>
           <View style={{paddingLeft:25,}}>
           <Text style={styles.cusHead}>{`${item.name}`}</Text>
           <Text style={{color:'#f80759',fontSize:20,paddingBottom:3}}>Rs.{item.payment_amount}/-</Text>
           
           <Text style={styles.cusText}>{item.stbno}</Text>
           <Text style={styles.cusText}>{item.street}</Text>
  
           </View>
           </TouchableOpacity>
      </Animatable.View>
     
      
    );
  };


  const styles = StyleSheet.create({
    
    cus: {
      width:"97%",
      marginLeft:8,
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      padding:10,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
      borderRadius: 20,
      borderBottomColor: "#d2d2d2",
      marginTop:15,
    },
    cusHead: {
      color: "#8e2de2",
      fontSize: 20,
      fontWeight: "bold",
      width: 240,
      paddingBottom:3
    },
    cusText: {
      fontSize: 20,
      color: "blue",
      width:195,
      paddingBottom:3
      
    },
    
   
  });
  