import React, { useState, useEffect, useContext, useRef, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ToastAndroid,
  Dimensions,
  RefreshControl
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import { Appbar,Searchbar,Colors,DefaultTheme,Menu,Button,Divider } from 'react-native-paper';
import { AuthContext } from "../context";
import { MainContext } from "../Context/MainContext";
import CUstomerFlatList from './cusFlatList/CustomerFlatList'
import AsyncStorage from '@react-native-community/async-storage'

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}




const SearchScreen = ({navigation}) =>{
  const [customerList, setCustomerList] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const MenuRef = useRef()
  //Context States

  const authContext = useContext(AuthContext);
  const mainContext = useContext(MainContext);
  const {getCustomerList,customerlist,isDeleted,delid,setIsDeleted,setCustomers} = mainContext;
  const {token } = authContext;
  const [showSearch,setShowSearch] = useState(false);

  const [state, setState] = useState({
    search: "",
    compMount: true,
    loading: true,
    cusText:'Customers',
    customerscount:''
  });

  const _retrieveCustomers = async () => {
     
    try {
      const value = await AsyncStorage.getItem('customers');
      if (value !== null) {

        setCustomers(JSON.parse(value))
      }else{
        getCustomerList()
      }
    } catch (error) {
      // Error retrieving data
    }
  };


   //Refresh control
   const [refreshing, setRefreshing] = React.useState(false);
   const onRefresh = React.useCallback(() => {
     setRefreshing(true);
     getCustomerList()
 
     wait(2000).then(() => setRefreshing(false));
   }, [refreshing]);
 

  const showToast = (res) => {

    ToastAndroid.showWithGravityAndOffset(
      res,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      200
    );
  };
  useEffect(() => {
    _retrieveCustomers()
   
 
  }, []);

  useEffect(() =>{
      if(isDeleted){
        DeleteFilter(delid)
        setIsDeleted(false)
      }
     
      
  },[isDeleted])

  //Delete Filter 
  const DeleteFilter = (delid) =>{
    if(customerList != ''){
      var resData = customerList.filter(function (obj) {
        return obj.id != delid
      });
    }else{
      var resData = customerlist.filter(function (obj) {
        return obj.id != delid
      });
    }
    
    setCustomerList(resData)
  }

  //FilterByValue Function
  const searchFilterFunction = (query='') => {
    if(query != '' && query != 'all'){
      if(customerlist != ''){
        var resData = customerlist.filter(function (obj) {
          return (
            obj.payment_status === query.toLowerCase()
          );
        });
  
      }else{
        showToast("No Record from the server")
      }
    }else if(query === 'all'){
      if(customerlist != ''){
        var resData = customerlist
  
      }else{
        showToast("No Record from the server")
      }

    }  
    else{
      if(customerlist != ''){
        var resData = customerlist.filter(function (obj) {
          return (
            obj.name.includes(state.search.toUpperCase()) ||
            obj.stbno.includes(state.search.toUpperCase()) ||
            obj.street.includes(state.search.toUpperCase())
          );
        });
  
      }else{
        showToast("No Record from the server")
      }

    }
    
    
    if(resData != ''){
      setCustomerList(resData);
    }else{
      showToast("No Records Found")
    }
    
    
  };


  const floatRef = useRef()
  return (
    <KeyboardAvoidingView>
      {/* App Header */}
        <Appbar.Header style={{backgroundColor:'#7F00FF'}}>
            
          <Appbar.Content title={state.cusText}  titleStyle={{textAlign:'center',paddingLeft:50,}} />
          <Appbar.Action icon="menu" onPress={() => {navigation.openDrawer()}} 
          style={{ position: 'absolute',
                      left: 0,
                      right: 0,
                      }}/>
            <Appbar.Action icon="magnify" onPress={() => {
              setShowSearch(!showSearch)
              }} />
            <Appbar.Action icon="dots-vertical" onPress={() => {setMenuVisible(true)}} ref={MenuRef} />
      </Appbar.Header>

     
      {/* Pop up Menu */}         

      <View
          style={{

            flexDirection: 'row',
            justifyContent: 'center'
          }}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={{ x: 209, y: 0 }}
          >
            <Menu.Item onPress={() => {
              setState({...state,cusText:'Customers'})
              searchFilterFunction('all')
              setMenuVisible(false)}} title="All Customers" />
            <Menu.Item onPress={() => {
                setState({...state,cusText:'Paid Customers'})
              searchFilterFunction('paid')
              setMenuVisible(false)}} title="Paid Customers" />
            <Menu.Item onPress={() => {
                setState({...state,cusText:'Not Paid Customers'})
              searchFilterFunction('unpaid')
              setMenuVisible(false)}} title="Not Paid Customers" />
            <Divider />
            <Menu.Item onPress={() => {
              setMenuVisible(false)
              navigation.navigate('SendSMS',{customer:customerlist})}} title="Send SMS" />
            <Menu.Item onPress={() => {}} title="Set All Unpaid" />
          </Menu>
        </View>

        {/* End of App Header */}  
          

        
              {/* FAB */}
                <TouchableOpacity
                  style={styles.floatBtn}
                  onPress={() => {
                    navigation.push('AddCustomerScreen')
                    
                  }}
                >
                  <MIcon name="person-add" color="white" size={30} />
                   <Text style={{color:'white',paddingLeft:10,fontSize:18,}}>Add Customer</Text>
                   </TouchableOpacity>  
            
         {/* Main Container */}     
        <View style={styles.container}>


          {/* Search Box */}     
                {showSearch?
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Animatable.View style={styles.Search} animation='fadeInDown' duration={500}>
                  <View
                    style={{
                      borderColor: "#000",
                      padding: 20,
                      borderRadius:20,
                    }}
                  >
                    <TextInput
                      placeholder="Search..."
                      value={state.search}
                      onChangeText={(text) => {
                        setState({ ...state,search: text });
                      }}
                      style={{
                        backgroundColor: "white",
                        width: 250,
                        height:45,
                        borderRadius: 30,
                        fontSize: 20,
                        textAlign: "left",
                        paddingLeft: 40,
                        

                      }}
                    />

                    <Icon
                      name="search"
                      size={24}
                      color="gray"
                      style={{ position: "absolute", left: 30, top: 28 }}
                    />
                    {state.search ? (
                      <MIcon
                        name="clear"
                        size={28}
                        color="black"
                        style={{ position: "absolute", right: 30, top: 28 }}
                        onPress={() => {
                          setCustomerList("")
                          setState({...state,search:''})
                      }}
                      />
                    ) : (
                      <MIcon
                        name="clear"
                        size={26}
                        color="gray"
                        style={{ position: "absolute", right: 30, top: 28 }}
                        onPress={() => {
                          setCustomerList("");
                          setState({...state,search:''});
                        }}
                      />
                    )}
                    
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 5,
                    }}
                  >

             {/* Search Button */}
            <TouchableOpacity
              onPress={() => {
                if(state.search != ''){
                  searchFilterFunction()
                }else{
                  showToast("Empty Search")
                }
                }}
              style={{
                backgroundColor: "#FC466B",
                width: 90,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginRight:15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "white",
                }}
              >
                Search
              </Text>
            </TouchableOpacity>

             {/* End of Search Button */}
          </View>
        </Animatable.View>
        </TouchableWithoutFeedback>
        :
        null
        }

         {/* End of Search Box */}

        <View style={styles.box}>
            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Total Customers : </Text>
            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>{customerList != '' ? customerList.length : customerlist.length}</Text>
        </View>



        {/* Customer List */}
        
        {customerlist != null ? 
           <CUstomerFlatList data={customerList != '' ? customerList:customerlist} refreshing={refreshing} onRefresh={onRefresh} navigation={navigation} />
          : 
          null}
        
           {/* End of Customer List */}
        </View>
     
    </KeyboardAvoidingView>
  );
}

export default React.memo(SearchScreen)



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7F00FF',
    height: "100%",
  },
  Search: {
    zIndex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginBottom:2,
    backgroundColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,

  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  id: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    padding: 3,
    width:'96%'
  },
  floatBtn: {
    zIndex: 1,
    position: 'absolute',
    bottom: 61,
    right: 5,
    backgroundColor:'#E100FF',
    borderRadius:30,
    padding:12,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#E100FF',
    borderRadius:30,


  },
  floatView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#E100FF',
    borderRadius:30,
    
    
    

  },
  box: {
    marginTop:15,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'orange',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
    borderRadius: 20,
},
});
