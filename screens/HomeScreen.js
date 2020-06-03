import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { apiUrl } from "../Constants";
import EIcon from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/FontAwesome'


//Home Screen
function HomeScreen({ navigation }) {
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

  useEffect(() => {
    //Getting Dashboard details
    async function getShareAmount() {
      try {
        let response = await fetch(apiUrl + "api/shareamount/");
        let json = await response.json();
        let coll_percent = (
          (json.collected_amount / json.total_share) *
          100
        ).toFixed(1);
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
      } catch (error) {
        console.error(error);
      }
    }

    setTimeout(() => {
      getShareAmount();
    }, 2000);
  }, []);
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
                <Text style={{ fontSize: 18, textAlign: "center" }}>
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
            style={styles.countBox}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 19,
                color: "#8e2de2",
                textAlign: "center",
                position: "absolute",
                top: 4,
                paddingBottom: 20,
              }}
            >
              Payment Details
            </Text>
            <Icon
              name="group"
              size={64}
              color="#8e2de2"
              style={{ position: "absolute", left: 30 }}
            />
            <View style={{ paddingTop: 10 }}>
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
            style={styles.stb}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 19,
                color: "#8e2de2",
                textAlign: "center",
                position: "absolute",
                top: 4,
                paddingBottom: 20,
              }}
            >
              Setupbox Details
            </Text>
            <EIcon
              name="inbox"
              size={64}
              color="#8e2de2"
              style={{ position: "absolute", left: 30 }}
            />
            <View style={{ paddingTop: 10 }}>
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
            style={styles.coll}
            onPress={() => navigation.navigate("Daily Collections")}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 19,
                color: "#8e2de2",
                textAlign: "center",
                position: "absolute",
                top: 4,
                paddingBottom: 20,
              }}
            >
              Todays Collection
            </Text>
            <Icon
              name="rupee"
              size={54}
              color="#8e2de2"
              style={{ position: "absolute", left: 30 }}
            />
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
    height: Dimensions.get('screen').height,
    alignItems: "center",
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
    width: "95%",
  },
  amtValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#c31432",
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
  countBox: {
    marginTop: 30,
    justifyContent: "center",
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
    color: "#f857a6",
  },
  stb: {
    marginTop: 30,
    justifyContent: "center",
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
  coll: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 26,
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
});
