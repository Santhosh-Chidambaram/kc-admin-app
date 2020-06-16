import React, { useState, useEffect, useContext,useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  RefreshControl
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { apiUrl } from "../Constants";
import Icon from 'react-native-vector-icons/FontAwesome'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from "./context";




//Home Screen
function HomeScreen({ navigation }) {
  //Context
  const authContext = useContext(AuthContext)
  const {token} = authContext;

  //States
  const [dash, setDash] = useState({
    total_amount: 0,
    due_amount: 0,
    collected_amount: 0,
    coll_percent: "",
    paidcount: 0,
    unpaidcount: 0,
    active: 0,
    deactive: 0,
    amount: 0,
    customers: 0,
    total: 0,
  });

   //Getting Dashboard details
   async function getShareAmount() {
      
    try {
      let response = await fetch(apiUrl + "api/shareamount/",{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token "+token,
        },
      });
      let json = await response.json();
      if(response.ok){
        let coll_percent = (
          (json.collected_amount / json.total_share) *
          100
        ).toFixed(0);
        setDash({
          total_amount: json.total_share,
          due_amount: json.due_amount,
          collected_amount: json.collected_amount,
          coll_percent: coll_percent,
          paidcount: json.paidcount,
          unpaidcount: json.unpaidcount,
          active: json.stbactive,
          deactive: json.stbdeactive,
          amount: json.amount,
          customers: json.customers,
          total: json.total,
        });

      }
      else{
        showToast(json)

      }
      
    } catch (error) {
      showToast(error.messages)
    }
  }

  //Toast
  const showToast = (res) => {

    ToastAndroid.showWithGravityAndOffset(
      res,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      150
    );
  };
  useEffect(() =>{
    getShareAmount();
  },[])
 
  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar backgroundColor="#fafafa" barStyle="dark-content" />
        <View style={styles.container}>
          <TouchableOpacity style={styles.box}>
            <View style={{ position: "relative", paddingLeft: "10%" }}>
              <ProgressCircle
                percent={Number(dash.coll_percent)}
                radius={50}
                borderWidth={8}
                color="red"
                shadowColor="#999"
                bgColor="#fff"
              >
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  {dash.coll_percent}%
                </Text>
              </ProgressCircle>
            </View>
            <View style={styles.boxContent}>
              <Text style={styles.boxText}>
                Total Amount:{" "}
                <Text style={styles.amtValue}>Rs.{dash.total_amount}</Text>
              </Text>
              <Text style={styles.boxText}>
                Due Amount:{" "}
                <Text style={styles.due}>Rs.{dash.due_amount}</Text>
              </Text>
              <Text style={styles.boxText}>
                Collected Amount:{" "}
                <Text style={styles.collected}>Rs.{dash.collected_amount}</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dashBox}
          >
            <View style={{
                
                position: "absolute",
                top: 4,
                left:120,
                }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 19,
                color: "#8e2de2",
                
              }}
            >
              Payment Details
            </Text>

            </View>
            
            <View  
            style={{ 
              
               
               backgroundColor:'#8e2de2',
               height:80,
               width:80,
               borderRadius:50,
               justifyContent:'center',
               alignItems:'center',
               marginTop:12,
              
              }}
               >
            <Icon
              name="group"
              size={45}
              color="white"
             
            />

            </View>
           
            <View style={{paddingTop:10}}>
              <Text style={styles.cnt}>
                Total : <Text style={styles.cntValue}>{dash.total}</Text>
              </Text>
              <Text style={styles.cnt}>
                Paid : <Text style={styles.cntValue}>{dash.paidcount}</Text>
              </Text>
              <Text style={styles.cnt}>
                Unpaid : <Text style={styles.cntValue}>{dash.unpaidcount}</Text>
              </Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dashBox}
            onPress={() => navigation.navigate('Setupbox')}
          >
            <View style={{
                position: "absolute",
                top: 4,
                left:120,}}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 19,
                color: "#8e2de2",
                
    
              }}
            >
               Setupbox Details
            </Text>
            </View>
           
             
            <View style={{
                backgroundColor:'#8e2de2',
                borderRadius:50,
                height:80,
                width:80,
                justifyContent:'center',
                alignItems:'center',
                marginTop:12,
                
                }}>
            <MCIcon
              name="set-top-box"
              size={60}
              color="white"
              
            />
            </View>
            
            <View style={{paddingTop:10}}>
              <Text style={styles.cnt}>
                Total : <Text style={styles.cntValue}>{dash.total}</Text>
              </Text>
              <Text style={styles.cnt}>
                Active : <Text style={styles.cntValue}>{dash.active}</Text>
              </Text>
              <Text style={styles.cnt}>
                Deactive : <Text style={styles.cntValue}>{dash.deactive}</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dashBox}
            onPress={() => navigation.navigate("Daily Collections")}
          >
            <View style={{
                position: "absolute",
                top: 4,
                left:120,
                }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 19,
                color: "#8e2de2",
                textAlign: "center",
                
              }}
            >
              Todays Collection
            </Text>

            </View>
            
            <View style={{
                backgroundColor:'#8e2de2',
                borderRadius:50,
                height:80,
                width:80,
                justifyContent:'center',
                alignItems:'center',
                marginTop:12,
                
                }}
            >
            <Icon
              name="rupee"
              size={50}
              color="white"
              
            />

            </View>
            
            <View style={{ paddingTop: 10 }}>
              <Text style={styles.cnt}>
                Amount : <Text style={styles.cntValue}>Rs.{dash.amount}</Text>
              </Text>
              <Text style={styles.cnt}>
                Customers :{" "}
                <Text style={styles.cntValue}>{dash.customers}</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8e2de2",
    height: "100%",
    alignItems: "center",
    marginBottom:20,
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  boxContent: {
    flexDirection: "column",
    width: "90%",
  },
  boxText: {
    paddingLeft: 10,
    fontSize: 19,
    fontWeight: "bold",
    color: "black",
    paddingBottom: 5,
    width: "92%",
  },
  amtValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8e2de2",
  },
  collected:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ebf91",

  },
  due:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#ec2F4B",

  },
  dashBox: {
    marginTop: 30,
    flexDirection:'row',
    justifyContent: "space-around",
    alignItems: "center",
    padding: 25,
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
  cnt: {
    fontSize: 19,
    fontWeight: "bold",
    color: "black",
    
  },
  cntValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f80759",
    
  },
  
});
