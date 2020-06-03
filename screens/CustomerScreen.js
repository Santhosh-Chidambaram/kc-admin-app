import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet,Keyboard,TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback } from "react-native";
import { apiUrl } from "../Constants";

import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome'
import MIcon from 'react-native-vector-icons/MaterialIcons'
const CustomerItem = ({ item }) => {
  const paid = "#00b09b";
  const unpaid = "#F11712";
  return (
    
    <View style={styles.cus}>
      <Text style={styles.key}>
        CUSTOMER ID : <Text style={styles.cusHead}>{item.id}</Text>

      </Text>
      <Text style={styles.key}>
            CUSTOMER NAME : <Text style={styles.cusText}>
              {`${item.name}`}
            </Text>

      </Text>
      <Text style={styles.key}>
          BOXNO : <Text style={styles.cusText}>{item.setupbox}</Text>

      </Text>
      <Text style={styles.key}>
          STREET : <Text style={styles.cusText}>{item.street}</Text>
      </Text>
      <Text style={styles.key}>
          PAYMENT AMOUNT : <Text style={styles.cusText}>Rs.{item.payment_amount}</Text>
      </Text>
      <Text style={styles.key}>

          PAYMENT STATUS : <Text style={{ 
          color: item.payment_status === "paid" ? paid : unpaid,
          fontSize: 18,
          fontWeight: "bold",
           }}>
        {item.payment_status}
      </Text>
        
      </Text>
      
      
      
      
    </View>
    
  );
};

export default function CustomerScreen() {
  const [customerList,setCustomerList] = useState([])
  const [serverData,setserverData] = useState([])
  const [offset,setOffset] = useState(0)
  const [state,setState] = useState({
    search:'',
    compMount:true,
    loading:true,
    fetching_from_server:false,
    
  })

  useEffect(() => {
    async function getCustomerList() {
      try {
        let response = await fetch(apiUrl+"api/customers",{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          let res = await response.json();
          setserverData(res.results);

          }
        

          

        }
       catch (error) {
        console.log(error);
      }
    }
    //getCustomerList();
    if(state.compMount){
      getCustomerList();
    }
    setState({compMount:false})
    
  }, []);


  //FilterByValue Function
  const searchFilterFunction = () => {
   var resData = serverData.filter(function(obj){
     return (
     obj.name.includes(state.search.toUpperCase()) || 
     obj.setupbox.includes(state.search.toUpperCase()) ||
     obj.street.includes(state.search.toUpperCase())

     ) ;
   })
   setCustomerList(resData)
   
 }; 
     

  // const renderHeader = () => {    
  //   return (
      
  //   );  
  // };
 
    



  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <View style={{ backgroundColor:'#36D1DC',borderRadius:2}}>
      <View style={{
        flexDirection:'row',
        backgroundColor:'#36D1DC',
        borderColor: '#000',
        padding:20,
        marginTop:10,
        
        
      }}>     
      <TextInput
            placeholder="Enter Customer Details..."
            value={state.search}
            onChangeText={text => {
              setState({search:text})
              
            }}
        
            style={{
              backgroundColor:'white',
              width:"100%",
              borderRadius:30,
              fontSize:20,
              textAlign:'left',
              paddingLeft:40,
              
              
            }}
            />
            
            <Icon name="search" size={24} color="gray" style={{position:'absolute',left:30,top:33}}/>
            { state.search 
            ? 
            <MIcon name="clear" size={26} color="black" style={{position:'absolute',right:40,top:33}} onPress={() => setCustomerList('')}/>
            :<MIcon name="clear" size={24} color="gray" style={{position:'absolute',right:40,top:33}} onPress={() => setCustomerList('')}/>}
          
      </View>
      <View style={{justifyContent:'center',alignItems:'center',paddingTop:5,paddingBottom:20}}>
          <TouchableOpacity
          onPress={() =>searchFilterFunction()}
          style={{
            backgroundColor:'#FC466B',
            width:200,
            height:40,
            borderRadius:20,
          }}>
            <Text style={{textAlign:'center',paddingTop:6,fontSize:20,color:'white'}}>Search</Text>
          </TouchableOpacity>

      </View>
      </View>
      
      {
        customerList != '' ?
        <FlatList
        data={customerList}
        renderItem={({ item }) => <CustomerItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        
      />
      :
      null

      }
      
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  cus: {
    borderBottomWidth: 2,
    padding: 15,
    borderBottomColor:'#d2d2d2'
  },
  cusHead: {
    color: "red",
    fontSize: 20,
    fontWeight:'bold',
    width:"90%"
  },
  cusText: {
      fontSize:20,
      paddingLeft:10,
      color:'#4a00e0',
      fontWeight:'bold'

    
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  key:{
    color:'black',
    fontSize:18,
    fontWeight:'bold',
    padding:3,
  }
});
