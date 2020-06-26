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

import { apiUrl } from "../../Constants";
import { AuthContext } from "../context";
import * as Animatable from 'react-native-animatable'
import { Appbar,Searchbar,Colors,DefaultTheme,Menu,Button,Divider } from 'react-native-paper';
import CollectedFlatList from './collFlatList/CollectedFlatList'
const moment = require('moment');




export default function CollectedCustomerScreen() {
  const today = moment().format('DD-MM-YYYY');
  const authContext = useContext(AuthContext);
  const {token} = authContext;
  const [state, setState] = useState({
    collectedCustomers: [],
    collected_count: 0,
    total_amount:0,
  });

  useEffect(() => {

    async function getCollections() {
      try {
        let response = await fetch(apiUrl + "api/collectedcustomers?limit=70", {    
          method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
        },);
        let res = await response.json();
        if(response.ok){
          var total = 0
        if(res != ''){
          res.map(col =>{
            total+=col.collected_amount
  
          })
        }
       
        setState({
          collectedCustomers: res,
          collected_count: res.length,
          total_amount:total
          
        });
          
        }else if(response.status == 404){
          setState({
            collectedCustomers: '',
            collected_count: 0,
            total_amount:0
            
          });
        }
        

      }catch (error) {
        console.log(error);
      }
    }

    getCollections();
  },[]);


  const RenderFooter = () =>{
    return(
      <View style={styles.footer}>
              
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
        <View style={styles.boxContent1}>
              <Text style={{color:'#8e2de2',fontSize:20,fontWeight:'bold'}}>Total Amount :
                <Text style={{color:Colors.redA400}}> Rs.{state.total_amount}/-</Text>
              </Text>

        </View>
        {
          state.collectedCustomers != ''
          ?
          <CollectedFlatList data={state.collectedCustomers} />
        :
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
            <Text style={{color:'#fafafa',fontSize:26}}>No Customers !</Text>
        </View>
        
        }
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
    backgroundColor: "rgba(255,255,255,0.1)",
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
      width:"98%",
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
      borderRadius: 8,
      marginBottom:5,
      marginLeft:5
  
    
  },
  boxContent1: {

    justifyContent:'center',
    alignItems:'center',
    width:"97%",
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.99)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderRadius: 8,
    marginBottom:5,
    marginLeft:8,
    marginTop:10,
    position:'absolute',
    bottom:0,

  
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
      marginTop:5,
      marginBottom:60,
  },
  head: {
    color: "#8e2de2",
    textDecorationStyle: "solid",
  },
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
