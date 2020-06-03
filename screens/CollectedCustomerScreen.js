import React, { useState, useEffect } from "react";
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

import { apiUrl } from "../Constants";
const moment = require('moment');



const RenderItem = ({item,index}) =>{
  return(
  
    <View style={styles.box}>
      <Text style={{position:'absolute',top:10,right:20,color:'black',fontSize:18,fontWeight:'bold'}}>{index+1}</Text>
        <Text style={styles.boxValue}>{item.customer_name}</Text>
        <Text style={styles.boxText}>{item.street}</Text>
        <Text style={styles.boxText}>Rs.{item.collected_amount}</Text>
    
      
    </View>
  )
}



export default function CollectedCustomerScreen() {
  const today = moment().format('DD-MM-YYYY');
  const [state, setState] = useState({
    collectedCustomers: [],
    collected_count: 0,
    total_amount:0,
  });

  useEffect(() => {

    async function getCollections() {
      try {
        let response = await fetch(apiUrl + "api/collectedcustomers");
        let res = await response.json();
        var total = 0
        res.cc.map(col =>{
          total+=col.collected_amount

        })
        setState({
          collectedCustomers: res.cc,
          collected_count: res.ccount,
          total_amount:total
          
        });

      }catch (error) {
        console.log(error);
      }
    }

    getCollections();
  },[]);


  const RenderFooter = () =>{
    return(
      <View style={styles.footer}>
              <Text style={styles.footerText}>Todays Collection : <Text style={styles.boxValue}>Rs.{state.total_amount}</Text> </Text>
        </View>
    )
  }
  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.boxContent}>
              <Text style={styles.date}>COLLECTED :
                <Text style={styles.head}> {state.collected_count}</Text>
              </Text>
              <Text style={styles.date}>DATE :
                <Text style={styles.head}> {today}</Text>
              </Text>
        </View>
        <FlatList 
        data={state.collectedCustomers}
        renderItem={RenderItem}
        keyExtractor={(item,index) => item.id.toString()}
        ListFooterComponent={RenderFooter}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#fff",
    height: "100%",
  },
  container: {
    height: "100%",
    backgroundColor: "#7F00FF",
    paddingTop:10,
  },
  box: {
    flexDirection: "column",
    width:Dimensions.get('window').width,
    padding: 12,
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
    marginTop:5,
    marginBottom:5,

  },
  boxContent: {
      flexDirection: "row",
      justifyContent:'space-between',
      width:Dimensions.get('window').width,
      padding: 15,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 8,
      borderRadius: 20,
      marginTop:5,
      marginBottom:5,
  
    
  },
  boxText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    paddingLeft: 8,
    paddingBottom: 5,
  },
  boxValue: {
    fontSize: 20,
    color: "#F11712",
    fontWeight: "bold",
    paddingLeft: 8,
    paddingBottom: 5,
  },
  date: {

    fontSize: 20,
    color: "#fc466b",
    fontWeight: "bold",
  },
  footerText: {
    color:'blue',
    fontSize:20,
    fontWeight:'bold',
  },
  footer: {
      flexDirection: "row",
      justifyContent:'center',
      width:Dimensions.get('window').width,
      padding: 15,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 8,
      borderRadius: 20,
      marginTop:5,
      marginBottom:20,
  },
  head: {
    color: "blue",
    textDecorationStyle: "solid",
  },
});
