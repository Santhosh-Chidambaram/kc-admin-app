import React from "react";
import { StyleSheet, View, Text, TouchableOpacity,} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import { Paragraph,Title} from 'react-native-paper'

export default function CollectionRow({ item,navigation }) {
    return (
        <View style={styles.box} key={item.id}>
          <Title style={styles.date}>{moment(item.date).format('D/MM/YYYY')}</Title>     
        <Title style={styles.boxText}>CollectionAgent:  
        <Title style={styles.agent}>{" "}{item.collector}</Title></Title>
        
        <Title style={styles.boxText}>Amount: <Text style={styles.boxValue}>Rs.{item.collection_amount}/-</Text></Title>
        <Title style={styles.boxText}>Customers:</Title>
        
        
        <View style={styles.customers}>
        <TouchableOpacity
              style={{display:'flex',flexDirection:'row'}}
              onPress={() => {
                navigation.navigate('CollectionCustomer',{
                  coll_cus:item.collection_list
                })
    
              }}
            
              >
              <Icon name="clipboard-list" size={22} color="#8e2de2" />
              <Text 
              style={{paddingLeft:10,color:'#8e2de2',fontSize:20,fontWeight:'bold',}}>
                
                  View List
              </Text>
    
          </TouchableOpacity>
          

        </View>
        
  
      </View>
    );
  }


  const styles = StyleSheet.create({

    box: {
      flexDirection: "column",
      marginLeft:10,
      marginTop: 20,
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
      paddingTop:20,
      paddingLeft:18,
      paddingBottom:20,

    },
    boxText:{
      fontSize:18,
      paddingBottom:0,
      
    },
    boxValue:{
      fontSize:20,
      color:'red',
      paddingLeft:8,
  
    },
    date:{
      position:'absolute',
      top:3,
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
    agent:{
   
      color:'#E100FF',
      textDecorationStyle:'solid',
      
      
    }
  
  
  });
  