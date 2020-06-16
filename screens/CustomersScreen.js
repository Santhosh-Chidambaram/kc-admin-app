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
import { AuthContext } from "./context";
import { MainContext } from "./Context/MainContext";



function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}




const CustomerItem = ({ item,navigation }) => {
  const paid = "#00b09b";
  const unpaid = "#F11712";
  var sp = item.name.indexOf(' ') || item.name.indexOf('.')
  return (
   <TouchableOpacity onPress={() =>{
     navigation.push('CustomerDetailScreen',{item:item})
   }}>
    <Animatable.View style={styles.cus} animation="fadeInLeftBig">
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
         <Text style={{color:'red',fontSize:20,paddingBottom:3}}>Rs.{item.payment_amount}/-</Text>
         
         <Text style={styles.cusText}>{item.setupbox}</Text>
         <Text style={styles.cusText}>{item.street}</Text>

         </View>
   
    </Animatable.View>
    </TouchableOpacity>
    
  );
};
const SearchScreen = ({navigation}) =>{
  const [customerList, setCustomerList] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const MenuRef = useRef()
  //Context States

  const authContext = useContext(AuthContext);
  const mainContext = useContext(MainContext);
  const {getCustomerList,customerlist} = mainContext;
  const {token } = authContext;
  const [showSearch,setShowSearch] = useState(false);

  const [state, setState] = useState({
    search: "",
    compMount: true,
    loading: true,
    cusText:'Customers',
    customerscount:''
  });

   //Refresh control
   const [refreshing, setRefreshing] = React.useState(false);
   const onRefresh = React.useCallback(() => {
     setRefreshing(true);
     getCustomerList()
 
     wait(3000).then(() => setRefreshing(false));
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
    getCustomerList()
   
 
  }, []);


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
            obj.setupbox.includes(state.search.toUpperCase()) ||
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

  // const renderHeader = () => {
  //   return (

  //   );
  // };
  const floatRef = useRef()
  return (
    <KeyboardAvoidingView>
      {/* App Header */}
        <Appbar.Header>
            
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
            <Menu.Item onPress={() => {}} title="Set All Unpaid" />
          </Menu>
        </View>

        {/* End of App Header */}  
          

        <TouchableOpacity
            style={styles.floatBtn}
            onPress={() => {
              navigation.push('AddCustomerScreen')
              
            }}
           >
              <Animatable.View  ref={floatRef} 
              style={styles.floatView}>
                  <MIcon name="person-add" color="#8e2de2" size={30} />
                   <Text style={{color:'#8e2de2',paddingLeft:10,fontSize:18,}}>Add Customer</Text>
                   
            </Animatable.View>
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
                setState({ search: text });
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
                style={{ position: "absolute", right: 60, top: 28 }}
                onPress={() => {
                  setCustomerList("")
                  setState({search:''})
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
                  setState({search:''});
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

        {/* Customer List */}

        {customerlist != "" ? (
            <FlatList
              data={customerList != '' ?customerList:customerlist}
              initialNumToRender={10}
              renderItem={({ item }) => <CustomerItem item={item} navigation={navigation} />}
              keyExtractor={(item) => item.id.toString()}
              ListFooterComponent={() => <View style={{marginBottom:130}}></View>}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : null}
        
           {/* End of Customer List */}
        </View>
     
    </KeyboardAvoidingView>
  );
}

export default React.memo(SearchScreen)



const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.primary,
    height: "100%",
  },
  Search: {
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
    //color: "#4a00e0",
    color:'blue',
    width:195,
    paddingBottom:3
    
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
    backgroundColor:'white',
    borderRadius:30,
    padding:12,
    borderColor:'#8e2de2',
    borderWidth:2,

  },
  floatView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:30,
    
    
    

  },
});
