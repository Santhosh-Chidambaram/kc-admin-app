import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ToastAndroid
} from "react-native";
import { apiUrl } from "../Constants";

import { TextInput } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/FontAwesome5'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import AIcon from 'react-native-vector-icons/AntDesign'
const CustomerItem = ({ item }) => {
  const paid = "#00b09b";
  const unpaid = "#F11712";
  return (
    
    <View style={styles.cus}>
        <AIcon name="rightcircle" size={24} color="#ec2F4B" onPress={console.log("Pressed")} style={{position:'absolute',right:10,top:10}}/>   
      <Text style={styles.key}>
        CUSTOMER ID : <Text style={styles.cusHead}>{item.id}</Text>
      </Text>
      <Text style={styles.key}>
        CUSTOMER NAME : <Text style={styles.cusText}>{`${item.name}`}</Text>
      </Text>
      <Text style={styles.key}>
        BOXNO : <Text style={styles.cusText}>{item.setupbox}</Text>
      </Text>
      <Text style={styles.key}>
        STREET : <Text style={styles.cusText}>{item.street}</Text>
      </Text>
      <Text style={styles.key}>
        PAYMENT AMOUNT :{" "}
        <Text style={styles.cusText}>Rs.{item.payment_amount}</Text>
      </Text>
      <Text style={styles.key}>
        PAYMENT STATUS :{" "}
        <Text
          style={{
            color: item.payment_status === "paid" ? paid : unpaid,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {item.payment_status}
        </Text>
      </Text>
    </View>
    
  );
};

export default function SearchScreen() {
  const [customerList, setCustomerList] = useState([]);
  const [serverData, setserverData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [state, setState] = useState({
    search: "",
    compMount: true,
    loading: true,
    fetching_from_server: false,
  });

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
    //When serving only res after push res.results state
    async function getCustomerList() {
      try {
        let response = await fetch(apiUrl+"api/customers", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          let res = await response.json();
          setserverData(res.results);
        }else{
          showToast(response.statusText)
        }
      } catch (error) {
        console.log(error);
      }
    }
   
    setState({
      search: "",
    })

    getCustomerList()
  }, []);


  //FilterByValue Function
  const searchFilterFunction = () => {
    if(serverData != ''){
      var resData = serverData.filter(function (obj) {
        return (
          obj.name.includes(state.search.toUpperCase()) ||
          obj.setupbox.includes(state.search.toUpperCase()) ||
          obj.street.includes(state.search.toUpperCase())
        );
      });

    }else{
      showToast("No Record from the server")
    }
    
    if(resData != ''){1300
      setCustomerList(resData);
    }else{
      showToast("No Records Found")
    }
    
    
  };

  // const renderHeader = () => {
  //   return (

  //   );
  // };

  return (
    <KeyboardAvoidingView>
      
        <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.Search}>
            <View
              style={{
                flexDirection: "row",
  
                borderColor: "#000",
                padding: 20,
                marginTop: 10,
                borderRadius:20,
              }}
            >
              <TextInput
                placeholder="Enter Customer Details..."
                value={state.search}
                onChangeText={(text) => {
                  setState({ search: text });
                }}
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: 30,
                  fontSize: 20,
                  textAlign: "left",
                  paddingLeft: 40,
                  borderWidth:2,
                  borderColor:'#36D1DC'
                }}
              />

              <Icon
                name="search"
                size={24}
                color="gray"
                style={{ position: "absolute", left: 30, top: 33 }}
              />
              {state.search ? (
                <MIcon
                  name="clear"
                  size={26}
                  color="black"
                  style={{ position: "absolute", right: 40, top: 33 }}
                  onPress={() => {
                    setCustomerList("")
                    setState({search:''})
                }}
                />
              ) : (
                <MIcon
                  name="clear"
                  size={24}
                  color="gray"
                  style={{ position: "absolute", right: 40, top: 33 }}
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
                paddingBottom: 20,
              }}
            >
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
                  width: 200,
                  height: 40,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    paddingTop: 6,
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </TouchableWithoutFeedback>

          {customerList != "" ? (
            <FlatList
              data={customerList}
              renderItem={({ item }) => <CustomerItem item={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListFooterComponent={() => <View style={{marginBottom:30}}></View>}
            />
          ) : null}
        </View>
     
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36D1DC",
    height: "100%",
  },
  Search: {
    
    justifyContent:'center',
    marginBottom:2,
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
    borderRadius: 20,
    borderColor:'#36D1DC',
    borderWidth:1,
  },
  cus: {
    marginTop:10,
    marginLeft:5,
    marginRight:5,
    marginBottom:2,
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:10,
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
  },
  cusHead: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    width: "90%",
  },
  cusText: {
    fontSize: 20,
    paddingLeft: 10,
    color: "#4a00e0",
    fontWeight: "bold",
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
  key: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    padding: 3,
  },
});
