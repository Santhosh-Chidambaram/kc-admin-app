import React, { useState, useEffect,useContext,useRef } from "react";
import {Button} from 'react-native-paper'
import {
  View,
  StyleSheet,
  Text,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ScrollView,
  SafeAreaView

} from "react-native";

import moment from "moment";
import { apiUrl } from '../../Constants';
import {AuthContext} from '../context'
import MICon from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable'
import { MainContext } from "../Context/MainContext";
import AsyncStorage from "@react-native-community/async-storage";
//Collect Component 

export default function CollectPaymentScreen() {

  //Context States

  const authContext = useContext(AuthContext)
  const {token,cus_serverData} = authContext
  const mainContext = useContext(MainContext)
  const {customerlist,cid,setUserId,getCollectorId } = mainContext;

  var date = moment().utcOffset("+05:30").format("YYYY-MM-DD");
  const handleViewRef = useRef()
  //State
  const [modalVisible, setModalVisible] = useState(false);
  const [sendPaymentUpdate,setSendPaymentUpdate] =useState(false)
  const [cusdetail, SetCusDetail] = useState({
    cus_id: "",
    payment_status: "paid",
    payment_date: date,
    boxno: "",
    payment_amount: "",

  });

  const [res,setRes] = useState({
    customer:'',
    collected_amount:''

  })


  const _retrieveUserID = async () => {
    try {
      const value = await AsyncStorage.getItem('userid');
      if (value !== null) {
        // We have data!!
        
        setUserId(JSON.parse(value))
      }else{
          getCollectorId()
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  //Send payment of Customer to server
  async function sendUpdate() {
    try {
      let response = await fetch(apiUrl+"api/customer/payment/update/" + cusdetail.cus_id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({
          customer: cusdetail.cus_id,

          payment_date: moment().format(),
          payment_status: cusdetail.payment_status,
          

          collected_amount: cusdetail.payment_amount,
          collection_agent:cid,
          
          stb:cusdetail.boxno.toUpperCase()
        }),
      });
        let res = await response.json()
        if(response.ok){
          setRes({
                      customer:res.customer,
                      collected_amount:res.collected_amount
                    })
          setModalVisible(true)
          
          SetCusDetail({
            cus_id:'',
            payment_amount:'',
            payment_status:'paid',
            payment_date:date,
          });

        }else if(response.status == 400){
          showToast(JSON.stringify(res))
          SetCusDetail({
            cus_id:'',
            payment_amount:'',
            payment_status:'paid',
            payment_date:date,
            boxno:''
          });
        }
 
           
  
    } catch (error) {
      showToast("Customer Payment has already collected")

    
    }
  }


    //submiting Collection
    async function submitCollection() {
      try {
        await fetch(apiUrl+"api/collectionreports/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data == "Customers list empty") {
              showToast("Already Submitted");
            } else {
              showToast("Collection Successfully Submitted !");
            }
          })
          .catch((error) => {
            showToast(error.message)
          });
      } catch (error) {
        showToast(error.message)
      }
    }

    //FilterByValue Function
  const autoFillFunction = () => {

        var resData = customerlist.filter(obj =>{
          return obj.id === parseInt(cusdetail.cus_id)
        })
       if(resData != ''){
  
        SetCusDetail({
          ...cusdetail,
          boxno: resData[0].stbno,
          payment_amount: resData[0].payment_amount.toString(),

          
        })
       }else{
        SetCusDetail({
          cus_id:'',
          payment_amount:'',
          payment_status:'paid',
          payment_date:date,
          boxno:''
        });
        showToast("Customer Id Does not Exist")
       }
       
        
  };



  useEffect(() => {
    // async function getCollectorId(){
    //   try {
    //     let response = await fetch(apiUrl + "api/getuserid",{
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Token " + token,
    //       },
          
    //     })
    //     if(response.ok){
    //       let res = await response.json()
    //       setCID(res["userid"])
    //     }else{

    //     } 
         
        
    //   }catch (error) {
    //     showToast(error)
        
    //   }
        

    // }
      
    if(sendPaymentUpdate){
      sendUpdate();

             
    }

    setTimeout(() =>{
        setModalVisible(false)
    },5000)
      setSendPaymentUpdate(false)
    

    _retrieveUserID()

    
      

  }, [sendPaymentUpdate,modalVisible]);
  
  const handleChange = (name, value) => {
    SetCusDetail({
      ...cusdetail,
      [name]: value,
    });
  };
 
  const showErrorToast = () => {

    ToastAndroid.showWithGravityAndOffset(
      "Payment Already Collected!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      200
    );
  };
  const showToast = (res) => {

    ToastAndroid.showWithGravityAndOffset(
      res,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      150
    );
  };
  return (
    <KeyboardAvoidingView>
      
      <SafeAreaView>
        <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            
           
            <View style={styles.box}>
            <TouchableOpacity 
            style={{
              zIndex:1,position:'absolute',top:68,right:15,
            }}
            onPress={()=>{ 
              handleViewRef.current.rotate()
              autoFillFunction()
              
            }}
            >
            <Animatable.View  ref={handleViewRef}

            >
           
             <MICon name="autorenew" size={33} color="red" />
           

            </Animatable.View>
            </TouchableOpacity>
              <Text style={styles.label}>Customer Id:</Text>
              <TextInput
               style={styles.textInput}
                keyboardType="numeric"
                placeholder="Customer Id."
                name="cus_id"
                onChangeText={(txt) => handleChange("cus_id", txt)}
                value={cusdetail.cus_id}
              />
              <Text style={styles.label}>STB No:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="STB No."
                name="stbno"
                onChangeText={(txt) => handleChange("boxno", txt)}
                value={cusdetail.boxno}
              />
              <Text style={styles.label}>Collected Amount:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Collected Amount."
                name="payment_amount"
                keyboardType="numeric"
                onChangeText={(txt) => handleChange("payment_amount", txt)}
                value={cusdetail.payment_amount}
              />
              <Text style={styles.label}>Payment Status:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="paid"
                onChangeText={(txt) => handleChange("payment_status", txt)}
                value={cusdetail.payment_status}
                name="payment_status"
              />
              <Text style={styles.label}>Payment Date:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="paid"
                onChangeText={(txt) => handleChange("payment_date", txt)}
                name="payment_date"
                value={cusdetail.payment_date}
              />
              <TouchableOpacity
                style={styles.btnCollect}
                onPress={() => {
                    
                    if(cusdetail.id != '' && cusdetail.payment_amount != ''){
                        setSendPaymentUpdate(true)
                        
                    }else{
                        showToast('Fill all details then press collect!')
                    }
                    
                  
                  
                }}
              >
                <Text style={styles.btnText}>Collect</Text>
              </TouchableOpacity>
              <Button 
              mode="contained" 
              icon="arrow-right-circle"
              onPress={() => submitCollection()}
              style={{borderRadius:20,height:40,alignItems:'center',justifyContent:'center'}}
              >
                Submit Collection
              </Button>
            </View>
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                
                
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
              <Text style={styles.modalText}>Payment of Rs.{res.collected_amount} Successfully Collected for {res.customer} !</Text>

                    
                
                  </View>
                </View>
              </Modal>

     
        </View>     
      
          </View>
          </TouchableWithoutFeedback>
          </ScrollView>
          </SafeAreaView>
      
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  textInput:{
    height: 40,
    width: 250,
    borderColor: "#F0057E",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginTop: 6,
    fontSize:20,
    borderRadius:25,
    paddingLeft:20,
    marginBottom:5,
    color:'#8e2de2'
  },
  container: {
    width: Dimensions.get("window").width, //for full screen
    height: "100%", //for full screen
    alignItems: "center",
    backgroundColor: "#eeff",
  },
  fcontainer: {
    overflow: "scroll",
  },
  box: {
    padding: 30,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: "#fff",

  },
  label: {
    marginTop: 6,
    fontSize: 18,
    color:'black',
    textTransform:'uppercase'
    
  },
  btn: {
    marginTop: 15,

    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#59C173",
    borderRadius: 6,
  },
  btnCollect: {
    marginTop: 15,
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00bf8f",
    borderRadius: 25,
    marginBottom:20,
  },
  btnText: {
    fontSize: 20,
    color: "#fff",
  },
  itemText: {
    fontSize: 22,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom:50
  },
  modalView: {
    margin: 20,
    // backgroundColor: "#3F5EFB",
    backgroundColor: "#00bf8f",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  modalText: {
  
    textAlign: "center",
    fontWeight: "bold",
    color:'#fff'
  }
});
