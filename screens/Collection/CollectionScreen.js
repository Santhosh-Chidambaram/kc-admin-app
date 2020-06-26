import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView,ScrollView,Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import { apiUrl } from "../../Constants";
import CollectionFlatList from './collFlatList/CollectionFlatList'



export default function CollectionScreen({navigation}) {
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

  <SafeAreaView style={styles.container}>
 
    
  
      <CollectionFlatList data={collectionreports} navigation={navigation}/>
    

    
  </SafeAreaView>
  )

 }

const styles = StyleSheet.create({

  container: {
    height: "100%",
    backgroundColor: "#7F00FF",
 
  },
  

});
