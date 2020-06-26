import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList
} from "react-native";

import * as Animatable from 'react-native-animatable'
import moment from 'moment'

export default function CollectedRow({item,index}){
  return(
        <Animatable.View style={styles.cus} animation="fadeInLeftBig">
        <Text style={{position:'absolute',top:7,right:10,color:'black',fontSize:16,fontWeight:'bold'}}>{moment(item.collected_date).format('LT')}</Text>
         <View style={{
           justifyContent:'center',
           alignItems:'center',
           backgroundColor:'#8e2de2',
           height:60,
           width:60,
           borderRadius:50,
           marginLeft:20,
           
           }}>
           <Text style={{color:'white',fontSize:20,}}>{index+1}</Text>
         </View>
         <View style={{paddingLeft:25,paddingTop:15}}>
         <Text style={styles.cusHead}>{item.customer}</Text>
         <Text style={{color:'red',fontSize:20,paddingBottom:7}}>Rs.{item.collected_amount}/-</Text>
         <Text style={styles.cusText}>{item.street}</Text>

         </View>
   
    </Animatable.View>
      

  )
}

const styles = StyleSheet.create({

    cus: {
      width:"97%",
      marginLeft:8,
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      padding:15,
      backgroundColor: "rgb(255,255,255)",
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
      paddingBottom:7
    },
    cusText: {
      fontSize: 20,
      color:'black',
      width:260,
      paddingBottom:1
      
    },
  });
  