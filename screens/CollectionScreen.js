import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView,ScrollView,Dimensions } from "react-native";


import { apiUrl } from "../Constants";


function CollectionItem({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </View>
  );
}

export default function CollectionScreen() {
  const [collectionreports, setCollectionReports] = useState([]);

  useEffect(() => {
    async function getCollections() {
      try {
        let response = await fetch(apiUrl + "api/collectionreports/");
        let res = await response.json();

        setCollectionReports(res);
      } catch (error) {
        console.log(error);
      }
    }

    getCollections()
  }, []);

  return (

  <SafeAreaView style={styles.bg}>
    <ScrollView style={styles.bg}>
    
    
    <View style={styles.container}>
      {collectionreports.map((coll) =>(
        <View style={styles.box} key={coll.id}>
          <Text style={styles.boxText}>Collector:  <Text style={styles.boxValue}>{coll.collector}</Text></Text>
          <Text style={styles.date}>{coll.date}</Text>
          <Text style={styles.boxText}>Amount: <Text style={styles.boxValue}>Rs.{coll.collection_amount}</Text></Text>
          <Text style={styles.boxText}>Customers:</Text>
          <View style={styles.customers}>
                
              {coll.collection_list.map((element,id) => (
                <Text style={styles.csText} key={element.id}>

                  <Text 
                  style={{
                    color:'black',fontWeight:'bold',fontSize:18
                    }}>
                      {id+1}{")"}{" "}
                  </Text>

                  {element.customer_name}{"  "}

                  <Text style={styles.street}>{"("}{element.street}{" )"}</Text>

                </Text>
                
              ))
              
              }

          </View>
          
    
        </View>

    ))}
    
   
   
    
    </View>
    </ScrollView>
    
  </SafeAreaView>
  )

 }

const styles = StyleSheet.create({
  bg:{
    backgroundColor: "#00b09b",
    height:"100%"

  },
  container: {
    height: "100%",
    backgroundColor: "#00b09b",
    alignItems: "center",
  },
  box: {
    flexDirection: "column",
    padding: 25,
    marginTop: 30,
    width: "95%",
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
  },
  boxText:{
    fontSize:18,
    color:'black',
    fontWeight:'bold',
    paddingBottom:8,
    
  },
  boxValue:{
    fontSize:20,
    color:'#fc354c',
    fontWeight:'bold',
    paddingLeft:8,

  },
  date:{
    position:'absolute',
    top:8,
    right:10,
    fontSize:18,
    color:'#00b09b',
    fontWeight:'bold',
    textDecorationLine:'underline'

  },
  customers:{
    width:"100%",
    flexDirection:'row',
    flexWrap:'wrap'
    
  },
  csText:{
    color:'#4a00e0',
    fontSize:18,
    fontWeight:'bold',
    padding:3,


  },
  street:{
 
    color:'#cf8bf3',
    textDecorationStyle:'solid',
    
    
  }


});
