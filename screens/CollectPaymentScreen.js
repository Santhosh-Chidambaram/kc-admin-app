import React, { useState, useEffect } from "react";
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
import { apiUrl } from '../Constants';


//Collect Component 

export default function CollectPaymentScreen() {
  
  var date = moment().utcOffset("+05:30").format("YYYY-MM-DD");
  //State
  const [modalVisible, setModalVisible] = useState(false);
  const [sendPaymentUpdate,setSendPaymentUpdate] =useState(false)
  const [cid,setCID] = useState("")
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

  //Send payment of Customer to server
  async function sendUpdate() {
    try {
      let response = await fetch(apiUrl+"api/customer/payment/update/" + cusdetail.cus_id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //Authorization: "Token " + token,
        },
        body: JSON.stringify({
          payment_date: cusdetail.payment_date,
          payment_status: cusdetail.payment_status,
          customer: cusdetail.cus_id,
          collected_amount: cusdetail.payment_amount
        }),
      });
        
        if(response.ok){
            

        }else if(response.status == 400){
          showToast("Customer Does Not Exist,Please enter valid customer id")
          SetCusDetail({
            cus_id:'',
            payment_amount:'',
            payment_status:'paid',
            payment_date:date
          });
        }
 
           
  
    } catch (error) {
      showToast(error.message)

    
    }
  }
  //Send Collected To Server
  async function sendCollected() {
    console.log(cid)
    // try {
    //   let response = await fetch(apiUrl + "api/collectedcustomers", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       //Authorization: "Token " + token,
    //     },
    //     body: JSON.stringify({
    //       collected_amount: cusdetail.payment_amount,
    //       customer: cusdetail.cus_id,
    //       collector:cid,
    //     }),
    //   })
    //   let data = await response.json()
    //   if(response.ok){
    //       setRes({
    //         customer:data.customer,
    //         collected_amount:data.collected_amount
    //       })
    //       setModalVisible(true)          
    //   }
    //   else if(response.status == 400){
    //     showErrorToast()

          
    //   }else{
    //     showToast("No reesponse from the server")
    //   }
       
    // } catch (error) {
    //   showToast(error.message)

      
    // }
  }

  useEffect(() => {
    async function getCollectorId(){
      try {
        let response = await fetch(apiUrl + "api/getuserid",{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            //Authorization: "Token " + token,
          },
          
        })
        if(response.ok){
          let res = await response.json()
          setCID(res["userid"])
        }else{

        }
         
        
      }catch (error) {
        showToast(error)
        
      }
        

    }
    
  if(sendPaymentUpdate){
    sendUpdate();
    //Send Collected
    setTimeout(() =>{
      sendCollected()
      SetCusDetail({
        cus_id:'',
        payment_amount:'',
        payment_status:'paid',
        payment_date:date
      });
      
      

    },2000)
    
        
  }

    setTimeout(() =>{
        setModalVisible(false)
    },9000)
      setSendPaymentUpdate(false)
    
      if(cid == ''){
        getCollectorId()
      }

    
      

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
      200
    );
  };
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{height:"100%"}}>
        <ScrollView >
          <View style={styles.container}>
            
           
            <View style={styles.box}>
              <Text style={styles.label}>Customer Id:</Text>
              <TextInput
                style={{
                  height: 50,
                  width: 200,
                  borderColor: "#F0057E",
                  borderWidth: 2,
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 6,
                  fontSize:18,
                }}
                keyboardType="numeric"
                placeholder="Customer Id."
                name="cus_id"
                onChangeText={(txt) => handleChange("cus_id", txt)}
                value={cusdetail.cus_id}
              />
              <Text style={styles.label}>Collected Amount:</Text>
              <TextInput
                style={{
                    height: 50,
                    width: 200,
                    borderColor: "#F0057E",
                    borderWidth: 2,
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 6,
                    fontSize:18,
                }}
                placeholder="Collected Amount."
                name="payment_amount"
                keyboardType="numeric"
                onChangeText={(txt) => handleChange("payment_amount", txt)}
                value={cusdetail.payment_amount}
              />
              <Text style={styles.label}>Payment Status:</Text>
              <TextInput
                style={{
                    height: 50,
                    width: 200,
                    borderColor: "#F0057E",
                    borderWidth: 2,
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 6,
                    fontSize:18,
                }}
                placeholder="paid"
                onChangeText={(txt) => handleChange("payment_status", txt)}
                value={cusdetail.payment_status}
                name="payment_status"
              />
              <Text style={styles.label}>Payment Date:</Text>
              <TextInput
                style={{
                    height: 50,
                    width: 200,
                    borderColor: "#F0057E",
                    borderWidth: 2,
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 6,
                    fontSize:18,
                }}
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
          </ScrollView>
          </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
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
    width: "80%",
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
    marginBottom: 30,
  },
  label: {
    marginTop: 6,
    fontSize: 20,
    fontWeight:'bold',
    color:'black'
    
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
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00bf8f",
    borderRadius: 6,
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
